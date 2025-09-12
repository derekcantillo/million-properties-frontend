'use client'

import React, { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'
import { formatPropertyPrice } from '@/lib/utils/format'
import {
	Typography,
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui'
import { BaseDropdownProps } from '../../types'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'

export const PriceDropdown: React.FC<BaseDropdownProps> = ({
	isOpen,
	position
	// onClose
}) => {
	const t = useTranslations()
	const priceRange: [number, number] = [0, 5000000]
	const form = useFormContext<{ minPrice?: number; maxPrice?: number }>()
	const [value, setValue] = useState<number[]>([priceRange[0], priceRange[1]])

	const handleChange = (value: number[]) => {
		setValue(value)
		form.setValue('minPrice', value[0])
		form.setValue('maxPrice', value[1])
	}

	useEffect(() => {
		const min = form.getValues('minPrice')
		const max = form.getValues('maxPrice')
		if (typeof min === 'number' && typeof max === 'number') {
			setValue([min, max])
		}
	}, [])

	if (!isOpen) return null

	return (
		<div
			className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg"
			style={{
				top: position.top,
				left: position.left,
				minWidth: position.width,
				maxWidth: '100%'
			}}
		>
			<div className="flex flex-col gap-4 p-4">
				<Typography
					variant={TypographyVariant.SMALL}
					className="font-medium"
					fontFamily={TypographyFontFamily.CAIRO}
				>
					{t('filterBar.searchByPriceRange')}
				</Typography>
				<div className="flex h-full w-full flex-col items-start justify-center gap-4">
					<div className="w-full px-2">
						<ReactSlider
							className="horizontal-slider"
							thumbClassName="slider-thumb"
							trackClassName="slider-track"
							min={priceRange[0]}
							max={priceRange[1]}
							step={100}
							value={value}
							onChange={handleChange}
							pearling
							minDistance={100}
						/>
					</div>
					<div className="flex w-full justify-between text-gray-600">
						<Typography
							variant={TypographyVariant.SPAN}
							fontFamily={TypographyFontFamily.CAIRO}
						>
							{formatPropertyPrice(value[0] ?? priceRange[0])}
						</Typography>
						<Typography
							variant={TypographyVariant.SPAN}
							fontFamily={TypographyFontFamily.CAIRO}
						>
							{formatPropertyPrice(value[1] ?? priceRange[1])}
						</Typography>
					</div>
				</div>
			</div>
		</div>
	)
}
