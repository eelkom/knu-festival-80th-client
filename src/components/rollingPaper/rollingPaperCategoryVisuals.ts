import categoryBoothImage from '@/assets/rollingPaper/categories/category-booth.webp';
import categoryCongratsImage from '@/assets/rollingPaper/categories/category-congrats.webp';
import categoryFriendsImage from '@/assets/rollingPaper/categories/category-friends.webp';
import categoryMoodImage from '@/assets/rollingPaper/categories/category-mood.webp';
import categoryPerformanceImage from '@/assets/rollingPaper/categories/category-performance.webp';

export const ROLLING_PAPER_CATEGORY_VISUALS = [
  { image: categoryCongratsImage, background: '#fff2f2' },
  { image: categoryPerformanceImage, background: '#eafaf3' },
  { image: categoryBoothImage, background: '#fff3ea' },
  { image: categoryFriendsImage, background: '#f9f3fa' },
  { image: categoryMoodImage, background: '#fff8df' },
] as const;

export function getRollingPaperCategoryVisual(index: number) {
  return ROLLING_PAPER_CATEGORY_VISUALS[index % ROLLING_PAPER_CATEGORY_VISUALS.length];
}
