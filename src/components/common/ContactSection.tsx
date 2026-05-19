import { ArrowRight } from 'lucide-react';

const CONTACT_OPEN_CHAT_URL = 'https://open.kakao.com/o/gsMt0Evi';

export const ContactSection = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-5">
      <div className="flex flex-col gap-1.5">
        <p className="font-wanted-sans text-xs font-semibold uppercase tracking-widest text-black/40">
          Contact
        </p>
        <p className="font-wanted-sans text-xl font-bold leading-tight tracking-[-0.03em] text-black">
          문의하기
        </p>
        <p className="font-wanted-sans text-sm font-medium leading-relaxed tracking-[-0.01em] text-black/55">
          축제 운영팀에 언제든 연락하세요
        </p>
      </div>

      <div className="rounded-xl border border-black/8 bg-[#f7f7f7] px-5 py-4">
        <div className="flex flex-col gap-4">
          {[{ label: '위치', value: '경북대학교 일청담 광장 운영부스' }].map(
            ({ label, value }, i) => (
              <div key={label}>
                {i !== 0 && <div className="mb-4 border-t border-black/70" />}
                <div className="flex items-center justify-between gap-3">
                  <p className="font-wanted-sans text-[15px] font-semibold tracking-[-0.02em] text-black">
                    {label}
                  </p>
                  <p className="font-wanted-sans text-sm font-medium tracking-[-0.01em] text-black/55">
                    {value}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-wanted-sans text-xl font-bold leading-tight tracking-[-0.03em] text-black">
          웹 서비스 이용 중 불편한 점 문의하기
        </p>
        <a
          href={CONTACT_OPEN_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-full border border-ink py-2.5 pl-5 pr-3.5"
        >
          <span className="font-wanted-sans text-sm font-medium leading-none tracking-[-0.02em] text-ink">
            간편 문의하기
          </span>
          <ArrowRight className="size-6 text-ink" />
        </a>
      </div>
    </div>
  );
};
