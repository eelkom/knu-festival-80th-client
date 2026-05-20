import type React from 'react';
import { Link } from 'react-router-dom';
import { QUICK_MENU_ITEMS } from '@/constants/quickMenu';

interface QuickMenuItemProps {
  icon: string;
  iconStyle?: React.CSSProperties;
  title: string;
  subtitle: string;
  to: string;
}

const QuickMenuItem = ({ icon, iconStyle, title, subtitle, to }: QuickMenuItemProps) => (
  <Link
    to={to}
    className="flex flex-col gap-3.5 rounded-xl border border-[#efefef] bg-white p-4 transition-opacity active:opacity-60"
  >
    <img src={icon} alt="" style={iconStyle} />
    <div className="flex flex-col gap-2">
      <p className="font-wanted-sans text-body1 font-medium leading-none tracking-[-0.02rem] text-black">
        {title}
      </p>
      <p className="font-wanted-sans text-caption font-normal leading-none tracking-[-0.015rem] text-gray">
        {subtitle}
      </p>
    </div>
  </Link>
);

export const QuickMenu = () => (
  <div className="grid grid-cols-2 gap-2 px-5">
    {QUICK_MENU_ITEMS.map((item) => (
      <QuickMenuItem key={item.to} {...item} />
    ))}
  </div>
);
