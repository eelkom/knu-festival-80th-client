import { fadeUpVariant } from '@/constants/animation';
import { motion } from 'framer-motion';

interface ApplicantCardProps {
  label: string;
  count: number;
  countColor: string;
  bgColor: string;
}

const ApplicantCard = ({ label, count, countColor, bgColor }: ApplicantCardProps) => (
  <div className={`flex flex-1 flex-col gap-5 rounded-lg px-4 py-5 ${bgColor}`}>
    <p
      className={`font-wanted-sans text-[24px] font-bold leading-none tracking-[-0.48px] ${countColor}`}
    >
      {count}명
    </p>
    <p className="font-wanted-sans text-[16px] font-medium leading-none tracking-[-0.32px] text-[rgba(0,0,0,0.7)]">
      {label}
    </p>
  </div>
);

// 축제 종료 후 서버 운영이 중단되어 3일간 최종 신청자 수를 하드코딩한다.
const TOTAL_MALE = 1702;
const TOTAL_FEMALE = 1229;

const ApplicantsNumberSection = () => {
  const maleCount = TOTAL_MALE;
  const femaleCount = TOTAL_FEMALE;
  const subtitle = `3일간 총 신청자 현황 (총 ${maleCount + femaleCount}명)`;

  return (
    <motion.div className="flex w-full flex-col gap-6 bg-white px-5 py-8" {...fadeUpVariant}>
      <div className="flex flex-col gap-1.5">
        <p className="font-wanted-sans text-[16px] font-bold leading-[1.4] tracking-[-0.32px] text-ink">
          Applicants
        </p>
        <p className="font-wanted-sans text-[18px] font-medium leading-[1.4] tracking-[-0.36px] text-ink">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-2">
        <ApplicantCard
          label="남성"
          count={maleCount}
          countColor="text-[#0cc493]"
          bgColor="bg-[rgba(85,255,150,0.1)]"
        />
        <ApplicantCard
          label="여성"
          count={femaleCount}
          countColor="text-[#f89100]"
          bgColor="bg-[rgba(255,240,101,0.15)]"
        />
      </div>

      <div className="rounded-md bg-[#f9f9f9] p-4 pb-2">
        <p className="font-wanted-sans text-body2 font-medium leading-[1.5] tracking-tight text-gray">
          *인스타팅은 하루 1번, 축제 기간 총 3번 참여 가능합니다.
          <br />
          *성비 불균형 발생 시, 신청자가 적은 성별의 인원에 맞춰 &apos;선착순&apos;으로 대상자가
          제한(컷오프)된 후 최종 매칭이 진행됩니다.
          <br />
          *나의 매칭 결과와 상대방의 매칭 결과가 서로 다릅니다. 매칭된 상대에게 먼저 연락해주세요!
        </p>
      </div>
    </motion.div>
  );
};

export default ApplicantsNumberSection;
