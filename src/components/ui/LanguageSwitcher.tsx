'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button } from './Button'

const locales = [
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' }
]

export function LanguageSwitcher() {
	const t = useTranslations('HomePage')
	const currentLocale = useLocale()

	const handleLanguageChange = (newLocale: string) => {
		if (newLocale === currentLocale) return

		// Simple redirect to the new locale
		window.location.href = `/${newLocale}`
	}

	return (
		<div className="flex flex-col items-center space-y-4">
			<h3 className="text-lg font-semibold text-gray-700">
				{t('languageSwitcher')}
			</h3>
			<div className="flex space-x-3">
				{locales.map(lang => (
					<Button
						key={lang.code}
						onClick={() => handleLanguageChange(lang.code)}
						variant={currentLocale === lang.code ? 'default' : 'outline'}
						className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
							currentLocale === lang.code
								? 'ring-2 ring-blue-500 ring-offset-2'
								: 'hover:scale-105'
						}`}
					>
						<span className="text-lg">{lang.flag}</span>
						<span className="font-medium">{lang.name}</span>
					</Button>
				))}
			</div>
			<p className="text-sm text-gray-500">
				{t('currentLanguage', { lang: currentLocale.toUpperCase() })}
			</p>
		</div>
	)
}
