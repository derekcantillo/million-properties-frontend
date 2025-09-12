import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { themeScript } from '@/lib/theme-script'

type Props = {
	children: React.ReactNode
	params: Promise<{ lang: string }>
}

export function generateStaticParams() {
	return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function LocaleLayout({ children, params }: Props) {
	const { lang } = await params

	if (!['en', 'es'].includes(lang)) notFound()

	const messages = await getMessages()

	return (
		<html
			lang={lang}
			className="transition-colors duration-300"
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className="bg-background text-foreground min-h-screen antialiased"
				suppressHydrationWarning
			>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
