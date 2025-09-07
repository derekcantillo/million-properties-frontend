'use client'

import React from 'react'
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
			<div className="p-4">
				<div className="space-y-3">
					<Typography
						variant={TypographyVariant.SMALL}
						className="font-medium"
						fontFamily={TypographyFontFamily.CINZEL}
					>
						Buscar por rango de precios
					</Typography>
					<div className="flex min-h-[120px] items-center justify-center text-gray-500">
						Contenido del filtro de precios
					</div>
				</div>
			</div>
		</div>
	)
}
