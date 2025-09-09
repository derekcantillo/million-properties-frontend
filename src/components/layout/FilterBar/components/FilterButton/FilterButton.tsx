'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyVariant,
	TypographySize,
	TypographyFontFamily
} from '@/components/ui/Typography/types/typography.types'
import { FilterButtonProps } from '@/components/layout'
import clsx from 'clsx'

export const FilterButton: React.FC<FilterButtonProps> = ({
	label,
	placeholder,
	isActive,
	onClick,
	buttonRef,
	someTabSelected,
	compactMode
}) => {
	return (
		<button
			ref={buttonRef}
			type="button"
			className={clsx(
				'flex flex-1 cursor-pointer flex-col p-4',
				'bg-white transition-all duration-300 ease-in-out',
				{
					'bg-gray-100 hover:bg-gray-100': !isActive && !someTabSelected,
					'z-40 shadow-2xl': isActive && someTabSelected
				}
			)}
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
				onClick()
			}}
		>
			<Typography
				variant={TypographyVariant.H4}
				size={TypographySize.LG}
				className={clsx(
					'text-muted-foreground font-medium transition-all duration-300'
				)}
				fontFamily={TypographyFontFamily.CAIRO}
			>
				{label}
			</Typography>
			{!compactMode && (
				<input
					type="text"
					placeholder={placeholder}
					className="font-cairo pointer-events-none transition-all duration-300 ease-in-out focus:ring-0 focus:ring-offset-0 focus:outline-none"
					readOnly
					onClick={e => {
						e.preventDefault()
						e.stopPropagation()
					}}
				/>
			)}
		</button>
	)
}
