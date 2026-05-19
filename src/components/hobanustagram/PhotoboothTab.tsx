import { Suspense, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Download, Film, ImagePlus, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import PageLoader from '@/components/common/PageLoader';
import { CameraOverlay } from '@/components/hobanustagram/CameraOverlay';
import { LazyTwoShotOverlay } from '@/components/hobanustagram/LazyTwoShotOverlay';
import { SaveSheet } from '@/components/hobanustagram/SaveSheet';
import { StepIndicator } from '@/components/hobanustagram/StepIndicator';
import { CHARACTER_LIST } from '@/constants/hobanustagram';
import { fadeUpVariant } from '@/constants/animation';
import {
  preloadCharacterOverlays,
  preloadTwoShotExperience,
  usePhotoboothPreload,
} from '@/hooks/useHobanustagramPreload';
import { capturePhoto } from '@/lib/capturePhoto';
import { downloadPhoto, sharePhoto } from '@/lib/savePhoto';
import { useCamera } from '@/hooks/useCamera';
import type { CameraState, CharacterKey, TabStep } from '@/types/hobanustagram';

export const PhotoboothTab = () => {
  const [tabStep, setTabStep] = useState<TabStep>(1);
  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey>('hobanu');
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [showFrameSelector, setShowFrameSelector] = useState(false);
  const [showSaveSheet, setShowSaveSheet] = useState(false);
  const [twoShotActive, setTwoShotActive] = useState(false);

  const { videoRef, isReady, error, facingMode, startCamera, stopCamera, flipCamera } = useCamera();
  const overlayRef = useRef<HTMLImageElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const selectedCharacterData =
    CHARACTER_LIST.find((c) => c.key === selectedCharacter) ?? CHARACTER_LIST[0];

  usePhotoboothPreload();

  useEffect(() => {
    if (cameraState === 'shooting') {
      void startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraState]);

  const handleOpenCamera = () => {
    preloadCharacterOverlays();
    setCameraState('shooting');
  };

  const handleOpenTwoShot = () => {
    preloadTwoShotExperience();
    setTwoShotActive(true);
  };

  const handleShutter = () => {
    if (!videoRef.current || !overlayRef.current) return;
    const bottomInset = bottomBarRef.current?.offsetHeight ?? 0;
    const overlayRect = overlayRef.current.getBoundingClientRect();
    const dataUrl = capturePhoto(
      videoRef.current,
      overlayRef.current,
      bottomInset,
      overlayRect,
      facingMode === 'user',
    );
    setCapturedDataUrl(dataUrl);
    setCameraState('review');
  };

  const handleRetake = () => setCameraState('shooting');

  const handleUsePhoto = () => {
    stopCamera();
    setCameraState('idle');
    setTabStep(2);
    setShowFrameSelector(false);
  };

  const handleClose = () => {
    stopCamera();
    setCameraState('idle');
    setShowFrameSelector(false);
  };

  const handleRestartFromResult = () => {
    setCapturedDataUrl(null);
    setTabStep(1);
  };

  const handleTwoShotComplete = (compositedUrl: string) => {
    flushSync(() => {
      setCapturedDataUrl(compositedUrl);
      setTabStep(2);
    });

    requestAnimationFrame(() => {
      setTwoShotActive(false);
    });
  };

  const handleSaveButtonClick = () => {
    const testFile = new File([], 'test');
    if (navigator.canShare?.({ files: [testFile] })) {
      setShowSaveSheet(true);
    } else {
      if (capturedDataUrl) void downloadPhoto(capturedDataUrl);
    }
  };

  const handleDownload = async () => {
    if (!capturedDataUrl) return;
    setShowSaveSheet(false);
    await downloadPhoto(capturedDataUrl);
  };

  const handleShare = async () => {
    if (!capturedDataUrl) return;
    setShowSaveSheet(false);
    await sharePhoto(capturedDataUrl);
  };

  return (
    <>
      {twoShotActive && (
        <Suspense fallback={<PageLoader className="fixed inset-0 z-[100]" />}>
          <LazyTwoShotOverlay
            onClose={() => setTwoShotActive(false)}
            onComplete={handleTwoShotComplete}
          />
        </Suspense>
      )}

      <AnimatePresence>
        {cameraState !== 'idle' && (
          <CameraOverlay
            cameraState={cameraState}
            videoRef={videoRef}
            overlayRef={overlayRef}
            bottomBarRef={bottomBarRef}
            facingMode={facingMode}
            isReady={isReady}
            error={error}
            selectedCharacter={selectedCharacter}
            selectedCharacterData={selectedCharacterData}
            capturedDataUrl={capturedDataUrl}
            showFrameSelector={showFrameSelector}
            onClose={handleClose}
            onFlipCamera={flipCamera}
            onToggleFrameSelector={() => setShowFrameSelector((prev) => !prev)}
            onShutter={handleShutter}
            onSelectCharacter={setSelectedCharacter}
            onRetake={handleRetake}
            onUsePhoto={handleUsePhoto}
          />
        )}
      </AnimatePresence>

      <SaveSheet
        open={showSaveSheet}
        onClose={() => setShowSaveSheet(false)}
        onDownload={() => void handleDownload()}
        onShare={() => void handleShare()}
      />

      {!twoShotActive && (
        <div className="flex min-h-screen flex-col gap-7 bg-white px-5 py-7">
          <StepIndicator currentStep={tabStep} />

          {tabStep === 1 && (
            <motion.div className="flex flex-col gap-7" {...fadeUpVariant}>
              <div className="flex flex-col items-center gap-2.5">
                <p className="font-wanted-sans text-2xl font-bold leading-none tracking-[-0.48px] text-black">
                  포토부스
                </p>
                <p className="font-wanted-sans text-base font-normal leading-none tracking-[-0.32px] text-gray">
                  원하는 항목을 선택 후 카메라 권한을 허용해주세요.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenTwoShot}
                onFocus={preloadTwoShotExperience}
                onPointerEnter={preloadTwoShotExperience}
                onTouchStart={preloadTwoShotExperience}
                className="flex h-67 w-full flex-col items-center justify-center gap-8 rounded-xl border border-dashed border-sub-red bg-[rgba(255,61,61,0.04)]"
              >
                <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-br from-[#ffa855] to-sub-red">
                  <Film className="size-9 text-white" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-wanted-sans text-[18px] font-semibold leading-none tracking-[-0.36px] text-black">
                    인생두컷 찍기
                  </p>
                  <p className="whitespace-pre-line text-center font-wanted-sans text-sm font-normal leading-[1.4] tracking-[-0.28px] text-gray">
                    {'2가지 필터 중 하나를 선택하고\n4컷을 찍은 뒤 마음에 드는 2장을 골라보세요.'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleOpenCamera}
                onFocus={preloadCharacterOverlays}
                onPointerEnter={preloadCharacterOverlays}
                onTouchStart={preloadCharacterOverlays}
                className="flex h-67 w-full flex-col items-center justify-center gap-8 rounded-xl border border-dashed border-sub-red bg-[rgba(255,61,61,0.04)]"
              >
                <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-br from-[#ffa855] to-sub-red">
                  <ImagePlus className="size-9 text-white" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-wanted-sans text-[18px] font-semibold leading-none tracking-[-0.36px] text-black">
                    호반우 필터 고르기
                  </p>
                  <p className="whitespace-pre-line text-center font-wanted-sans text-sm font-normal leading-[1.4] tracking-[-0.28px] text-gray">
                    {'호반우 필터 2종 중, 마음에 드는 필터를 선택해\n사진을 완성하세요!'}
                  </p>
                </div>
              </button>
            </motion.div>
          )}

          {tabStep === 2 && capturedDataUrl && (
            <motion.div className="flex flex-col gap-6" {...fadeUpVariant}>
              <div className="flex flex-col items-center gap-2.5">
                <p className="font-wanted-sans text-2xl font-bold leading-none tracking-[-0.48px] text-black">
                  완성!🎉
                </p>
                <p className="font-wanted-sans text-base font-normal leading-none tracking-[-0.32px] text-gray">
                  저장하거나 다시 찍어보세요!
                </p>
              </div>

              <img src={capturedDataUrl} alt="완성된 사진" className="w-full rounded-xl" />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleRestartFromResult}
                  className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#DDD] bg-white active:bg-[#F5F5F5]"
                >
                  <RotateCcw className="size-5 text-[#333]" />
                  <span className="font-wanted-sans text-sm font-medium text-[#333]">
                    다시 찍기
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveButtonClick}
                  className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-lg bg-sub-red active:opacity-80"
                >
                  <Download className="size-5 text-white" />
                  <span className="font-wanted-sans text-sm font-medium text-white">다운로드</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};
