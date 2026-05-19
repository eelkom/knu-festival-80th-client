import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';

import { NavigationDrawer } from '@/components/navigationDrawer/NavigationDrawer';
import knu80thLogo from '@/assets/logo/knu80th_logo_dark.png';

export const MainHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="fixed left-1/2 top-0 z-50 w-full max-w-[600px] -translate-x-1/2 backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)]">
        <div className="mx-auto flex h-16 w-full items-center justify-between pl-5 pr-3">
          <Link
            to="/"
            aria-label="홈으로 이동"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={knu80thLogo}
              alt="KNU 80주년 대동제"
              className="h-4.5 w-47.5 object-contain"
              style={{ aspectRatio: '95 / 9' }}
            />
          </Link>

          <button type="button" className="text-ink" onClick={() => setIsDrawerOpen(true)}>
            <LuMenu size={24} />
          </button>
        </div>
      </header>
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
