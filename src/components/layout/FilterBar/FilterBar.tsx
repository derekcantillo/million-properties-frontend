'use client'

import React from 'react'
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

export const FilterBar = ({
	onCollapse,
	onExpand,
	compactMode
}: FilterBarProps) => {
	const isMobile = useIsMobile()
	const methods = useForm<{
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}>()
	const setFilters = usePropertiesStore(s => s.setFilters)
	const resetFilters = usePropertiesStore(s => s.resetFilters)
	const [submitted, setSubmitted] = React.useState(false)

	const {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	} = useFilterBar({ onCollapse, onExpand })

	const onSubmit = methods.handleSubmit(values => {
		const next: Record<string, unknown> = {}
		if (values.name !== undefined) next.name = values.name
		if (values.address !== undefined) next.address = values.address
		if (values.minPrice !== undefined) next.minPrice = values.minPrice
		if (values.maxPrice !== undefined) next.maxPrice = values.maxPrice
		setFilters(next)
		setSubmitted(true)
		// close any open dropdown after submit
		setActiveDropdown(null)
		onCollapse?.()
	})

	return (
		<div
			ref={containerRef}
			className={clsx('relative bg-white shadow-lg', 'w-full')}
		>
			{!isMobile ? (
				<FormProvider {...methods}>
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
								if (!submitted) {
									void onSubmit()
								} else {
									methods.reset()
									resetFilters()
									setSubmitted(false)
								}
							}}
						>
							{submitted ? (
								<XMarkIcon className="h-4 w-4 text-white" />
							) : (
								<ArrowRightIcon className="h-4 w-4 text-white" />
							)}
						</Button>
					)}
				</FormProvider>
			) : (
				<Button className="font-cairo h-14 w-full">
					<MagnifyingGlassIcon className="h-4 w-4" />
					Encuentra tu propiedad
				</Button>
			)}
		</div>
	)
}

FilterBar.displayName = 'FilterBar'
