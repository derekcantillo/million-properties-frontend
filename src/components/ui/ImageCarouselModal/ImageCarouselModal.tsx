'use client'

import { PropertyImage } from '@/api'
import {
	XMarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	PhotoIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui'

interface ImageCarouselModalProps {
	images: PropertyImage[]
	propertyName: string
	isOpen: boolean
	initialIndex?: number
	onClose: () => void
}

export const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
	images,
	propertyName,
	isOpen,
	initialIndex = 0,
	onClose
}) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex)
	const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

	const enabledImages = images.filter(img => img.enabled)

	useEffect(() => {
		setCurrentIndex(initialIndex)
	}, [initialIndex])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isOpen) return

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault()
					goToPrevious()
					break
				case 'ArrowRight':
					event.preventDefault()
					goToNext()
					break
				case 'Escape':
					event.preventDefault()
					onClose()
					break
			}
		},
		[isOpen, onClose]
	)

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, handleKeyDown])

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

	const goToNext = () => {
		setCurrentIndex(prev => (prev + 1) % enabledImages.length)
	}

	const goToPrevious = () => {
		setCurrentIndex(
			prev => (prev - 1 + enabledImages.length) % enabledImages.length
		)
	}

	const goToImage = (index: number) => {
		setCurrentIndex(index)
	}

	if (!isOpen || enabledImages.length === 0) return null

	const currentImage = enabledImages[currentIndex]
	const hasError = currentImage && imageErrors.has(currentImage.idPropertyImage)

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
			<Button
				variant="ghost"
				size="icon"
				onClick={onClose}
				className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
			>
				<XMarkIcon className="h-6 w-6" />
			</Button>

			{enabledImages.length > 1 && (
				<>
					<Button
						variant="ghost"
						size="icon"
						onClick={goToPrevious}
						className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white hover:bg-white/20"
					>
						<ChevronLeftIcon className="h-8 w-8" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={goToNext}
						className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white hover:bg-white/20"
					>
						<ChevronRightIcon className="h-8 w-8" />
					</Button>
				</>
			)}

			<div className="relative flex h-full max-h-[90vh] w-full max-w-[90vw] items-center justify-center">
				{hasError || !currentImage ? (
					<div className="flex h-96 w-96 flex-col items-center justify-center rounded-lg bg-gray-800 text-white">
						<PhotoIcon className="h-16 w-16 text-gray-400" />
						<p className="mt-2 text-sm text-gray-400">Error al cargar imagen</p>
					</div>
				) : (
					<div className="relative h-full w-full">
						<Image
							src={currentImage.file}
							alt={`${propertyName} - Image ${currentIndex + 1}`}
							fill
							className="object-contain"
							onError={() => handleImageError(currentImage.idPropertyImage)}
							onLoad={() => handleImageLoad(currentImage.idPropertyImage)}
						/>
					</div>
				)}
			</div>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
				<div className="flex flex-col items-center gap-4">
					<div className="rounded-full bg-black/50 px-3 py-1 text-sm text-white">
						{currentIndex + 1} / {enabledImages.length}
					</div>

					{enabledImages.length > 1 && enabledImages.length <= 10 && (
						<div className="flex gap-2">
							{enabledImages.map((image, index) => {
								const thumbHasError = imageErrors.has(image.idPropertyImage)
								return (
									<button
										key={image.idPropertyImage}
										onClick={() => goToImage(index)}
										className={clsx(
											'relative h-12 w-12 overflow-hidden rounded border-2 transition-all',
											index === currentIndex
												? 'border-white'
												: 'border-transparent hover:border-white/50'
										)}
									>
										{thumbHasError ? (
											<div className="flex h-full w-full items-center justify-center bg-gray-800">
												<PhotoIcon className="h-4 w-4 text-gray-400" />
											</div>
										) : (
											<Image
												src={image.file}
												alt={`Thumbnail ${index + 1}`}
												fill
												className="object-cover"
												onError={() => handleImageError(image.idPropertyImage)}
												onLoad={() => handleImageLoad(image.idPropertyImage)}
											/>
										)}
									</button>
								)
							})}
						</div>
					)}
				</div>
			</div>

			<button
				type="button"
				className="absolute inset-0 -z-10 cursor-default"
				onClick={onClose}
				aria-label="Close modal"
			/>
		</div>
	)
}
