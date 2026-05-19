import CountDownTimer from './CountDownTimer';
import { useMatchingStatus } from '@/hooks/instating/useMatchingStatus';
import MatchingStatusFallback from '@/components/instating/MatchingStatusFallback';
import { fadeUpVariant } from '@/constants/animation';
import { motion } from 'framer-motion';

const CountDownSection = () => {
  const { data, isError, refetch } = useMatchingStatus();

  if (isError) return <MatchingStatusFallback onRetry={refetch} className="pb-16 pt-8" />;

  let label: string;
  let deadline: Date;

  if (!data) {
    label = '';
    deadline = new Date(0);
  } else {
    const now = new Date();
    const firstFestivalStart = data.festivalDays[0]
      ? new Date(`${data.festivalDays[0]}T11:00:00+09:00`)
      : null;
    const nextRegistrationOpenAt = data.registrationOpenAt
      ? new Date(data.registrationOpenAt)
      : null;

    if (firstFestivalStart && now < firstFestivalStart) {
      label = '인스타팅 서비스 오픈까지';
      deadline = firstFestivalStart;
    } else if (data.registrationOpen && data.registrationDeadline) {
      label = '인스타팅 신청 마감까지';
      deadline = new Date(data.registrationDeadline);
    } else if (
      !data.registrationOpen &&
      !data.resultOpen &&
      data.resultOpenAt &&
      new Date(data.resultOpenAt) > now
    ) {
      label = '인스타팅 매칭 공개까지';
      deadline = new Date(data.resultOpenAt);
    } else if (nextRegistrationOpenAt && nextRegistrationOpenAt > now) {
      label = '인스타팅 신청 오픈까지';
      deadline = nextRegistrationOpenAt;
    } else {
      label = '인스타팅 서비스가 종료되었습니다.';
      deadline = new Date(0);
    }
  }

  return (
    <motion.div className="flex w-full flex-col gap-6 bg-white px-5 pb-16 pt-8" {...fadeUpVariant}>
      <div className="flex flex-col gap-1.5">
        <p className="font-wanted-sans text-[16px] font-bold leading-[1.4] tracking-[-0.32px] text-ink">
          Count Down
        </p>
        <p className="whitespace-pre-line font-wanted-sans text-[18px] font-medium leading-[1.4] tracking-[-0.36px] text-ink">
          {label}
        </p>
      </div>

      <CountDownTimer deadline={deadline} />
    </motion.div>
  );
};

export default CountDownSection;
