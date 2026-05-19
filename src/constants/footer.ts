import { LEGAL_LINKS } from '@/constants/legal';

export const NAV_LINKS = [
  { label: '지도 정보', to: '/map' },
  { label: '롤링페이퍼', to: '/rolling-paper' },
  { label: '인스타팅', to: '/instating' },
  { label: '호반우스타그램', to: '/hobanustagram' },
] as const;

export const FOOTER_LINKS = [
  { label: '개인정보처리방침', href: LEGAL_LINKS.privacyPolicy },
  { label: '서비스 이용약관', href: LEGAL_LINKS.termsOfService },
  { label: '이메일무단수집거부', href: LEGAL_LINKS.emailHarvestingProhibited },
] as const;
