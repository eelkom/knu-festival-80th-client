import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

type SaveBrowserGuideModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export const SaveBrowserGuideModal = ({
  open,
  onClose,
  onContinue,
}: SaveBrowserGuideModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="save-browser-guide-title"
          className="relative w-full max-w-[335px] rounded-2xl bg-white px-5 pt-6 pb-5"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="저장 안내 닫기"
            className="absolute right-4 top-4 flex size-8 items-center justify-center"
            onClick={onClose}
          >
            <X className="size-5 text-[#333]" />
          </button>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-13 items-center justify-center rounded-full bg-[#FFF1F1]">
              <ExternalLink className="size-6 text-sub-red" />
            </div>

            <div className="flex flex-col gap-2">
              <h2
                id="save-browser-guide-title"
                className="font-wanted-sans text-[18px] font-bold leading-[1.4] tracking-[-0.36px] text-black"
              >
                Chrome 등의 외부 브라우저를 권장해요
              </h2>
              <p className="whitespace-pre-line font-wanted-sans text-sm leading-[1.5] tracking-[-0.28px] text-[#666]">
                {
                  '인스타 앱, 에타 앱의 링크를 통해 접속 시\n사진 다운로드가 제한돼요.\n\n이 경우 \nChrome이나 Safari 등 외부 브라우저로\n시도해주세요.'
                }
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 pt-1">
              <button
                type="button"
                onClick={onContinue}
                className="flex h-[50px] w-full items-center justify-center rounded-lg bg-sub-red"
              >
                <span className="font-wanted-sans text-base font-medium text-white">
                  계속 진행하기
                </span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-[#F5F5F5]"
              >
                <span className="font-wanted-sans text-sm font-medium text-[#555]">닫기</span>
              </button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    )}
  </AnimatePresence>
);
