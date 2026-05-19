import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import { fadeUpVariant } from '@/constants/animation';

import mapIconImage from '@/assets/images/map-icon.webp';
import mapPreviewImage from '@/assets/images/map-preview.webp';
import reservationIconImage from '@/assets/images/reservation-icon.webp';
import tavernGuideMapImage from '@/assets/images/tavern-guide-map.webp';
import tavernGuideReservationImage from '@/assets/images/tavern-guide-reservation.webp';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { INTRO_HERO_BACKGROUND_IMAGE } from '@/components/common/GradientBanner';
import SectionBlock from '@/components/home/SectionBlock';
import type { TopTab } from '@/components/tavern/types';
import { tavernFaqs } from '@/constants/taverns';

type IntroOverviewProps = {
  onTabChange: (tab: TopTab) => void;
};

const MAP_PREVIEW_OBJECT_POSITION = '20% 70%';
const CONTACT_OPEN_CHAT_URL = 'https://open.kakao.com/o/gsMt0Evi';
const GUIDE_CARD_BACKGROUND_OVERLAY =
  'linear-gradient(132.09deg, #ffffff 34.45%, rgba(255, 255, 255, 0) 100%)';

export default function IntroOverview({ onTabChange }: IntroOverviewProps) {
  return (
    <>
      <section
        className="relative flex h-[270px] flex-col justify-center overflow-hidden px-5 py-[42px]"
        style={{ backgroundImage: INTRO_HERO_BACKGROUND_IMAGE }}
      >
        <div className="relative flex flex-col gap-[30px]">
          <h1 className="text-[2rem] font-bold leading-[1.4] tracking-[-0.8px] text-[#1a1a1a]">
            지도 및
            <br />
            주막 정보
          </h1>
          <button
            type="button"
            className="flex w-fit items-center gap-1.5 rounded-full border border-white/50 bg-white/20 py-2.5 pl-5 pr-3.5 text-[14px] font-medium leading-none text-[#1a1a1a]"
            onClick={() => onTabChange('list')}
          >
            인기 주막 둘러보기
            <FiArrowRight size={24} />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-12 bg-white px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionBlock
            label="How to use"
            title={`지도에서 주막 위치를 확인하고 \n빠르게 예약해요`}
            animate={false}
            className="flex flex-col gap-12"
            headingClassName="flex flex-col gap-1.5 px-0"
            labelClassName="text-[16px] font-bold leading-none tracking-[-0.32px] text-black"
            titleClassName="whitespace-pre-line text-[20px] font-bold leading-[1.4] tracking-[-0.4px] text-black"
          >
            <div className="flex flex-col gap-12">
              <IntroGuideCard
                category="Map"
                title="원하는 주막 아이콘 터치하기"
                description="메뉴와 대기 시간을 확인할 수 있어요."
                imageSrc={tavernGuideMapImage}
                illustrationSrc={mapIconImage}
                illustrationClassName="p-2 top-1/2 left-1/2 h-[250px] w-[300px] -translate-x-1/2 -translate-y-[52.5%]"
              />
              <IntroGuideCard
                category="Reservation"
                title="실시간 대기 현황 확인 및 예약"
                description={`총 3곳까지 미리 예약해\n줄을 서지 않고 기다릴 수 있어요.`}
                imageSrc={tavernGuideReservationImage}
                illustrationSrc={reservationIconImage}
                illustrationClassName="p-2 bottom-[30px] left-[47%] h-[270px] w-[320px] -translate-x-1/2"
              />
            </div>
          </SectionBlock>
        </motion.div>

        <SectionBlock
          label="Map"
          title="지도에서 모든 주막 리스트를 확인해요."
          className="flex flex-col gap-8"
          headingClassName="flex flex-col px-0"
          labelClassName="text-[16px] font-bold leading-none tracking-[-0.32px] text-black"
          titleClassName="mt-2.5 text-[20px] font-bold leading-none tracking-[-0.4px] text-black"
          action={<IntroPillButton label="주막 전체보기" onClick={() => onTabChange('map')} />}
          actionClassName="mt-4"
        >
          <MapPreviewIllustration />
        </SectionBlock>
      </section>

      <section className="py-8">
        <FaqAccordion label="FAQ" title="자주 묻는 질문" items={tavernFaqs} />
      </section>

      <motion.section className="flex flex-col gap-5 px-5 py-16" {...fadeUpVariant}>
        <h2 className="text-[18px] font-bold leading-[1.4] tracking-[-0.36px]">
          궁금한 점 간편하게 문의하기
        </h2>
        <a
          href={CONTACT_OPEN_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-full border border-black py-2.5 pl-5 pr-3.5 text-[14px] font-medium leading-none"
        >
          간편 문의하기
          <FiArrowRight size={24} />
        </a>
      </motion.section>
    </>
  );
}

type IntroGuideCardProps = {
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  illustrationSrc: string;
  illustrationClassName: string;
};

function IntroGuideCard({
  category,
  title,
  description,
  imageSrc,
  illustrationSrc,
  illustrationClassName,
}: IntroGuideCardProps) {
  return (
    <article className="relative flex h-[430px] w-full flex-col items-start overflow-hidden rounded-[6px] bg-black/[0.02]">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[6px]">
        <img src={imageSrc} alt="" className="size-full rounded-[6px] object-cover" />
        <div
          className="absolute inset-0 rounded-[6px]"
          style={{ backgroundImage: GUIDE_CARD_BACKGROUND_OVERLAY }}
        />
      </div>

      <div className="relative z-10 flex h-[104px] w-full shrink-0 flex-col items-start p-6">
        <div className="flex w-full flex-col items-start gap-2.5">
          <div className="flex w-full flex-col items-start gap-2.5">
            <p className="w-full break-words font-wanted-sans text-[16px] font-medium leading-none tracking-[-0.32px] text-[#333333]">
              {category}
            </p>
            <h3 className="w-full break-words font-wanted-sans text-[18px] font-bold leading-none text-[#1a1a1a]">
              {title}
            </h3>
          </div>
          <p className="w-full whitespace-pre-line break-words font-wanted-sans text-[16px] font-normal leading-[1.4] tracking-[-0.32px] text-[#808080]">
            {description}
          </p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[104px]">
        <img
          src={illustrationSrc}
          alt=""
          className={`absolute max-w-none object-contain ${illustrationClassName}`}
        />
      </div>
    </article>
  );
}

function IntroPillButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex w-fit items-center gap-1.5 rounded-full border border-[#1a1a1a] py-2.5 pl-5 pr-3.5 text-[14px] font-medium leading-none tracking-[-0.28px] text-[#1a1a1a]"
      onClick={onClick}
    >
      {label}
      <FiArrowRight size={24} />
    </button>
  );
}

function MapPreviewIllustration() {
  return (
    <div className="relative h-[240px] overflow-hidden bg-[#f9f9f9]">
      <span className="absolute left-3 top-3 z-10 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium leading-none tracking-[-0.22px] text-white">
        미리보기
      </span>
      <img
        src={mapPreviewImage}
        alt="주막 지도 미리보기"
        className="size-full object-cover"
        style={{ objectPosition: MAP_PREVIEW_OBJECT_POSITION }}
      />
    </div>
  );
}
