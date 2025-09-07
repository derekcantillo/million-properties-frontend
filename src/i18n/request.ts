import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ requestLocale }) => {
  // Debug logging
  console.log(
    '🌐 i18n request config - received requestLocale:',
    requestLocale
  );

  // Get locale from the request
  let finalLocale = await requestLocale;

  // If still not available, try from headers
  if (!finalLocale) {
    const headersList = await headers();
    const localeFromHeader = headersList.get('x-next-intl-locale');
    console.log(
      '🌐 i18n request config - locale from header:',
      localeFromHeader
    );
    finalLocale = localeFromHeader || 'en';
  }

  // Ensure locale is valid, fallback to 'en' if not
  const validLocale =
    finalLocale && ['en', 'es'].includes(finalLocale) ? finalLocale : 'en';

  console.log('🌐 i18n request config - using locale:', validLocale);

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
