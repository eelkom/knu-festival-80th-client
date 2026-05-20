import { imagePathToSrc } from '@/apis';

export const resolveMenuBoardSrc = (src: string | null | undefined): string | undefined => {
  if (src?.startsWith('/src/') || src?.startsWith('/assets/')) return src;
  return imagePathToSrc(src);
};
