import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/constants/animation';
import { ROLES } from '@/constants/credits';
import RoleSectionBlock from '@/components/credits/RoleSectionBlock';
import mascotImg from '@/assets/credits/cuteBanwoo.png';

export default function CreditsPage() {
  return (
    <div className="flex flex-col bg-surface">
      <div className="relative bg-background px-5 py-[42px]">
        <motion.div className="flex flex-col gap-[3px]" {...fadeUpVariant}>
          <h1 className="text-display1 tracking-[-0.8px] text-text">만든이들</h1>
          <p className="mt-2 text-body2 text-text-muted">
            KNU80 축제 웹사이트를
            <br />
            함께 만든 사람들을 소개합니다.
          </p>
        </motion.div>
        <motion.img
          src={mascotImg}
          alt=""
          aria-hidden
          className="absolute right-5 top-[14px] h-[240px] w-[168px] sm:h-[280px] sm:w-[196px] md:h-[300px] md:w-[210px] object-cover pointer-events-none"
          {...fadeUpVariant}
          transition={{ ...fadeUpVariant.transition, delay: 0.1 }}
        />
      </div>
      <div className="flex flex-col divide-y divide-border">
        {ROLES.map((role, i) => (
          <motion.div
            key={role.id}
            {...fadeUpVariant}
            transition={{ ...fadeUpVariant.transition, delay: i * 0.1 }}
          >
            <RoleSectionBlock role={role} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
