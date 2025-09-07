import { createNavigation } from 'next-intl/navigation';
import { locales } from '@/lib/i18n/config';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
});

// Helper function to generate localized URLs
export function getLocalizedUrl(path: string, locale: string): string {
  if (locale === 'en') {
    return path;
  }
  return `/${locale}${path}`;
}

// Helper function to extract locale from pathname
export function extractLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  if (
    potentialLocale &&
    locales.includes(potentialLocale as (typeof locales)[number])
  ) {
    return potentialLocale;
  }

  return 'en'; // default locale
}
