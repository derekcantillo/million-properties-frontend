'use client'

import React, { useState } from 'react'
import ReactSlider from 'react-slider'
import { formatPropertyPrice } from '@/lib/utils/format'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui/Typography/types/typography.types'
import { BaseDropdownProps } from '../../types'

export const PriceDropdown: React.FC<BaseDropdownProps> = ({
	isOpen,
	position
	// onClose
}) => {
	const priceRange: [number, number] = [1000000, 300000000]
	const [value, setValue] = useState<number[]>([1000000, 300000000])

	const handleChange = (value: number[]) => {
		setValue(value)
	}

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
					Buscar por rango de precios
				</Typography>
				<div className="flex h-full w-full flex-col items-start justify-center gap-4">
					<div className="w-full px-2">
						<ReactSlider
							className="horizontal-slider"
							thumbClassName="slider-thumb"
							trackClassName="slider-track"
							min={priceRange[0]}
							max={priceRange[1]}
							step={100000}
							value={value}
							onChange={handleChange}
							pearling
							minDistance={5000000}
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
