'use client'

import React from 'react'
import {
	Typography,
	TypographyFontFamily,
	TypographyWeight,
	TypographyVariant,
	TypographyTextColor,
	SettingsDropdown
} from '@/components/ui'
import { HeaderProps } from '@/components/layout'
import clsx from 'clsx'
import Link from 'next/link'

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
					'border-b border-gray-200 bg-white py-4': isDark
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
					<Link href="/">
						<Typography
							variant={TypographyVariant.H4}
							fontFamily={TypographyFontFamily.CINZEL}
							weight={TypographyWeight.BOLD}
							className="transition-all duration-300 ease-in-out"
							textColor={textColor}
						>
							Million Properties
						</Typography>
					</Link>
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
