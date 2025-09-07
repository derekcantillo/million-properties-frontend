import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware({
	// A list of all locales that are supported
	locales: ['en', 'es'],

	// Used when no locale matches
	defaultLocale: 'en'
})

export default function middleware(request: NextRequest) {
	console.log('🚀 Middleware - pathname:', request.nextUrl.pathname)
	console.log(
		'🚀 Middleware - locale cookie:',
		request.cookies.get('NEXT_LOCALE')?.value
	)

	const response = handleI18nRouting(request)

	console.log('🚀 Middleware - response status:', response?.status)
	console.log(
		'🚀 Middleware - response headers:',
		Object.fromEntries(response?.headers.entries() || [])
	)

	return response
}

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
