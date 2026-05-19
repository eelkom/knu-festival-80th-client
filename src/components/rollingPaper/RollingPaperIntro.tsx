import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import rollingIntroIllust from '@/assets/rollingPaper/Group 425.svg';
import { INTRO_HERO_BACKGROUND_IMAGE } from '@/components/common/GradientBanner';
import RollingPaperPageTransition from './RollingPaperPageTransition';
import RollingPaperTabs from './RollingPaperTabs';
import { rollingPaperItemMotion } from './rollingPaperMotion';

export default function RollingPaperIntro() {
  return (
    <>
      <RollingPaperTabs active="intro" />
      <section
        className="relative flex min-h-[270px] items-end overflow-hidden px-5 py-[42px]"
        style={{ backgroundImage: INTRO_HERO_BACKGROUND_IMAGE }}
      >
        <h1 className="relative font-wanted-sans text-[2rem] font-bold leading-[1.4] tracking-[-0.02em] text-ink">
          80주년
          <br />
          롤링페이퍼
        </h1>
      </section>
      <RollingPaperPageTransition className="bg-white">
        <section className="flex flex-col gap-12 px-5 pt-16 pb-12">
          <motion.div className="flex flex-col gap-7" {...rollingPaperItemMotion}>
            <div className="flex flex-col gap-2.5">
              <p className="font-wanted-sans text-body1 font-bold leading-[1.5] tracking-[-0.02em] text-black">
                Rolling Paper
              </p>
              <h2 className="font-wanted-sans text-[18px] font-semibold leading-[1.4] tracking-[-0.02em] text-black">
                함께 만드는 80년의 기억
              </h2>
              <p className="whitespace-pre-line font-wanted-sans text-body1 font-medium leading-[1.5] tracking-[-0.02em] text-black/50">
                {
                  '축제의 순간을 짧은 메시지로 남겨보세요.\n모두의 기록이 하나의 롤링페이퍼에 모입니다.'
                }
              </p>
              <p className="whitespace-pre-line font-wanted-sans text-sm font-medium leading-[1.5] tracking-[-0.02em] text-black/35">
                {
                  '카테고리와 보드를 선택해 메시지를 남겨보세요.\n작성한 메시지는 보드 위 원하는 곳에 배치할 수 있어요.'
                }
              </p>
            </div>
            <Link
              to="/rolling-paper/categories"
              className="flex w-fit items-center gap-1.5 rounded-full border border-ink py-2.5 pl-5 pr-3.5"
            >
              <span className="font-wanted-sans text-sm font-medium leading-[1.5] text-ink">
                메시지 남기러 가기
              </span>
              <ArrowRight className="size-6 text-ink" />
            </Link>
          </motion.div>

          <motion.img
            src={rollingIntroIllust}
            alt=""
            className="mx-auto w-[287px] max-w-full object-contain"
            {...rollingPaperItemMotion}
          />
        </section>

        <div className="h-[52px]" />
      </RollingPaperPageTransition>
    </>
  );
}
