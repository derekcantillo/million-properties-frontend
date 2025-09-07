'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import {
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui/Typography/types/typography.types'
import { BaseDropdownProps } from '../../types'
import Image from 'next/image'
import clsx from 'clsx'

export const PropertyDropdown: React.FC<BaseDropdownProps> = ({
	isOpen,
	position
	// onClose
}) => {
	if (!isOpen) return null
	const suggestedProperties = [
		{
			id: 1,
			name: 'Propiedad 1',
			price: 100000,
			image:
				'https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/419277547_1.jpg&width=1170'
		},
		{
			id: 2,
			name: 'Propiedad 2',
			price: 200000,
			image:
				'https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/407228689_1.jpg&width=1170'
		},
		{
			id: 3,
			name: 'Propiedad 3',
			price: 300000,
			image:
				'https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/406021357_1.jpg&width=1170'
		},
		{
			id: 4,
			name: 'Propiedad 4',
			price: 400000,
			image:
				'https://cdn.millionluxury.com/image-resizing?image=https://azfd-prod.millionluxury.com/mls/389726469_1.jpg&width=1170'
		}
	]
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
				<div className="flex flex-col gap-3">
					<Typography
						variant={TypographyVariant.SMALL}
						className="font-medium"
						fontFamily={TypographyFontFamily.CAIRO}
					>
						Propiedades sugeridas
					</Typography>
					<div className="flex max-h-60 flex-col gap-2 overflow-y-auto text-gray-500">
						{suggestedProperties.map(property => (
							<button
								type="button"
								key={property.id}
								className={clsx(
									'flex cursor-pointer items-center gap-2',
									'p-2 hover:bg-gray-100'
								)}
							>
								<Image
									src={property.image}
									alt={property.name}
									width={100}
									height={100}
									className="h-10 w-14 rounded-md object-cover"
								/>
								<Typography
									variant={TypographyVariant.SMALL}
									className="font-medium"
									fontFamily={TypographyFontFamily.CAIRO}
								>
									{property.name}
								</Typography>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
