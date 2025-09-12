'use client'

import React, { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'
import { useForm, FormProvider } from 'react-hook-form'
import { formatPropertyPrice } from '@/lib/utils/format'
import {
	Button,
	Input,
	TypographyVariant,
	TypographyFontFamily,
	Typography
} from '@/components/ui'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils/cn'

interface MobileFilterModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (values: {
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}) => void
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
	isOpen,
	onClose,
	onSubmit
}) => {
	const form = useForm<{
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}>()

	const priceRange: [number, number] = [0, 5000000]
	const [priceValue, setPriceValue] = useState<number[]>([
		priceRange[0],
		priceRange[1]
	])

	const handlePriceChange = (value: number[]) => {
		setPriceValue(value)
		form.setValue('minPrice', value[0])
		form.setValue('maxPrice', value[1])
	}

	const handleSubmit = form.handleSubmit(values => {
		onSubmit(values)
		onClose()
	})

	useEffect(() => {
		if (isOpen) {
			const min = form.getValues('minPrice')
			const max = form.getValues('maxPrice')
			if (typeof min === 'number' && typeof max === 'number') {
				setPriceValue([min, max])
			} else {
				setPriceValue([priceRange[0], priceRange[1]])
			}
		}
	}, [isOpen, form])

	if (!isOpen) return null

	return (
		<div className="bg-opacity-50 fixed inset-0 top-0 z-[9999] flex h-full items-start justify-center bg-black/30">
			<div
				className={cn(
					'animate-in slide-in-from-top-4',
					'w-full max-w-md transform bg-white',
					'shadow-xl transition-transform duration-300',
					'rounded-b-xl'
				)}
			>
				<FormProvider {...form}>
					<div className="flex items-center justify-between border-b border-gray-200 p-4">
						<Typography
							variant={TypographyVariant.H3}
							fontFamily={TypographyFontFamily.CAIRO}
							className="font-semibold"
						>
							Filtros de búsqueda
						</Typography>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="h-8 w-8 rounded-full hover:bg-gray-100"
						>
							<XMarkIcon className="h-5 w-5" />
						</Button>
					</div>

					<div className="max-h-[60vh] overflow-y-auto p-4">
						<div className="space-y-6">
							<div className="space-y-2">
								<label className="block">
									<Typography
										variant={TypographyVariant.SMALL}
										fontFamily={TypographyFontFamily.CAIRO}
										className="font-medium text-gray-700"
									>
										Nombre de la propiedad
									</Typography>
								</label>
								<Input
									{...form.register('name')}
									placeholder="Ej: Casa en la playa"
									className="w-full"
								/>
							</div>

							<div className="space-y-2">
								<label className="block">
									<Typography
										variant={TypographyVariant.SMALL}
										fontFamily={TypographyFontFamily.CAIRO}
										className="font-medium text-gray-700"
									>
										Dirección
									</Typography>
								</label>
								<Input
									{...form.register('address')}
									placeholder="Ej: Madrid, España"
									className="w-full"
								/>
							</div>

							<div className="space-y-4">
								<label className="block">
									<Typography
										variant={TypographyVariant.SMALL}
										fontFamily={TypographyFontFamily.CAIRO}
										className="font-medium text-gray-700"
									>
										Rango de precios
									</Typography>
								</label>

								<div className="space-y-4">
									<div className="px-2">
										<ReactSlider
											className="horizontal-slider"
											thumbClassName="slider-thumb"
											trackClassName="slider-track"
											min={priceRange[0]}
											max={priceRange[1]}
											step={100}
											value={priceValue}
											onChange={handlePriceChange}
											pearling
											minDistance={100}
										/>
									</div>

									<div className="flex justify-between text-gray-600">
										<Typography
											variant={TypographyVariant.SPAN}
											fontFamily={TypographyFontFamily.CAIRO}
											className="font-medium"
										>
											{formatPropertyPrice(priceValue[0] ?? priceRange[0])}
										</Typography>
										<Typography
											variant={TypographyVariant.SPAN}
											fontFamily={TypographyFontFamily.CAIRO}
											className="font-medium"
										>
											{formatPropertyPrice(priceValue[1] ?? priceRange[1])}
										</Typography>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 p-4">
						<div className="flex gap-3">
							<Button
								variant="outline"
								onClick={onClose}
								className="font-cairo flex-1"
							>
								Cancelar
							</Button>
							<Button
								onClick={handleSubmit}
								className="bg-foreground hover:bg-foreground/90 text-background font-cairo flex-1"
							>
								Buscar propiedades
							</Button>
						</div>
					</div>
				</FormProvider>
			</div>
		</div>
	)
}
