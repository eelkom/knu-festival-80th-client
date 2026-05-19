import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUpVariant } from '@/constants/animation';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  label?: string;
  title?: string;
  items: FaqItem[];
}

export const FaqAccordion = ({
  label = 'FAQ',
  title = '자주 묻는 질문',
  items,
}: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div className="flex w-full flex-col gap-8" {...fadeUpVariant}>
      <div className="flex flex-col gap-1.5 px-5">
        <p className="font-wanted-sans text-xs font-semibold uppercase tracking-widest text-black/40">
          {label}
        </p>
        <p className="font-wanted-sans text-xl font-bold leading-tight tracking-[-0.03rem] text-black">
          {title}
        </p>
      </div>
      <div className="flex flex-col gap-2 px-5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              animate={{
                backgroundColor: isOpen ? '#ffffff' : '#f7f7f7',
                borderColor: isOpen ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)',
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border px-5 py-4"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3"
                onClick={() => toggle(index)}
              >
                <span className="text-left font-wanted-sans text-[15px] font-semibold leading-snug tracking-[-0.02rem] text-black">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0"
                >
                  <ChevronDown className="size-5 text-black/50" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 border-t border-black/70 pt-3">
                      <p className="font-wanted-sans text-sm font-medium leading-relaxed tracking-[-0.01rem] text-black/55">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
