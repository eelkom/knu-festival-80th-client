import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TavernCard from '@/components/tavern/list/TavernCard';
import { tavernSortOptions, type Tavern, type TavernSortKey } from '@/constants/taverns';
import { preloadImage } from '@/lib/preloadImage';
import { resolveMenuBoardSrc } from '@/lib/resolveMenuBoardSrc';

type TavernListViewProps = {
  expandedMenuId: string | null;
  sortKey: TavernSortKey;
  taverns: Tavern[];
  onMenuToggle: (id: string | null) => void;
  onRegister: (tavern: Tavern) => void;
  onSelectTavern: (tavern: Tavern) => void;
  onSortChange: (key: TavernSortKey) => void;
};

export default function TavernListView({
  expandedMenuId,
  sortKey,
  taverns,
  onMenuToggle,
  onRegister,
  onSelectTavern,
  onSortChange,
}: TavernListViewProps) {
  useEffect(() => {
    for (const tavern of taverns) {
      const src = resolveMenuBoardSrc(tavern.menuBoardImageUrl);
      if (src) preloadImage(src);
    }
  }, [taverns]);

  const handleSortChange = (key: TavernSortKey) => {
    if (key === sortKey) return;

    onMenuToggle(null);
    onSortChange(key);
  };

  return (
    <section className="flex flex-col gap-3 px-5 py-6">
      <motion.h1
        className="text-[24px] font-bold leading-[1.6] tracking-[-0.48px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        주막 목록
      </motion.h1>
      <TavernSortTabs sortKey={sortKey} onSortChange={handleSortChange} />
      <motion.div
        key={sortKey}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {sortKey === 'name' ? (
          <div className="flex flex-col gap-2">
            {taverns.map((tavern) => (
              <motion.div
                key={tavern.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
                }}
              >
                <TavernCompactCard tavern={tavern} onSelect={() => onSelectTavern(tavern)} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {taverns.map((tavern) => (
              <motion.div
                key={tavern.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
                }}
              >
                <TavernCard
                  expanded={expandedMenuId === tavern.id}
                  tavern={tavern}
                  onMenuToggle={() => onMenuToggle(expandedMenuId === tavern.id ? null : tavern.id)}
                  onRegister={() => onRegister(tavern)}
                  onSelect={() => onSelectTavern(tavern)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function TavernCompactCard({ tavern, onSelect }: { tavern: Tavern; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      className="flex w-full items-center justify-between rounded-[12px] border border-[#e5e5e5] bg-white px-5 py-4 text-left"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <span className="text-[13px] font-medium tracking-[-0.26px] text-[#808080]">
          자세히 보기 &gt;
        </span>
        <span className="w-full text-left text-[18px] font-bold leading-[1.2] tracking-[-0.36px] text-black">
          {tavern.name}
        </span>
      </div>
      {tavern.waitingOpen && (
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[13px] font-medium tracking-[-0.26px] text-[#808080]">웨이팅</span>
          <span className="text-[18px] font-bold leading-none tracking-[-0.36px]">
            <span className="text-[#ff3d3d]">{tavern.waitTeams}</span>
            <span className="text-[#808080]">팀</span>
          </span>
        </div>
      )}
    </motion.button>
  );
}

function TavernSortTabs({
  sortKey,
  onSortChange,
}: {
  sortKey: TavernSortKey;
  onSortChange: (key: TavernSortKey) => void;
}) {
  return (
    <div className="flex w-full rounded-[8px] bg-[#f9f9f9] p-1" aria-label="주막 정렬">
      {tavernSortOptions.map((option) => {
        const selected = sortKey === option.key;

        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={selected}
            className={`h-10 min-w-0 flex-1 touch-manipulation select-none rounded-[8px] px-2 text-center text-[16px] leading-6 tracking-[-0.32px] ${
              selected ? 'bg-white font-semibold text-[#ff3d3d]' : 'font-normal text-[#808080]'
            }`}
            onPointerUp={(event) => {
              if (event.pointerType === 'mouse') return;
              event.preventDefault();
              onSortChange(option.key);
            }}
            onClick={() => onSortChange(option.key)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
