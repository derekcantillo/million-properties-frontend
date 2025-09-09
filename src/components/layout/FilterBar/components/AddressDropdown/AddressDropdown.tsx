'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyVariant,
	TypographyFontFamily,
	TypographyTextColor
} from '@/components/ui/Typography/types/typography.types'
import { BaseDropdownProps } from '../../types'
import clsx from 'clsx'

export const AddressDropdown: React.FC<BaseDropdownProps> = ({
	isOpen,
	position
	// onClose
}) => {
	if (!isOpen) return null
	const suggestedAreas = [
		'All',
		'Fisher Island',
		'Bal Harbour',
		'Sunny Isles',
		'Miami Beach',
		'Coral Gables',
		'Key Biscayne',
		'Aventura',
		'South Beach',
		'Coconut Grove',
		'Brickell',
		'Doral',
		'Pinecrest',
		'Palmetto Bay',
		'Homestead',
		'Cutler Bay'
	]
	return (
		<div
			className="absolute z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg"
			style={{
				top: position.top,
				left: position.left + position.width / 2,
				transform: 'translateX(-50%)',
				minWidth: '400px',
				maxWidth: '90vw'
			}}
		>
			<div className="flex flex-col gap-4 p-4">
				<Typography
					variant={TypographyVariant.SMALL}
					className="font-medium"
					fontFamily={TypographyFontFamily.CAIRO}
				>
					Areas sugeridas
				</Typography>
				<div className="flex items-center justify-center gap-4 text-gray-500">
					<div className="flex flex-3/5 flex-wrap gap-2">
						{suggestedAreas.map(area => (
							<button
								type="button"
								key={area}
								className={clsx(
									'flex cursor-pointer items-center gap-2',
									'rounded-md border border-gray-200 p-2 hover:bg-gray-200',
									{
										'bg-black': area === 'All'
									}
								)}
							>
								<Typography
									variant={TypographyVariant.SMALL}
									className="font-medium"
									fontFamily={TypographyFontFamily.CAIRO}
									textColor={
										area === 'All'
											? TypographyTextColor.WHITE
											: TypographyTextColor.DEFAULT
									}
								>
									{area}
								</Typography>
							</button>
						))}
					</div>
					<div className="flex h-60 flex-2/5 items-center justify-center border">
						<Typography>Map area</Typography>
					</div>
				</div>
			</div>
		</div>
	)
}
