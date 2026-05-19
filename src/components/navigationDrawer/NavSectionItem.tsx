import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuChevronDown } from 'react-icons/lu';
import type { NavSection } from '@/types/navigationDrawer';

export interface NavSectionItemProps {
  item: NavSection;
  isExpanded: boolean;
  isActive: boolean;
  onExpand: () => void;
  onToggle: () => void;
  onClose: () => void;
}

export const NavSectionItem = ({
  item,
  isExpanded,
  isActive,
  onExpand,
  onToggle,
  onClose,
}: NavSectionItemProps) => {
  return (
    <div className="border-t border-gray-200">
      <div
        className={`relative flex w-full items-center ${
          isExpanded ? 'border-b border-gray-200' : ''
        }`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#FF0026_0%,#FF9500_100%)]"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <button
          type="button"
          className="relative flex flex-1 items-center px-5 py-3.5 text-left font-wanted-sans text-[1.25rem] font-bold leading-none tracking-[-0.025rem]"
          onClick={onExpand}
        >
          <motion.span
            animate={{ color: isActive ? '#ffffff' : '#000000' }}
            transition={{ duration: 0.25 }}
          >
            {item.label}
          </motion.span>
        </button>

        <button
          type="button"
          className="relative flex shrink-0 items-center px-4 py-3.5"
          onClick={onToggle}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ color: isActive ? '#ffffff' : 'rgba(0,0,0,0.7)' }}
              transition={{ duration: 0.25 }}
            >
              <LuChevronDown size={20} />
            </motion.div>
          </motion.div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 400, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden bg-transparent"
          >
            <div className="flex flex-col gap-5 px-5 py-3.5">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.to}
                  onClick={onClose}
                  className="font-wanted-sans text-[1rem] font-normal leading-none tracking-[-0.02rem] text-black/70"
                >
                  {'- ' + child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
