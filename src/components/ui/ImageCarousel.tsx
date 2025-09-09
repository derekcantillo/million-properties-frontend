'use client'

import { PropertyImage } from '@/types/property.types'
import {
	LinkSlashIcon,
	ChevronLeftIcon,
	ChevronRightIcon
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'

interface ImageCarouselProps {
	images: PropertyImage[]
	alt: string
	className?: string
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
	images,
	alt,
	className
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

	const enabledImages = images.filter(img => img.enabled)

	// Show empty state only if no images are available
	if (enabledImages.length === 0) {
		return (
			<div
				className={clsx(
					'flex h-96 w-full flex-col items-center justify-center bg-gray-100',
					className
				)}
			>
				<div className="mb-4 rounded-full bg-gray-200 p-6">
					<div className="relative">
						<LinkSlashIcon className="h-12 w-12 text-gray-400" />
					</div>
				</div>
				<span className="text-sm font-medium text-gray-500">
					Sin imágenes disponibles
				</span>
				<span className="mt-1 text-xs text-gray-400">
					No se encontraron imágenes para esta propiedad
				</span>
			</div>
		)
	}

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

	const nextImage = () => {
		setCurrentIndex(prev => (prev + 1) % enabledImages.length)
	}

	const prevImage = () => {
		setCurrentIndex(
			prev => (prev - 1 + enabledImages.length) % enabledImages.length
		)
	}

	const goToImage = (index: number) => {
		setCurrentIndex(index)
	}

	const currentImage = enabledImages[currentIndex]
	const currentImageHasError =
		currentImage && imageErrors.has(currentImage.idPropertyImage)

	return (
		<div className={clsx('group relative', className)}>
			<div className="relative h-96 w-full overflow-hidden rounded-t-lg">
				{currentImageHasError ? (
					// Show error state for this specific image
					<div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
						<div className="mb-2 rounded-full bg-gray-200 p-4">
							<LinkSlashIcon className="h-8 w-8 text-gray-400" />
						</div>
						<span className="text-xs text-gray-500">
							Error al cargar imagen
						</span>
					</div>
				) : (
					<Image
						src={currentImage?.file || ''}
						alt={alt}
						fill
						className="object-cover transition-opacity duration-300"
						onError={() =>
							currentImage && handleImageError(currentImage.idPropertyImage)
						}
						onLoad={() =>
							currentImage && handleImageLoad(currentImage.idPropertyImage)
						}
					/>
				)}

				{enabledImages.length > 1 && (
					<>
						<button
							onClick={prevImage}
							className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/70"
							aria-label="Previous image"
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</button>
						<button
							onClick={nextImage}
							className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/70"
							aria-label="Next image"
						>
							<ChevronRightIcon className="h-4 w-4" />
						</button>
					</>
				)}
			</div>

			{enabledImages.length > 1 && (
				<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
					{enabledImages.map((image, index) => {
						const hasError = imageErrors.has(image.idPropertyImage)
						return (
							<button
								key={image.idPropertyImage}
								onClick={() => goToImage(index)}
								className={clsx(
									'h-2 w-2 rounded-full transition-all duration-200',
									index === currentIndex
										? hasError
											? 'bg-red-400'
											: 'bg-white'
										: hasError
											? 'bg-red-400/50 hover:bg-red-400/75'
											: 'bg-white/50 hover:bg-white/75'
								)}
								aria-label={`Go to image ${index + 1}${hasError ? ' (error)' : ''}`}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
