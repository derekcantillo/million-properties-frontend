'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useTheme, Theme } from '@/stores/useThemeStore'
import { ChevronRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Typography } from './Typography'
import {
	TypographyVariant,
	TypographyWeight,
	TypographyTextColor
} from './Typography/types/typography.types'
import { cn } from '@/lib/utils/cn'
import clsx from 'clsx'

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

export const SettingsDropdown = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const currentLocale = useLocale()
	const { theme, resolvedTheme, setTheme } = useTheme()

	const languageOptions: SubOption[] = [
		{ value: 'en', label: 'English', emoji: '🇺🇸' },
		{ value: 'es', label: 'Español', emoji: '🇪🇸' }
	]

	const themeOptions: SubOption[] = [
		{ value: 'light', label: 'Light', emoji: '☀️' },
		{ value: 'dark', label: 'Night', emoji: '🌙' },
		{ value: 'system', label: 'System', emoji: '💻' }
	]

	const getCurrentLanguageLabel = () => {
		const current = languageOptions.find(lang => lang.value === currentLocale)
		return current ? current.label : 'English'
	}

	const getCurrentThemeLabel = () => {
		const current = themeOptions.find(t => t.value === theme)
		return current ? current.label : 'System'
	}

	const settingsOptions: SettingsOption[] = [
		{
			id: 'language',
			label: 'Idioma',
			currentValue: getCurrentLanguageLabel(),
			emoji: '🌐'
		},
		{
			id: 'theme',
			label: 'Tema',
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

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					'flex h-10 w-10 cursor-pointer items-center justify-center',
					'rounded-lg border border-white/20 bg-white/10',
					'backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white/20'
				)}
				aria-label="Configuración"
			>
				<Cog6ToothIcon className="h-5 w-5 text-white" />
			</button>

			{isOpen && (
				<div
					className={cn(
						'absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border shadow-xl',
						resolvedTheme === 'dark'
							? 'border-gray-700 bg-gray-800'
							: 'border-gray-200 bg-white'
					)}
				>
					{activeSubmenu ? (
						<div className="py-2">
							<button
								onClick={handleBackClick}
								className={cn(
									'flex w-full cursor-pointer items-center space-x-3 px-4 py-3 transition-colors duration-200',
									resolvedTheme === 'dark'
										? 'hover:bg-gray-700'
										: 'hover:bg-gray-50'
								)}
							>
								<ChevronRightIcon
									className={cn(
										'h-4 w-4 rotate-180',
										resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
									)}
								/>
								<Typography
									variant={TypographyVariant.SPAN}
									weight={TypographyWeight.MEDIUM}
									textColor={TypographyTextColor.SECONDARY}
								>
									Atrás
								</Typography>
							</button>

							<div
								className={cn(
									'border-t pt-2',
									resolvedTheme === 'dark'
										? 'border-gray-700'
										: 'border-gray-200'
								)}
							>
								{activeSubmenu === 'language' &&
									languageOptions.map(option => (
										<button
											key={option.value}
											onClick={() =>
												handleSubOptionClick('language', option.value)
											}
											className={cn(
												'flex w-full items-center space-x-3 px-4 py-3 transition-colors duration-200',
												resolvedTheme === 'dark'
													? 'hover:bg-gray-700'
													: 'hover:bg-gray-50',
												currentLocale === option.value
													? resolvedTheme === 'dark'
														? 'bg-blue-900/20'
														: 'bg-blue-50'
													: '',
												'cursor-pointer'
											)}
										>
											<span className="text-lg">{option.emoji}</span>
											<Typography
												variant={TypographyVariant.SPAN}
												weight={TypographyWeight.NORMAL}
												textColor={
													currentLocale === option.value
														? TypographyTextColor.PRIMARY
														: TypographyTextColor.SECONDARY
												}
											>
												{option.label}
											</Typography>
											{currentLocale === option.value && (
												<div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
											)}
										</button>
									))}

								{activeSubmenu === 'theme' &&
									themeOptions.map(option => (
										<button
											key={option.value}
											onClick={() =>
												handleSubOptionClick('theme', option.value)
											}
											className={cn(
												'flex w-full cursor-pointer items-center space-x-3 px-4 py-3 transition-colors duration-200',
												resolvedTheme === 'dark'
													? 'hover:bg-gray-700'
													: 'hover:bg-gray-50',
												theme === option.value
													? resolvedTheme === 'dark'
														? 'bg-blue-900/20'
														: 'bg-blue-50'
													: ''
											)}
										>
											<span className="text-lg">{option.emoji}</span>
											<Typography
												variant={TypographyVariant.SPAN}
												weight={TypographyWeight.NORMAL}
												textColor={
													theme === option.value
														? TypographyTextColor.PRIMARY
														: TypographyTextColor.SECONDARY
												}
											>
												{option.label}
											</Typography>
											{theme === option.value && (
												<div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
											)}
										</button>
									))}
							</div>
						</div>
					) : (
						<div className="py-2">
							{settingsOptions.map(option => (
								<button
									key={option.id}
									onClick={() => handleOptionClick(option.id)}
									className={cn(
										'flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-200',
										resolvedTheme === 'dark'
											? 'hover:bg-gray-700'
											: 'hover:bg-gray-50'
									)}
								>
									<div className="flex items-center space-x-3">
										<span className="text-lg">{option.emoji}</span>
										<Typography
											variant={TypographyVariant.SPAN}
											weight={TypographyWeight.NORMAL}
											textColor={TypographyTextColor.PRIMARY}
										>
											{option.label}
										</Typography>
									</div>
									<div className="flex items-center space-x-2">
										<Typography
											variant={TypographyVariant.SMALL}
											weight={TypographyWeight.NORMAL}
											textColor={TypographyTextColor.MUTED}
										>
											{option.currentValue}
										</Typography>
										<ChevronRightIcon
											className={cn(
												'h-4 w-4',
												resolvedTheme === 'dark'
													? 'text-gray-500'
													: 'text-gray-400'
											)}
										/>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
