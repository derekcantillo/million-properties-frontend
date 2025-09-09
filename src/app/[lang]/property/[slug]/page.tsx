'use client'

import React, { useState } from 'react'
import { usePropertyDetail } from '@/hooks/usePropertyDetail'
import { formatCurrency, formatNumber } from '@/lib/utils/format'
import { PropertyDetailSkeleton } from '@/components/ui/PropertyDetailSkeleton'
import { ImageCollage } from '@/components/ui/ImageCollage'
import { ImageCarouselModal } from '@/components/ui/ImageCarouselModal'
import { Button } from '@/components/ui/Button'
import { DynamicHeaderFilter } from '@/components/layout/DynamicHeaderFilter'
import {
	HomeIcon,
	MapPinIcon,
	CalendarIcon,
	TagIcon,
	BuildingOfficeIcon,
	UserIcon,
	CakeIcon,
	ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface PropertyDetailPageProps {
	params: Promise<{ slug: string; lang: string }>
}

export default function PropertyDetailPage({
	params
}: PropertyDetailPageProps) {
	const resolvedParams = React.use(params)
	const { slug } = resolvedParams
	const { property, isLoading, error } = usePropertyDetail({ slug })
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalInitialIndex, setModalInitialIndex] = useState(0)

	const handleImageClick = (index: number) => {
		setModalInitialIndex(index)
		setIsModalOpen(true)
	}

	const handleViewAllImages = () => {
		setModalInitialIndex(0)
		setIsModalOpen(true)
	}

	if (isLoading) {
		return (
			<div className="bg-background relative min-h-screen">
				<DynamicHeaderFilter showVideo={false} showHeroText={false} />
				<div className="container mx-auto px-8 py-8">
					{/* Back Button */}
					<div className="mb-6">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => window.history.back()}
							className="gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
						>
							<ArrowLeftIcon className="h-4 w-4" />
							Volver a propiedades
						</Button>
					</div>
					<PropertyDetailSkeleton />
				</div>
			</div>
		)
	}

	if (error || !property) {
		return (
			<div className="bg-background relative min-h-screen">
				<DynamicHeaderFilter showVideo={false} showHeroText={false} />
				<div className="container mx-auto px-8 py-8">
					{/* Back Button */}
					<div className="mb-6">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => window.history.back()}
							className="gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
						>
							<ArrowLeftIcon className="h-4 w-4" />
							Volver a propiedades
						</Button>
					</div>
					<div className="flex flex-col items-center justify-center py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
								Propiedad no encontrada
							</h1>
							<p className="mt-2 text-gray-600 dark:text-gray-400">
								{error ||
									'La propiedad que buscas no existe o no está disponible.'}
							</p>
							<Button
								onClick={() => window.history.back()}
								className="mt-4"
								variant="outline"
							>
								Volver
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-background relative min-h-screen">
			<DynamicHeaderFilter showVideo={false} showHeroText={false} />
			<div className="container mx-auto px-8 py-8">
				{/* Back Button */}
				<div className="mb-6">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => window.history.back()}
						className="gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					>
						<ArrowLeftIcon className="h-4 w-4" />
						Volver a propiedades
					</Button>
				</div>

				{/* Header Section */}
				<div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div className="flex-1">
						<h1 className="text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
							{property.name}
						</h1>
						<div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-400">
							<MapPinIcon className="h-5 w-5" />
							<span className="text-lg">{property.addressProperty}</span>
						</div>
					</div>
					<div className="text-right">
						<div className="text-3xl font-bold text-green-600 lg:text-4xl">
							{formatCurrency(property.priceProperty)}
						</div>
						<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Código: {property.codeInternal}
						</div>
					</div>
				</div>

				{/* Images Section */}
				<div className="mb-8">
					<ImageCollage
						images={property.images}
						propertyName={property.name}
						onImageClick={handleImageClick}
						onViewAllClick={handleViewAllImages}
					/>
				</div>

				{/* Content Section */}
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Property Details */}
					<div className="space-y-8 lg:col-span-2">
						{/* Description */}
						<div>
							<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
								Descripción
							</h2>
							<p className="leading-relaxed text-gray-700 dark:text-gray-300">
								{property.description}
							</p>
						</div>

						{/* Property Features */}
						<div>
							<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
								Características de la propiedad
							</h2>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="flex items-center gap-3 rounded-lg border p-3">
									<HomeIcon className="h-5 w-5 text-blue-500" />
									<div>
										<span className="font-medium">Tipo:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.propertyType}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<TagIcon className="h-5 w-5 text-green-500" />
									<div>
										<span className="font-medium">Estado:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.status}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<CalendarIcon className="h-5 w-5 text-purple-500" />
									<div>
										<span className="font-medium">Año:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.year}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<BuildingOfficeIcon className="h-5 w-5 text-orange-500" />
									<div>
										<span className="font-medium">Área:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{formatNumber(property.areaSqFt)} sq ft
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<HomeIcon className="h-5 w-5 text-red-500" />
									<div>
										<span className="font-medium">Habitaciones:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.bedrooms}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<HomeIcon className="h-5 w-5 text-cyan-500" />
									<div>
										<span className="font-medium">Baños:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.bathrooms}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 rounded-lg border p-3">
									<HomeIcon className="h-5 w-5 text-yellow-500" />
									<div>
										<span className="font-medium">Estacionamientos:</span>
										<span className="ml-2 text-gray-700 dark:text-gray-300">
											{property.parkingSpaces}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Property Traces */}
						{property.traces && property.traces.length > 0 && (
							<div>
								<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
									Historial de transacciones
								</h2>
								<div className="space-y-3">
									{property.traces.map(trace => (
										<div
											key={trace.idPropertyTrace}
											className="rounded-lg border p-4"
										>
											<div className="flex items-center justify-between">
												<div>
													<h3 className="font-medium text-gray-900 dark:text-white">
														{trace.name}
													</h3>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														{new Date(trace.dateSale).toLocaleDateString(
															'es-ES'
														)}
													</p>
												</div>
												<div className="text-right">
													<div className="font-semibold text-green-600">
														{formatCurrency(trace.value)}
													</div>
													<div className="text-sm text-gray-500">
														Impuestos: {formatCurrency(trace.tax)}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Owner Information */}
					<div>
						<h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
							Información del propietario
						</h2>
						<div className="space-y-4 rounded-lg border p-6">
							{/* Owner photo and name */}
							<div className="flex items-center gap-4">
								<div className="relative h-16 w-16 overflow-hidden rounded-full">
									<Image
										src={property.owner.photo}
										alt={property.owner.name}
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{property.owner.name}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Propietario
									</p>
								</div>
							</div>

							{/* Owner details */}
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<MapPinIcon className="h-5 w-5 text-gray-400" />
									<span className="text-gray-700 dark:text-gray-300">
										{property.owner.address}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<CakeIcon className="h-5 w-5 text-gray-400" />
									<span className="text-gray-700 dark:text-gray-300">
										{new Date(property.owner.birthday).toLocaleDateString(
											'es-ES'
										)}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<UserIcon className="h-5 w-5 text-gray-400" />
									<span className="text-gray-700 dark:text-gray-300">
										ID: {property.owner.idOwner}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Image Carousel Modal */}
			<ImageCarouselModal
				images={property.images}
				propertyName={property.name}
				isOpen={isModalOpen}
				initialIndex={modalInitialIndex}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	)
}
