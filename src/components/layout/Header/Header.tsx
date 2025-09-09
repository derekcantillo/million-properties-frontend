'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyFontFamily,
	TypographyWeight,
	TypographyVariant,
	TypographyTextColor
} from '@/components/ui/Typography/types/typography.types'
import { SettingsDropdown } from '@/components/ui/SettingsDropdown'
import clsx from 'clsx'

interface HeaderProps {
	isDark?: boolean
}

export const Header = ({ isDark = false }: HeaderProps) => {
	const textColor = isDark
		? TypographyTextColor.DEFAULT
		: TypographyTextColor.WHITE

	return (
		<header
			className={clsx(
				'relative z-60',
				'transition-all duration-300 ease-in-out',
				{
					'py-6': !isDark,
					'border-b border-gray-200 py-4': isDark
				}
			)}
		>
			<div
				className={clsx('container mx-auto flex items-center gap-8 px-4', {
					'justify-between': !isDark,
					'justify-center': isDark
				})}
			>
				<div
					className={clsx('flex items-center', {
						'justify-self-center': isDark
					})}
				>
					<Typography
						variant={TypographyVariant.H4}
						fontFamily={TypographyFontFamily.CINZEL}
						weight={TypographyWeight.BOLD}
						className="transition-all duration-300 ease-in-out"
						textColor={textColor}
					>
						Million Properties
					</Typography>
				</div>

				{!isDark && (
					<div className="flex items-center justify-end">
						<SettingsDropdown />
					</div>
				)}
			</div>
		</header>
	)
}
