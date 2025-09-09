'use client'

import { useThemeStore } from '@/stores/useThemeStore'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export const ThemeSwitcher = () => {
	const theme = useThemeStore(state => state.theme)
	const setTheme = useThemeStore(state => state.setTheme)

	const handleToggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<button
			onClick={handleToggleTheme}
			className={clsx(
				'relative h-8 w-16 cursor-pointer rounded-sm',
				'transition-colors duration-300 ease-in-out',
				{
					'bg-gray-700': theme === 'dark',
					'bg-yellow-400': theme === 'light'
				}
			)}
			aria-label={
				theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
			}
		>
			<div
				className={clsx(
					'absolute top-1 flex h-6 w-6',
					'items-center justify-center rounded-sm',
					'transition-all duration-300 ease-in-out',
					'cursor-pointer',
					{
						'left-9 bg-gray-200': theme === 'dark',
						'left-1 bg-white': theme === 'light'
					}
				)}
			>
				{theme === 'dark' ? (
					<MoonIcon className="h-4 w-4 text-gray-700" />
				) : (
					<SunIcon className="h-4 w-4 text-yellow-500" />
				)}
			</div>
		</button>
	)
}
