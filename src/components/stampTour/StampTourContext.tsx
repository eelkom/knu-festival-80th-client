import stampHero from '@/assets/stampTour/stampHero.webp';
import prizeStars from '@/assets/stampTour/prize_stars.webp';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OutlineButton from '@/components/common/OutlineButton';
import ProcessCard from '@/components/common/ProcessCard';
import { fadeUpVariant } from '@/constants/animation';
import { STAMP_TOUR_STEPS, STAMP_TOUR_PRIZES } from '@/constants/stampTour';

const StampTourContext = () => {
  const navigate = useNavigate();
  const goToBooths = () => navigate('/stamptour/booths');

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full flex-col items-center gap-12 px-5 pb-[200px] pt-16">
        {/* Section header */}
        <motion.div className="flex w-full flex-col gap-4 pt-8" {...fadeUpVariant}>
          <div className="flex flex-col gap-2.5">
            <p className="font-wanted-sans text-body1 font-bold tracking-tight text-ink">
              2026 Stamp Tour
            </p>
            <h2 className="font-wanted-sans text-subheading font-bold tracking-tight text-ink">
              2026 대동제 스탬프 투어
            </h2>
            <p className="font-wanted-sans text-body1 leading-[1.4] tracking-tight text-gray">
              부스 방문하고 스탬프를 모아보세요! <br />
              전용 스탬프를 모두 채우시면 대동제 기획팀이 준비한 특별한 선물을 드려요.
            </p>
          </div>
          <OutlineButton label="부스 위치 확인하기" showArrow variant="red" onClick={goToBooths} />
        </motion.div>

        <motion.img
          src={stampHero}
          alt="스탬프 투어 카드"
          fetchPriority="high"
          width={297}
          height={245}
          className="w-[297px]"
          {...fadeUpVariant}
        />

        {/* Step cards */}
        <motion.ol
          className="flex w-full flex-col gap-[30px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {STAMP_TOUR_STEPS.map((s) => (
            <motion.li
              key={s.step}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
              }}
            >
              <ProcessCard {...s} />
            </motion.li>
          ))}
        </motion.ol>

        {/* Prizes */}
        <motion.div className="flex w-full flex-col gap-12" {...fadeUpVariant}>
          <div className="flex flex-col gap-2.5">
            <p className="font-wanted-sans text-body1 font-bold tracking-tight text-ink">
              Stamp Prizes
            </p>
            <h2 className="font-wanted-sans text-subheading font-bold tracking-tight text-ink">
              2026 대동제가 준비한 상품
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {STAMP_TOUR_PRIZES.map(({ name, imgSrc }) => (
              <li
                key={name}
                className="relative flex h-[180px] items-center justify-center gap-[30px] overflow-hidden rounded-xl px-[30px] py-5"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(255,61,61,0.05) 0%, #ffffff 40%, rgba(255,61,61,0.10) 100%)',
                }}
              >
                <div className="flex w-[100px] shrink-0 flex-col items-center gap-2">
                  <img
                    src={prizeStars}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="pointer-events-none h-[37px] w-[80px] object-bottom"
                  />
                  <p className="text-center font-wanted-sans text-[20px] font-bold leading-none tracking-tight text-ink whitespace-nowrap">
                    {name}
                  </p>
                </div>
                <img
                  src={imgSrc}
                  alt={name.replace('\n', ' ')}
                  loading="lazy"
                  className="size-[156px] shrink-0 object-contain"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default StampTourContext;
