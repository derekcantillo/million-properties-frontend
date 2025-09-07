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
	buttonRef
}) => {
	return (
		<button
			ref={buttonRef}
			type="button"
			className={clsx(
				'flex flex-1 cursor-pointer flex-col',
				'p-4 transition-colors hover:bg-gray-100',
				{
					'bg-gray-100': isActive
				}
			)}
			onClick={onClick}
		>
			<Typography
				variant={TypographyVariant.SMALL}
				size={TypographySize.SM}
				className="text-muted-foreground font-medium"
				fontFamily={TypographyFontFamily.CINZEL}
			>
				{label}
			</Typography>
			<input
				type="text"
				placeholder={placeholder}
				className="font-cairo focus:ring-0 focus:ring-offset-0 focus:outline-none"
			/>
		</button>
	)
}
