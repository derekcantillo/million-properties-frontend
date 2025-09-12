'use client'

import { PropertyImage } from '@/types/property.types'
import { PhotoIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'
import {
	Button,
	Typography,
	TypographyWeight,
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui'
import { useTranslations } from 'next-intl'

interface ImageCollageProps {
	images: PropertyImage[]
	propertyName: string
	onImageClick?: (index: number) => void
	onViewAllClick?: () => void
	className?: string
}

export const ImageCollage: React.FC<ImageCollageProps> = ({
	images,
	propertyName,
	onImageClick,
	onViewAllClick,
	className
}) => {
	const t = useTranslations()
	const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

	const enabledImages = images.filter(img => img.enabled)
	const displayImages = enabledImages.slice(0, 3) // Maximum 3 images

	const handleImageError = (imageId: string) => {
		setImageErrors(prev => new Set(prev).add(imageId))
	}

	const handleImageLoad = (imageId: string) => {
		setImageErrors(prev => {
			const newSet = new Set(prev)
			newSet.delete(imageId)
			return newSet
		})
	}

	const renderImagePlaceholder = (className: string) => (
		<div
			className={clsx(
				'flex items-center justify-center bg-gray-100',
				className
			)}
		>
			<PhotoIcon className="h-12 w-12 text-gray-400" />
		</div>
	)

	const renderImage = (
		image: PropertyImage,
		index: number,
		imageClassName: string
	) => {
		const hasError = imageErrors.has(image.idPropertyImage)

		if (hasError) {
			return renderImagePlaceholder(imageClassName)
		}

		return (
			<Image
				src={image.file}
				alt={`${propertyName} - Image ${index + 1}`}
				fill
				className="object-cover transition-transform duration-300 hover:scale-105"
				onError={() => handleImageError(image.idPropertyImage)}
				onLoad={() => handleImageLoad(image.idPropertyImage)}
			/>
		)
	}

	const getLayout = () => {
		if (displayImages.length === 0) {
			return (
				<div className="relative h-96 w-full md:h-[500px]">
					{renderImagePlaceholder('h-full w-full rounded-lg')}
				</div>
			)
		}

		if (displayImages.length === 1) {
			return (
				<div className="relative h-96 w-full md:h-[500px]">
					<button
						type="button"
						className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
						onClick={() => onImageClick?.(0)}
						onKeyDown={e => e.key === 'Enter' && onImageClick?.(0)}
					>
						{displayImages[0] &&
							renderImage(displayImages[0], 0, 'h-full w-full rounded-lg')}
					</button>
				</div>
			)
		}

		if (displayImages.length === 2) {
			return (
				<div className="grid h-96 gap-2 md:h-[500px] lg:grid-cols-2">
					{displayImages.map((image, index) => (
						<button
							key={image.idPropertyImage}
							type="button"
							className="relative cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
							onClick={() => onImageClick?.(index)}
							onKeyDown={e => e.key === 'Enter' && onImageClick?.(index)}
						>
							{renderImage(image, index, 'h-full w-full rounded-lg')}
						</button>
					))}
				</div>
			)
		}

		return (
			<div className="grid h-96 gap-2 md:h-[500px] lg:grid-cols-4 lg:grid-rows-2">
				<button
					type="button"
					className="relative cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none lg:col-span-2 lg:row-span-2"
					onClick={() => onImageClick?.(0)}
					onKeyDown={e => e.key === 'Enter' && onImageClick?.(0)}
				>
					{displayImages[0] &&
						renderImage(displayImages[0], 0, 'h-full w-full rounded-lg')}
				</button>

				{displayImages[1] && (
					<button
						type="button"
						className="relative hidden cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none lg:col-span-2 lg:block"
						onClick={() => onImageClick?.(1)}
						onKeyDown={e => e.key === 'Enter' && onImageClick?.(1)}
					>
						{renderImage(displayImages[1], 1, 'h-full w-full rounded-lg')}
					</button>
				)}

				{displayImages[2] && (
					<button
						type="button"
						className="relative hidden cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none lg:col-span-2 lg:block"
						onClick={() => onImageClick?.(2)}
						onKeyDown={e => e.key === 'Enter' && onImageClick?.(2)}
					>
						{renderImage(displayImages[2], 2, 'h-full w-full rounded-lg')}
					</button>
				)}
			</div>
		)
	}

	return (
		<div className={clsx('relative space-y-4', className)}>
			{getLayout()}

			{enabledImages.length > 0 && (
				<div className="absolute right-5 bottom-5 z-10 flex justify-end">
					<Button
						size="sm"
						onClick={onViewAllClick}
						className="gap-2 border border-gray-200 bg-gray-100/80 hover:bg-gray-200"
					>
						<PhotoIcon className="h-4 w-4" />
						<Typography
							fontFamily={TypographyFontFamily.CAIRO}
							variant={TypographyVariant.SMALL}
							weight={TypographyWeight.SEMI_BOLD}
						>
							{t('imageCollage.viewAllImages')} ({enabledImages.length})
						</Typography>
					</Button>
				</div>
			)}
		</div>
	)
}
