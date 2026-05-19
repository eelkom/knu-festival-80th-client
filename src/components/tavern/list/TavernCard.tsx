import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

import { imagePathToSrc } from '@/apis';
import type { Tavern } from '@/constants/taverns';

type TavernCardProps = {
  expanded: boolean;
  tavern: Tavern;
  showWaiting?: boolean;
  onMenuToggle: () => void;
  onRegister: () => void;
  onSelect?: () => void;
};

const resolveMenuBoardSrc = (src: string | null) => {
  if (src?.startsWith('/src/') || src?.startsWith('/assets/')) return src;
  return imagePathToSrc(src);
};

export default function TavernCard({
  expanded,
  tavern,
  showWaiting = true,
  onMenuToggle,
  onRegister,
  onSelect,
}: TavernCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const menuBoardSrc = resolveMenuBoardSrc(tavern.menuBoardImageUrl);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      setContentHeight(h);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const metaItems = [tavern.department].filter(Boolean);

  const cardSummary = (
    <>
      <div className="flex flex-col gap-2.5">
        <p className="flex gap-1 text-[16px] font-medium leading-none tracking-[-0.32px] text-[#808080]">
          {metaItems.map((item, index) => (
            <span key={item} className="flex gap-1">
              {index > 0 && <span>·</span>}
              <span>{item}</span>
            </span>
          ))}
        </p>
        <h3 className="text-[24px] font-bold leading-none tracking-[-0.48px]">{tavern.name}</h3>
      </div>
      {showWaiting && tavern.waitingOpen && (
        <div className="flex items-end gap-1">
          <strong className="text-[28px] font-bold leading-[1.4] tracking-[-0.56px] text-[#ff3d3d]">
            {tavern.waitTeams}
          </strong>
          <span className="pb-1 text-[16px] font-medium leading-[1.6] tracking-[-0.32px] text-black/50">
            팀 대기 중
          </span>
        </div>
      )}
    </>
  );

  return (
    <article className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white">
      <div className="flex flex-col items-center gap-2.5 px-6 py-6">
        <div className="flex w-full flex-col gap-4">
          {onSelect ? (
            <button type="button" className="flex flex-col gap-4 text-left" onClick={onSelect}>
              {cardSummary}
            </button>
          ) : (
            <div className="flex flex-col gap-4">{cardSummary}</div>
          )}
          {showWaiting &&
            (tavern.waitingOpen ? (
              <button
                type="button"
                className="h-[50px] w-full rounded-[8px] bg-[#ff3d3d] text-[16px] font-medium tracking-[-0.32px] text-white"
                onClick={onRegister}
              >
                대기 등록하기
              </button>
            ) : (
              <p className="text-[13px] tracking-[-0.26px] text-[#808080]">
                현재 대기 등록을 받지 않고 있어요
              </p>
            ))}
        </div>
        {menuBoardSrc && (
          <>
            <motion.div
              animate={{ height: expanded ? contentHeight : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="w-full scroll-mt-28 overflow-hidden"
            >
              <div
                ref={contentRef}
                className="flex flex-col gap-2.5 border-t border-[#e5e5e5] pt-5 pb-1"
              >
                <p className="text-[16px] font-medium leading-none tracking-[-0.32px] text-black/50">
                  메뉴판
                </p>
                <img
                  src={menuBoardSrc}
                  alt={`${tavern.name} 메뉴판`}
                  loading="lazy"
                  className="h-auto w-full bg-[#f9f9f9] object-contain"
                />
              </div>
            </motion.div>
            <button
              type="button"
              className="flex items-center justify-center text-[14px] font-medium leading-none tracking-[-0.28px] text-[#808080]"
              aria-expanded={expanded}
              onPointerDown={() => {
                if (!expanded && menuBoardSrc) new Image().src = menuBoardSrc;
              }}
              onClick={onMenuToggle}
            >
              {expanded ? '접기' : '메뉴'}
              <FiChevronDown
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
