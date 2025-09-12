import {
	Typography,
	TypographyFontFamily,
	TypographyLineClamp,
	TypographySize,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui/Typography'
import { ImageCarousel } from '@/components/ui/ImageCarousel'
import { PropertyItemProps } from '@/types/property.types'
import { formatCurrency, slugify } from '@/lib/utils/format'
import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'

export const PropertyItem: React.FC<PropertyItemProps> = ({
	property,
	className
}) => {
	return (
		<Link
			href={`/property/${slugify(property.name)}`}
			className={clsx(
				'rounded-md border border-gray-200',
				'cursor-pointer overflow-hidden',
				'transition-transform',
				'bg-white hover:bg-gray-100',
				className
			)}
		>
			<div className="relative">
				<ImageCarousel images={property.images} alt={property.name} />
			</div>
			<div className="space-y-3 p-6">
				<div className="flex items-center justify-between">
					<Typography
						variant={TypographyVariant.H3}
						fontFamily={TypographyFontFamily.CINZEL}
						lineClamp={TypographyLineClamp.TWO}
						size={TypographySize.XL}
					>
						{property.name}
					</Typography>
					<Typography
						variant={TypographyVariant.SMALL}
						fontFamily={TypographyFontFamily.CAIRO}
						size={TypographySize.XL2}
						weight={TypographyWeight.SEMI_BOLD}
					>
						{formatCurrency(property.priceProperty)}
					</Typography>
				</div>
				<Typography
					variant={TypographyVariant.SMALL}
					fontFamily={TypographyFontFamily.CAIRO}
					className="line-clamp-2 text-sm text-gray-600"
				>
					{property.addressProperty}
				</Typography>
			</div>
		</Link>
	)
}
