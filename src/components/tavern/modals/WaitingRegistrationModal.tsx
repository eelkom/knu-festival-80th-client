import { useState } from 'react';
import { FiX } from 'react-icons/fi';

import { registerWaiting } from '@/apis/modules/waiting';
import { toApiClientError } from '@/apis/error';
import FieldInput from '@/components/tavern/shared/FieldInput';
import type { WaitingReservation } from '@/components/tavern/types';
import { LEGAL_LINKS } from '@/constants/legal';
import type { Tavern } from '@/constants/taverns';

type WaitingRegistrationModalProps = {
  tavern: Tavern;
  onClose: () => void;
  onSubmit: (reservation: WaitingReservation) => void;
};

export default function WaitingRegistrationModal({
  tavern,
  onClose,
  onSubmit,
}: WaitingRegistrationModalProps) {
  const [name, setName] = useState('');
  const [partySize, setPartySize] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canSubmit =
    !loading &&
    name.trim().length > 0 &&
    partySize.trim().length > 0 &&
    phoneNumber.trim().length > 0 &&
    termsAgreed &&
    privacyAgreed;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await registerWaiting(tavern.boothId, {
        name: name.trim(),
        partySize: parseInt(partySize, 10),
        phoneNumber: phoneNumber.trim(),
      });

      onSubmit({
        tavern,
        name: name.trim(),
        partySize,
        phoneNumber: phoneNumber.trim(),
        response,
      });
    } catch (err) {
      const apiError = toApiClientError(err);
      if (apiError.code === 'W006') {
        setError('이미 해당 주막에 대기 등록이 되어있습니다.');
      } else if (apiError.code === 'W007') {
        setError('최대 3곳까지만 대기 등록이 가능합니다.');
      } else if (apiError.code === 'W008') {
        setError('이미 등록된 전화번호의 예약자명과 일치하지 않습니다.');
      } else if (apiError.code === 'W004') {
        setError('현재 대기 접수가 중단되었습니다.');
      } else {
        setError(apiError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/30">
      <div className="flex min-h-dvh w-full max-w-[375px] items-center px-5 py-8">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="waiting-registration-title"
          className="relative w-full overflow-hidden rounded-[12px] bg-white pb-6 pt-4"
        >
          <div className="flex items-center justify-between px-5">
            <h2
              id="waiting-registration-title"
              className="w-full text-center text-[18px] font-semibold leading-[1.5] tracking-[-0.18px]"
            >
              대기 등록하기
            </h2>
            <button
              type="button"
              className="absolute right-5 top-4 flex size-8 items-center justify-center"
              aria-label="대기 등록 모달 닫기"
              onClick={onClose}
            >
              <FiX size={24} />
            </button>
          </div>

          <form className="mt-6 flex flex-col gap-5 px-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-semibold leading-[1.5] tracking-[-0.16px]">
                  예약 주막
                </p>
                <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#ff3d3d]">
                  {tavern.name}
                </p>
              </div>
              <FieldInput
                id="waiting-name"
                label="예약자명"
                placeholder="이름을 입력해주세요"
                value={name}
                autoComplete="name"
                onChange={setName}
              />
              <FieldInput
                id="waiting-party-size"
                label="인원"
                placeholder="예약 인원을 입력해주세요 (숫자만)"
                value={partySize}
                inputMode="numeric"
                onChange={setPartySize}
              />
              <FieldInput
                id="waiting-phone"
                label="연락처"
                placeholder="번호를 입력해주세요 ('-' 없이 번호만)"
                value={phoneNumber}
                autoComplete="tel"
                inputMode="numeric"
                onChange={setPhoneNumber}
              />
            </div>

            <div className="flex flex-col gap-4">
              <ConsentCheckbox
                id="waiting-terms-agreed"
                checked={termsAgreed}
                onChange={setTermsAgreed}
                label="(필수) 대동제 웹서비스 이용약관에 동의합니다."
                linkLabel="[약관 전문 보기]"
                linkUrl={LEGAL_LINKS.termsOfService}
              />
              <ConsentCheckbox
                id="waiting-privacy-agreed"
                checked={privacyAgreed}
                onChange={setPrivacyAgreed}
                label="(필수) 개인정보 수집 및 이용에 동의합니다."
                linkLabel="[동의서 전문 보기]"
                linkUrl={LEGAL_LINKS.privacyConsent}
              />
            </div>

            {error && (
              <p className="rounded-[8px] bg-red-50 px-4 py-3 text-[14px] font-medium text-[#ff3d3d]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`h-[51px] w-full rounded-[8px] text-[16px] font-semibold tracking-[-0.32px] text-white ${
                canSubmit ? 'bg-[#ff3d3d]' : 'bg-[#cccccc]'
              }`}
              disabled={!canSubmit}
            >
              {loading ? '등록 중...' : '대기 등록하기'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function ConsentCheckbox({
  id,
  checked,
  onChange,
  label,
  linkLabel,
  linkUrl,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  linkLabel: string;
  linkUrl: string;
}) {
  return (
    <div className="flex items-start gap-1.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="sr-only"
        onChange={(event) => onChange(event.target.checked)}
      />
      <label
        htmlFor={id}
        className={`mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm ${
          checked ? 'bg-[#ff3d3d]' : 'border-2 border-[#e5e5e5] bg-white'
        }`}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
            <path
              d="M1 4L4.5 7.5L11 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </label>
      <p className="min-w-0 text-[13px] font-medium leading-[1.5] tracking-[-0.26px] text-[#1a1a1a]">
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>{' '}
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap text-[#B2B2B2] underline underline-offset-2"
        >
          {linkLabel}
        </a>
      </p>
    </div>
  );
}
