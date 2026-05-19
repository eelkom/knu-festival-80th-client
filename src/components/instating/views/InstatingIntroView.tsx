import { GradientBanner } from '@/components/common/GradientBanner';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import ApplicantsNumberSection from '@/components/instating/intro/ApplicantsNumberSection';
import CountDownSection from '@/components/instating/intro/CountDownSection';
import { instatingFaqItems } from '@/constants/instating';
import InstatingContent from '../intro/InstatingContent';

const InstatingIntroView = () => {
  return (
    <>
      <GradientBanner title="두근두근 인스타팅" />
      <CountDownSection />
      <ApplicantsNumberSection />
      <InstatingContent />
      <section className="py-16">
        <FaqAccordion items={instatingFaqItems} />
      </section>
    </>
  );
};

export default InstatingIntroView;
