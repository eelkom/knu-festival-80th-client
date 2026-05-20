import locationSvg from '@/assets/quickmenu/location.png';
import tavernSvg from '@/assets/quickmenu/tavern.png';
import concertSvg from '@/assets/quickmenu/concert.png';
import rollingpaperSvg from '@/assets/quickmenu/rollingpaper.png';
import instatingSvg from '@/assets/quickmenu/instating.png';
import photoSvg from '@/assets/quickmenu/photo.png';
import stampSvg from '@/assets/quickmenu/stamp.png';
import goodsSvg from '@/assets/quickmenu/goods.png';

export const QUICK_MENU_ITEMS = [
  {
    icon: locationSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0 },
    title: '지도',
    subtitle: '내 주변 부스 찾기',
    to: '/map',
  },
  {
    icon: tavernSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0, aspectRatio: '25/23' },
    title: '주막 정보',
    subtitle: '웨이팅 없이 예약하기',
    to: '/taverns',
  },
  {
    icon: concertSvg,
    iconStyle: {
      width: '2.25rem',
      height: '2.25rem',
      flexShrink: 0,
      aspectRatio: '19.72/19.77',
    },
    title: '공연 정보',
    subtitle: '오늘의 무대 확인하기',
    to: '/timetable',
  },
  {
    icon: rollingpaperSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0 },
    title: '롤링페이퍼',
    subtitle: '추억 한 줄 남기기',
    to: '/rolling-paper',
  },
  {
    icon: instatingSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0, aspectRatio: '1/1' },
    title: '인스타팅',
    subtitle: '나의 인연 찾아보기',
    to: '/instating',
  },
  {
    icon: photoSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0 },
    title: '호반우 인생두컷',
    subtitle: '호반우와 사진 찍기',
    to: '/hobanustagram',
  },
  {
    icon: stampSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0 },
    title: '스탬프 투어',
    subtitle: '도장 모아 경품 받기',
    to: '/stamptour',
  },
  {
    icon: goodsSvg,
    iconStyle: { width: '2.25rem', height: '2.25rem', flexShrink: 0 },
    title: '축제 굿즈',
    subtitle: '한정 굿즈 둘러보기',
    to: '/goods',
  },
];
