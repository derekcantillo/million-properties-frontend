'use client'

import React, { useState, useEffect } from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyFontFamily,
	TypographyWeight,
	TypographyVariant
} from '@/components/ui/Typography/types/typography.types'

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			setIsScrolled(scrollTop > 0)
		}

		// Agregar el event listener
		window.addEventListener('scroll', handleScroll)

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header className="border-border/50 z-50 transition-all duration-300">
			<div className="container mx-auto flex items-center justify-between px-4">
				{/* Logo del lado izquierdo */}
				<div className="flex items-center">
					<Typography
						variant={TypographyVariant.H4}
						fontFamily={TypographyFontFamily.CINZEL}
						weight={TypographyWeight.BOLD}
						className="transition-all duration-300 ease-in-out"
					>
						{isScrolled ? 'MP' : 'Million Properties'}
					</Typography>
				</div>

				{/* Espacio para elementos del lado derecho */}
				<div className="flex items-center space-x-4">
					{/* Aquí irán los elementos del lado derecho */}
				</div>
			</div>
		</header>
	)
}
