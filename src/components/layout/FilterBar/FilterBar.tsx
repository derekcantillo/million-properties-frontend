'use client'

import React, { useMemo, useCallback, useEffect, useState } from 'react'
import {
	AddressDropdown,
	FilterButton,
	PriceDropdown,
	PropertyDropdown,
	useFilterBar,
	FilterBarProps
} from '@/components/layout'
import clsx from 'clsx'
import { Button } from '@/components/ui'
import {
	ArrowRightIcon,
	MagnifyingGlassIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import { FormProvider, useForm } from 'react-hook-form'
import { usePropertiesStore } from '@/stores/usePropertiesStore'
import { useIsMobile } from '@/hooks'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export const FilterBar = ({
	onCollapse,
	onExpand,
	compactMode,
	onMobileFilterOpen
}: FilterBarProps) => {
	const t = useTranslations()
	const router = useRouter()
	const pathname = usePathname()
	const isMobile = useIsMobile()
	const methods = useForm<{
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}>()
	const setFilters = usePropertiesStore(s => s.setFilters)
	const resetFilters = usePropertiesStore(s => s.resetFilters)
	const currentFilters = usePropertiesStore(s => s.filters)
	const [resetKey, setResetKey] = useState(0)

	const hasActiveFilters = useMemo(() => {
		return (
			Object.keys(currentFilters).length > 0 &&
			Object.values(currentFilters).some(
				value => value !== undefined && value !== null && value !== ''
			)
		)
	}, [currentFilters])

	const watchedValues = methods.watch()
	const hasFormChanges = useMemo(() => {
		const formHasValues = Object.values(watchedValues).some(
			value => value !== undefined && value !== null && value !== ''
		)

		if (!hasActiveFilters && !formHasValues) return false

		if (hasActiveFilters && !formHasValues) return true

		const formValues = {
			...(watchedValues.name && { name: watchedValues.name }),
			...(watchedValues.address && { address: watchedValues.address }),
			...(watchedValues.minPrice && { minPrice: watchedValues.minPrice }),
			...(watchedValues.maxPrice && { maxPrice: watchedValues.maxPrice })
		}

		return JSON.stringify(formValues) !== JSON.stringify(currentFilters)
	}, [watchedValues, currentFilters, hasActiveFilters])

	const showClearButton = hasActiveFilters && !hasFormChanges

	const {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	} = useFilterBar({ onCollapse, onExpand })

	useEffect(() => {
		if (Object.keys(currentFilters).length > 0) {
			methods.reset(currentFilters)
		}
	}, [currentFilters, methods])

	const onSubmit = methods.handleSubmit(values => {
		const next: Record<string, unknown> = {}
		if (values.name) next.name = values.name
		if (values.address) next.address = values.address
		if (values.minPrice) next.minPrice = values.minPrice
		if (values.maxPrice) next.maxPrice = values.maxPrice
		setFilters(next)
		setActiveDropdown(null)
		onCollapse?.()

		if (pathname !== '/') {
			router.push('/')
		}
	})

	const handleClearFilters = useCallback(() => {
		methods.setValue('name', '')
		methods.setValue('address', '')
		methods.setValue('minPrice', undefined)
		methods.setValue('maxPrice', undefined)

		resetFilters()

		setResetKey(prev => prev + 1)

		setActiveDropdown(null)
		onCollapse?.()
	}, [methods, resetFilters, setResetKey, setActiveDropdown, onCollapse])

	return (
		<div
			ref={containerRef}
			className={clsx('relative bg-white shadow-lg', 'w-full')}
		>
			{!isMobile ? (
				<FormProvider {...methods} key={resetKey}>
					<form
						onSubmit={onSubmit}
						className="flex w-full items-center divide-x divide-gray-200 overflow-hidden rounded-lg"
					>
						{filterButtons.map(button => (
							<FilterButton
								key={button.label}
								{...button}
								someTabSelected={activeDropdown !== null}
								compactMode={
									Boolean(compactMode && !activeDropdown) || isMobile
								}
							/>
						))}
					</form>

					<PropertyDropdown
						isOpen={activeDropdown === 'property'}
						position={dropdownPosition}
						onClose={() => {
							setActiveDropdown(null)
							onCollapse?.()
						}}
					/>
					<AddressDropdown
						isOpen={activeDropdown === 'address'}
						position={dropdownPosition}
						onClose={() => {
							setActiveDropdown(null)
							onCollapse?.()
						}}
					/>
					<PriceDropdown
						isOpen={activeDropdown === 'price'}
						position={dropdownPosition}
						onClose={() => {
							setActiveDropdown(null)
							onCollapse?.()
						}}
					/>
					{!isMobile && (
						<Button
							variant="ghost"
							size="icon"
							className={clsx(
								'bg-foreground z-50 rounded-full',
								'absolute top-1/2 right-6 -translate-y-1/2',
								'hover:bg-foreground/90 border'
							)}
							onClick={e => {
								e.preventDefault()
								if (showClearButton) {
									handleClearFilters()
								} else {
									void onSubmit()
								}
							}}
						>
							{showClearButton ? (
								<XMarkIcon className="h-4 w-4 text-white" />
							) : (
								<ArrowRightIcon className="h-4 w-4 text-white" />
							)}
						</Button>
					)}
				</FormProvider>
			) : (
				<Button className="font-cairo h-14 w-full" onClick={onMobileFilterOpen}>
					<MagnifyingGlassIcon className="h-4 w-4" />
					{t('filterBar.findProperty')}
				</Button>
			)}
		</div>
	)
}

FilterBar.displayName = 'FilterBar'
