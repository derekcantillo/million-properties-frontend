import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

export default getRequestConfig(async ({ requestLocale }) => {
	let finalLocale = await requestLocale

	if (!finalLocale) {
		const headersList = await headers()
		const localeFromHeader = headersList.get('x-next-intl-locale')

		finalLocale = localeFromHeader || 'en'
	}

	const validLocale =
		finalLocale && ['en', 'es'].includes(finalLocale) ? finalLocale : 'en'

	return {
		locale: validLocale,
		messages: (await import(`../../messages/${validLocale}.json`)).default
	}
})
