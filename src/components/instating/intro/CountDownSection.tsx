import CountDownTimer from './CountDownTimer';
import { fadeUpVariant } from '@/constants/animation';
import { motion } from 'framer-motion';

// 축제 종료 후 서버 운영이 중단되어 종료 상태로 고정한다.
const SERVICE_ENDED_LABEL = '인스타팅 서비스가 종료되었습니다.';
const ENDED_DEADLINE = new Date(0);

const CountDownSection = () => {
  return (
    <motion.div className="flex w-full flex-col gap-6 bg-white px-5 pb-16 pt-8" {...fadeUpVariant}>
      <div className="flex flex-col gap-1.5">
        <p className="font-wanted-sans text-[16px] font-bold leading-[1.4] tracking-[-0.32px] text-ink">
          Count Down
        </p>
        <p className="whitespace-pre-line font-wanted-sans text-[18px] font-medium leading-[1.4] tracking-[-0.36px] text-ink">
          {SERVICE_ENDED_LABEL}
        </p>
      </div>

      <CountDownTimer deadline={ENDED_DEADLINE} />
    </motion.div>
  );
};

export default CountDownSection;
