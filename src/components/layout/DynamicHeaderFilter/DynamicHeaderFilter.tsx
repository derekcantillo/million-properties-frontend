'use client'
import React from 'react'
import { FilterBar } from '@/components/layout'
import {
	Typography,
	TypographyFontFamily,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui/Typography'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { useHeaderAnimation } from './hooks'

export const DynamicHeaderFilter = () => {
	const {
		isCompact,
		isExpanded,
		headerRef,
		filterBarRef,
		logoRef,
		themeSwitcherRef,
		backdropRef,
		expandHeader,
		collapseHeader
	} = useHeaderAnimation()

	return (
		<>
			{/* Backdrop overlay - only show when expanded AND compact */}
			<div
				ref={backdropRef}
				className="pointer-events-none fixed inset-0 z-30 bg-black opacity-0"
				style={{ display: isExpanded && isCompact ? 'block' : 'none' }}
			/>

			<header
				ref={headerRef}
				className="fixed top-0 right-0 left-0 z-40 bg-gray-100 py-6"
			>
				<div className="container mx-auto flex items-center justify-between gap-8 px-4">
					<div ref={logoRef} className="flex w-1/5 items-center">
						<Typography
							variant={TypographyVariant.H4}
							fontFamily={TypographyFontFamily.CINZEL}
							weight={TypographyWeight.BOLD}
							className="transition-all duration-300 ease-in-out"
						>
							Million Properties
						</Typography>
					</div>

					<FilterBar
						ref={filterBarRef}
						isCompact={isCompact}
						isExpanded={isExpanded}
						onExpand={expandHeader}
						onCollapse={collapseHeader}
					/>

					<div
						ref={themeSwitcherRef}
						className="flex w-1/5 items-center justify-end"
					>
						<ThemeSwitcher />
					</div>
				</div>
			</header>
		</>
	)
}
