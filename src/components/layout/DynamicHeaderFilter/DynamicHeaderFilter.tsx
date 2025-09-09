'use client'
import React, { useState } from 'react'

import { FilterBar, Header } from '@/components/layout'
import {
	Typography,
	TypographyFontFamily,
	TypographyTextColor,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui'

export const DynamicHeaderFilter = () => {
	const [showBackdrop, setShowBackdrop] = useState(false)

	return (
		<>
			<div className="relative h-96 border">
				<Header />
				<div className="absolute inset-0 h-full w-full">
					<div className="absolute inset-0 bg-black/50" />
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<Typography
							variant={TypographyVariant.H2}
							fontFamily={TypographyFontFamily.CINZEL}
							weight={TypographyWeight.NORMAL}
							className="transition-all duration-300 ease-in-out"
							textColor={TypographyTextColor.WHITE}
						>
							#1 TEAM IN THE US
						</Typography>
						<Typography
							variant={TypographyVariant.H3}
							fontFamily={TypographyFontFamily.CINZEL}
							weight={TypographyWeight.NORMAL}
							className="transition-all duration-300 ease-in-out"
							textColor={TypographyTextColor.WHITE}
						>
							More Than $2.1 Billion
						</Typography>
					</div>
					<video
						src="assets/videos/hero.mp4"
						autoPlay
						muted
						loop
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
			<FilterBar
				onCollapse={() => setShowBackdrop(false)}
				onExpand={() => setShowBackdrop(true)}
			/>{' '}
			{showBackdrop && (
				<button
					type="button"
					className="fixed inset-0 z-30 bg-black/50"
					onClick={() => setShowBackdrop(false)}
					onKeyDown={e => {
						if (e.key === 'Escape') {
							setShowBackdrop(false)
						}
					}}
					aria-label="Cerrar dropdown"
				/>
			)}
		</>
	)
}
