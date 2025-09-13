import {
	ImageCarousel,
	Typography,
	TypographyFontFamily,
	TypographyLineClamp,
	TypographySize,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui'
import { formatCurrency, slugify } from '@/lib/utils/format'
import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import { PropertyItemProps } from '@/components/layout'

export const PropertyItem: React.FC<PropertyItemProps> = ({
	property,
	className,
	columnsPerRow = 3,
	isDesktop = false,
	listDensity = 'comfortable'
}) => {
	const shouldStackHeader = !isDesktop || columnsPerRow >= 4
	const paddingClass = listDensity === 'compact' ? 'p-4' : 'p-6'
	const titleSize =
		!isDesktop && listDensity === 'compact'
			? TypographySize.LG
			: TypographySize.XL
	const priceSize =
		!isDesktop && listDensity === 'compact'
			? TypographySize.XL
			: TypographySize.XL2

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
			<div className={clsx('space-y-3', paddingClass)}>
				<div
					className={clsx(
						'flex items-center justify-between',
						shouldStackHeader && 'flex-col items-start gap-1'
					)}
				>
					<Typography
						variant={TypographyVariant.H3}
						fontFamily={TypographyFontFamily.CINZEL}
						lineClamp={TypographyLineClamp.TWO}
						size={titleSize}
					>
						{property.name}
					</Typography>
					<Typography
						variant={TypographyVariant.SMALL}
						fontFamily={TypographyFontFamily.CAIRO}
						size={priceSize}
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
