import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware({
	// A list of all locales that are supported
	locales: ['en', 'es'],

	// Used when no locale matches
	defaultLocale: 'en'
})

export default function middleware(request: NextRequest) {
	const response = handleI18nRouting(request)

	return response
}

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
