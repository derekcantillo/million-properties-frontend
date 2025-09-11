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
import {
	Typography,
	TypographyFontFamily,
	TypographySize,
	TypographyTextColor,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui'

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
							<Typography
								variant={TypographyVariant.H1}
								fontFamily={TypographyFontFamily.CAIRO}
								weight={TypographyWeight.BOLD}
								className="text-2xl text-gray-900 dark:text-white"
							>
								Propiedad no encontrada
							</Typography>
							<Typography
								variant={TypographyVariant.PARAGRAPH}
								fontFamily={TypographyFontFamily.CAIRO}
								textColor={TypographyTextColor.DEFAULT}
								className="mt-2 text-gray-600 dark:text-gray-400"
							>
								{error ||
									'La propiedad que buscas no existe o no está disponible.'}
							</Typography>
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

	const features = [
		{
			label: 'Tipo',
			icon: HomeIcon,
			colorClass: 'text-blue-500',
			value: property.propertyType
		},
		{
			label: 'Estado',
			icon: TagIcon,
			colorClass: 'text-green-500',
			value: property.status
		},
		{
			label: 'Año',
			icon: CalendarIcon,
			colorClass: 'text-purple-500',
			value: property.year
		},
		{
			label: 'Área',
			icon: BuildingOfficeIcon,
			colorClass: 'text-orange-500',
			value: `${formatNumber(property.areaSqFt)} sq ft`
		},
		{
			label: 'Habitaciones',
			icon: HomeIcon,
			colorClass: 'text-red-500',
			value: property.bedrooms
		},
		{
			label: 'Baños',
			icon: HomeIcon,
			colorClass: 'text-cyan-500',
			value: property.bathrooms
		},
		{
			label: 'Estacionamientos',
			icon: HomeIcon,
			colorClass: 'text-yellow-500',
			value: property.parkingSpaces
		}
	] as const

	return (
		<div className="bg-background relative min-h-screen">
			<DynamicHeaderFilter showVideo={false} showHeroText={false} />
			<div className="container mx-auto px-8 py-16">
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
						<Typography
							variant={TypographyVariant.H1}
							className="lg:text-4xle text-3xl font-bold text-gray-900"
							fontFamily={TypographyFontFamily.CINZEL}
						>
							{property.name}
						</Typography>
						<div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-400">
							<MapPinIcon className="h-5 w-5" />
							<Typography
								variant={TypographyVariant.SPAN}
								fontFamily={TypographyFontFamily.CAIRO}
								textColor={TypographyTextColor.DEFAULT}
								className="text-lg"
							>
								{property.addressProperty}
							</Typography>
						</div>
					</div>
					<div className="text-right">
						<Typography
							variant={TypographyVariant.H2}
							fontFamily={TypographyFontFamily.CAIRO}
							weight={TypographyWeight.BOLD}
							className="text-3xl text-green-600 lg:text-4xl"
						>
							{formatCurrency(property.priceProperty)}
						</Typography>
						<Typography
							variant={TypographyVariant.SPAN}
							fontFamily={TypographyFontFamily.CAIRO}
							textColor={TypographyTextColor.DEFAULT}
							className="mt-1 text-sm text-gray-500 dark:text-gray-400"
						>
							Código: {property.codeInternal}
						</Typography>
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
							<Typography
								fontFamily={TypographyFontFamily.CAIRO}
								variant={TypographyVariant.H3}
								weight={TypographyWeight.SEMI_BOLD}
							>
								Descripción
							</Typography>
							<Typography
								fontFamily={TypographyFontFamily.CAIRO}
								variant={TypographyVariant.PARAGRAPH}
								textColor={TypographyTextColor.DEFAULT}
							>
								{property.description}
							</Typography>
						</div>

						{/* Property Features */}
						<div>
							<Typography
								fontFamily={TypographyFontFamily.CAIRO}
								variant={TypographyVariant.H3}
								weight={TypographyWeight.SEMI_BOLD}
							>
								Características de la propiedad
							</Typography>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{features.map(feature => {
									const Icon = feature.icon
									return (
										<div
											key={feature.label}
											className="flex items-center gap-3 rounded-lg bg-gray-100 p-3"
										>
											<Icon className={`h-5 w-5 ${feature.colorClass}`} />
											<div>
												<Typography
													fontFamily={TypographyFontFamily.CAIRO}
													variant={TypographyVariant.SPAN}
													weight={TypographyWeight.BOLD}
												>
													{feature.label}:{' '}
												</Typography>
												<Typography
													fontFamily={TypographyFontFamily.CAIRO}
													variant={TypographyVariant.SPAN}
													weight={TypographyWeight.SEMI_BOLD}
												>
													{feature.value}
												</Typography>
											</div>
										</div>
									)
								})}
							</div>
						</div>

						{/* Property Traces */}
						{property.traces && property.traces.length > 0 && (
							<div>
								<Typography
									variant={TypographyVariant.H3}
									fontFamily={TypographyFontFamily.CAIRO}
									weight={TypographyWeight.BOLD}
									size={TypographySize.XL2}
									className="mb-4"
								>
									Historial de transacciones
								</Typography>
								<div className="space-y-3">
									{property.traces.map(trace => (
										<div
											key={trace.idPropertyTrace}
											className="rounded-lg border p-4"
										>
											<div className="flex items-center justify-between">
												<div>
													<Typography
														variant={TypographyVariant.H3}
														fontFamily={TypographyFontFamily.CAIRO}
														weight={TypographyWeight.MEDIUM}
													>
														{trace.name}
													</Typography>
													<Typography
														variant={TypographyVariant.SPAN}
														fontFamily={TypographyFontFamily.CAIRO}
														textColor={TypographyTextColor.DEFAULT}
														size={TypographySize.SM}
													>
														{new Date(trace.dateSale).toLocaleDateString(
															'es-ES'
														)}
													</Typography>
												</div>
												<div className="text-right">
													<Typography
														variant={TypographyVariant.SPAN}
														fontFamily={TypographyFontFamily.CAIRO}
														weight={TypographyWeight.SEMI_BOLD}
														className="text-green-600"
													>
														{formatCurrency(trace.value)}
													</Typography>
													<Typography
														variant={TypographyVariant.SPAN}
														fontFamily={TypographyFontFamily.CAIRO}
														textColor={TypographyTextColor.DEFAULT}
														size={TypographySize.SM}
													>
														Impuestos: {formatCurrency(trace.tax)}
													</Typography>
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
						<Typography
							fontFamily={TypographyFontFamily.CAIRO}
							variant={TypographyVariant.H3}
							weight={TypographyWeight.SEMI_BOLD}
						>
							Información del propietario
						</Typography>
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
									<Typography
										variant={TypographyVariant.H3}
										fontFamily={TypographyFontFamily.CAIRO}
										weight={TypographyWeight.SEMI_BOLD}
										size={TypographySize.XL}
									>
										{property.owner.name}
									</Typography>
									<Typography
										variant={TypographyVariant.PARAGRAPH}
										fontFamily={TypographyFontFamily.CAIRO}
										textColor={TypographyTextColor.DEFAULT}
										size={TypographySize.SM}
									>
										Propietario
									</Typography>
								</div>
							</div>

							{/* Owner details */}
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<MapPinIcon className="h-5 w-5 text-gray-400" />
									<Typography
										variant={TypographyVariant.SPAN}
										fontFamily={TypographyFontFamily.CAIRO}
										textColor={TypographyTextColor.DEFAULT}
									>
										{property.owner.address}
									</Typography>
								</div>
								<div className="flex items-center gap-3">
									<CakeIcon className="h-5 w-5 text-gray-400" />
									<Typography
										variant={TypographyVariant.SPAN}
										fontFamily={TypographyFontFamily.CAIRO}
										textColor={TypographyTextColor.DEFAULT}
									>
										{new Date(property.owner.birthday).toLocaleDateString(
											'es-ES'
										)}
									</Typography>
								</div>
								<div className="flex items-center gap-3">
									<UserIcon className="h-5 w-5 text-gray-400" />
									<Typography
										variant={TypographyVariant.SPAN}
										fontFamily={TypographyFontFamily.CAIRO}
										textColor={TypographyTextColor.DEFAULT}
									>
										ID: {property.owner.idOwner}
									</Typography>
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
