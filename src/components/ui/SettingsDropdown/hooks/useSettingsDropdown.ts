import { useState, useRef, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme, Theme } from '@/stores/useThemeStore'

interface SettingsOption {
	id: string
	label: string
	currentValue: string
	emoji: string
}

interface SubOption {
	value: string
	label: string
	emoji: string
}

export const useSettingsDropdown = () => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const currentLocale = useLocale()
	const { theme, resolvedTheme, setTheme } = useTheme()

	const languageOptions: SubOption[] = [
		{ value: 'en', label: t('common.english'), emoji: '🇺🇸' },
		{ value: 'es', label: t('common.spanish'), emoji: '🇪🇸' }
	]

	const themeOptions: SubOption[] = [
		{ value: 'light', label: t('common.light'), emoji: '☀️' },
		{ value: 'dark', label: t('common.night'), emoji: '🌙' },
		{ value: 'system', label: t('common.system'), emoji: '💻' }
	]

	const getCurrentLanguageLabel = () => {
		const current = languageOptions.find(lang => lang.value === currentLocale)
		return current ? current.label : t('common.english')
	}

	const getCurrentThemeLabel = () => {
		const current = themeOptions.find(t => t.value === theme)
		return current ? current.label : t('common.system')
	}

	const settingsOptions: SettingsOption[] = [
		{
			id: 'language',
			label: t('common.language'),
			currentValue: getCurrentLanguageLabel(),
			emoji: '🌐'
		},
		{
			id: 'theme',
			label: t('common.theme'),
			currentValue: getCurrentThemeLabel(),
			emoji: '🎨'
		}
	]

	const handleLanguageChange = (newLocale: string) => {
		if (newLocale === currentLocale) return
		window.location.href = `/${newLocale}`
	}

	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme as Theme)
		setActiveSubmenu(null)
		setIsOpen(false)
	}

	const handleOptionClick = (optionId: string) => {
		setActiveSubmenu(activeSubmenu === optionId ? null : optionId)
	}

	const handleSubOptionClick = (optionId: string, value: string) => {
		if (optionId === 'language') {
			handleLanguageChange(value)
		} else if (optionId === 'theme') {
			handleThemeChange(value)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setActiveSubmenu(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleBackClick = () => {
		setActiveSubmenu(null)
	}

	const handleOpen = () => {
		setIsOpen(open => !open)
	}

	const getSubMenuOptions = (optionId: string) => {
		if (optionId === 'language') {
			return languageOptions
		}
		return themeOptions
	}

	const getSubmenuValueActive = (optionId: string) => {
		if (optionId === 'language') {
			return currentLocale
		}
		return theme
	}

	return {
		isOpen,
		activeSubmenu,
		dropdownRef,
		settingsOptions,
		handleOptionClick,
		handleSubOptionClick,
		handleBackClick,
		resolvedTheme,
		handleOpen,
		currentLocale,
		themeOptions,
		theme,
		languageOptions,
		getSubMenuOptions,
		getSubmenuValueActive
	}
}
