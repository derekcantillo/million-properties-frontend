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
import Link from 'next/link'

export const Header = () => {
	const links = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Properties',
			href: '#properties'
		},
		{
			label: 'New Property',
			href: '#new-property'
		}
	]
	return (
		<header className="relative z-60 py-6">
			<div className="container mx-auto flex items-center justify-between gap-8 px-4">
				<div className="flex w-1/5 items-center">
					<Typography
						variant={TypographyVariant.H4}
						fontFamily={TypographyFontFamily.CINZEL}
						weight={TypographyWeight.BOLD}
						className="transition-all duration-300 ease-in-out"
						textColor={TypographyTextColor.WHITE}
					>
						Million Properties
					</Typography>
				</div>
				<div className="flex w-1/5 items-center space-x-4">
					{links.map(link => (
						<Link href={link.href} key={link.label} className="cursor-pointer">
							<Typography
								key={link.label}
								variant={TypographyVariant.H4}
								fontFamily={TypographyFontFamily.CAIRO}
								weight={TypographyWeight.NORMAL}
								className="transition-all duration-300 ease-in-out"
								textColor={TypographyTextColor.WHITE}
							>
								{link.label}
							</Typography>
						</Link>
					))}
				</div>
				<div className="flex w-1/5 items-center justify-end">
					<SettingsDropdown />
				</div>
			</div>
		</header>
	)
}
