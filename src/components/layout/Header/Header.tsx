'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyFontFamily,
	TypographyWeight,
	TypographyVariant
} from '@/components/ui/Typography/types/typography.types'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'

export const Header = () => {
	return (
		<header className="relative z-60 bg-gray-100 py-6">
			<div className="container mx-auto flex items-center justify-between gap-8 px-4">
				<div className="flex w-1/5 items-center">
					<Typography
						variant={TypographyVariant.H4}
						fontFamily={TypographyFontFamily.CINZEL}
						weight={TypographyWeight.BOLD}
						className="transition-all duration-300 ease-in-out"
					>
						Million Properties
					</Typography>
				</div>

				<div className="flex w-1/5 items-center justify-end">
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	)
}
