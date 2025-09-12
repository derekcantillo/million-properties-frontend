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
import { useFormContext } from 'react-hook-form'

export const FilterButton: React.FC<FilterButtonProps> = ({
	label,
	placeholder,
	isActive,
	onClick,
	buttonRef,
	someTabSelected,
	compactMode
}) => {
	const form = useFormContext<{
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}>()

	const fieldName = React.useMemo(() => {
		if (label.toLowerCase().includes('nombre')) return 'name'
		if (label.toLowerCase().includes('dirección')) return 'address'
		if (label.toLowerCase().includes('precio')) return 'minPrice' // text shows range; slider controls actual range
		return undefined
	}, [label])

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
					className="font-cairo transition-all duration-300 ease-in-out focus:ring-0 focus:ring-offset-0 focus:outline-none"
					{...(fieldName ? form.register(fieldName as 'name' | 'address') : {})}
					autoComplete="off"
				/>
			)}
		</button>
	)
}
