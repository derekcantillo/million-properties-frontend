'use client'

import React from 'react'
import {
	Typography,
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui'
import { BaseDropdownProps } from '../../types'
import Image from 'next/image'
import { usePropertiesStore } from '@/stores/usePropertiesStore'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const PropertyDropdown: React.FC<BaseDropdownProps> = ({
	isOpen,
	position
	// onClose
}) => {
	const t = useTranslations()
	const properties = usePropertiesStore(s => s.properties)
	const router = useRouter()
	const suggestedProperties = React.useMemo(
		() => properties.slice(0, 5),
		[properties]
	)
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
				<div className="flex flex-col gap-3">
					<Typography
						variant={TypographyVariant.SMALL}
						className="font-medium"
						fontFamily={TypographyFontFamily.CAIRO}
					>
						{t('filterBar.suggestedProperties')}
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
								onClick={() => {
									const slug = property.name.toLowerCase().replace(/ /g, '-')
									router.push(`/property/${slug}`)
								}}
							>
								<Image
									src={property.images?.[0]?.file ?? '/file.svg'}
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
