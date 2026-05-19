import Clarity from '@microsoft/clarity';

import { getRuntimeEnv } from '@/config/runtimeEnv';

const ABSOLUTE_URL_ATTRIBUTES = [
  ['link[href]', 'href'],
  ['script[src]', 'src'],
] as const;

const shouldNormalizeUrl = (value: string) =>
  value !== '' &&
  !value.startsWith('#') &&
  !value.startsWith('data:') &&
  !value.startsWith('blob:') &&
  !value.startsWith('javascript:');

function normalizeClarityAssetUrls(): void {
  for (const [selector, attribute] of ABSOLUTE_URL_ATTRIBUTES) {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      const value = element.getAttribute(attribute);
      if (!value || !shouldNormalizeUrl(value)) return;

      element.setAttribute(attribute, new URL(value, document.baseURI).href);
    });
  }
}

export function initClarity(): void {
  const clarityId = getRuntimeEnv('VITE_CLARITY_ID').trim();
  if (!clarityId || typeof window === 'undefined') return;

  normalizeClarityAssetUrls();
  Clarity.init(clarityId);
}
