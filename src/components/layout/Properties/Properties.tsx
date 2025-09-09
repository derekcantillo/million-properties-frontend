'use client'

import React, { useState, useRef, useEffect } from 'react'
import ReactSlider from 'react-slider'
import { PropertyItem } from '@/components/layout'
import { PropertySkeleton } from '@/components/ui/PropertySkeleton'
import { Button } from '@/components/ui/Button'
import { usePropertiesInfinite } from '@/hooks/usePropertiesInfinite'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import {
	Squares2X2Icon,
	ChevronDownIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	CurrencyDollarIcon,
	LanguageIcon,
	FunnelIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils/cn'
import type { Property } from '@/types/property.types'
import clsx from 'clsx'
import { gsap } from 'gsap'

type SortType = 'price' | 'name'
type SortDirection = 'asc' | 'desc' | null

interface SortState {
	price: SortDirection
	name: SortDirection
}

export const Properties = () => {
	const { properties, loading, hasNextPage, error, loadMore, refresh } =
		usePropertiesInfinite()
	const { loadMoreRef } = useInfiniteScroll({
		hasNextPage,
		loading,
		onLoadMore: loadMore,
		threshold: 200
	})

	const [sortState, setSortState] = useState<SortState>({
		price: null,
		name: null
	})
	const [columnsPerRow, setColumnsPerRow] = useState(2)
	const [showViewDropdown, setShowViewDropdown] = useState(false)
	const [showFloatingButton, setShowFloatingButton] = useState(false)
	const [showFloatingMenu, setShowFloatingMenu] = useState(false)

	const viewDropdownRef = useRef<HTMLDivElement>(null)
	const toolbarRef = useRef<HTMLDivElement>(null)
	const floatingButtonRef = useRef<HTMLDivElement>(null)
	const floatingMenuRef = useRef<HTMLDivElement>(null)

	const handleSortClick = (sortType: SortType) => {
		setSortState(prev => {
			const currentDirection = prev[sortType]
			let newDirection: SortDirection

			if (currentDirection === null) {
				newDirection = 'asc'
			} else if (currentDirection === 'asc') {
				newDirection = 'desc'
			} else {
				newDirection = null
			}

			return {
				...prev,
				[sortType]: newDirection
			}
		})
	}

	const sortedProperties = [...properties].sort((a: Property, b: Property) => {
		if (sortState.price) {
			const priceComparison =
				sortState.price === 'asc'
					? a.priceProperty - b.priceProperty
					: b.priceProperty - a.priceProperty
			if (priceComparison !== 0) return priceComparison
		}

		if (sortState.name) {
			const nameComparison =
				sortState.name === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			if (nameComparison !== 0) return nameComparison
		}

		return 0
	})

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				viewDropdownRef.current &&
				!viewDropdownRef.current.contains(event.target as Node)
			) {
				setShowViewDropdown(false)
			}
			if (
				floatingMenuRef.current &&
				!floatingMenuRef.current.contains(event.target as Node) &&
				floatingButtonRef.current &&
				!floatingButtonRef.current.contains(event.target as Node)
			) {
				setShowFloatingMenu(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		const handleScroll = () => {
			if (toolbarRef.current) {
				const toolbarRect = toolbarRef.current.getBoundingClientRect()
				const isToolbarVisible = toolbarRect.bottom > 0
				if (!isToolbarVisible && !showFloatingButton) {
					setShowFloatingButton(true)
					if (floatingButtonRef.current) {
						gsap.fromTo(
							floatingButtonRef.current,
							{ scale: 0, opacity: 0 },
							{ scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
						)
					}
				} else if (isToolbarVisible && showFloatingButton) {
					if (floatingButtonRef.current) {
						gsap.to(floatingButtonRef.current, {
							scale: 0,
							opacity: 0,
							duration: 0.2,
							ease: 'power2.in',
							onComplete: () => {
								setShowFloatingButton(false)
								setShowFloatingMenu(false)
							}
						})
					}
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [showFloatingButton])

	useEffect(() => {
		if (showFloatingMenu && floatingMenuRef.current) {
			gsap.fromTo(
				floatingMenuRef.current,
				{ y: 20, opacity: 0, scale: 0.95 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
			)
		}
	}, [showFloatingMenu])

	const handleFloatingMenuToggle = () => {
		setShowFloatingMenu(!showFloatingMenu)
	}

	const renderSortArrow = (direction: SortDirection) => {
		if (direction === 'asc') {
			return <ArrowUpIcon className="h-3 w-3 text-blue-600" />
		} else if (direction === 'desc') {
			return <ArrowDownIcon className="h-3 w-3 text-blue-600" />
		}
		return null
	}

	const getGridClasses = () => {
		const baseClasses = 'grid gap-6'
		switch (columnsPerRow) {
			case 1:
				return `${baseClasses} grid-cols-1`
			case 2:
				return `${baseClasses} grid-cols-1 md:grid-cols-2`
			case 3:
				return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
			case 4:
				return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
			case 5:
				return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`
			default:
				return `${baseClasses} grid-cols-1 md:grid-cols-2`
		}
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<p className="mb-4 text-red-600">{error}</p>
				<button
					onClick={refresh}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		)
	}

	return (
		<section className="w-full">
			<div
				ref={toolbarRef}
				className="mb-6 flex flex-col gap-4 rounded-lg p-4 shadow-md sm:flex-row sm:items-center sm:justify-between"
			>
				<div className="flex flex-wrap gap-3">
					<Button
						size="sm"
						onClick={() => handleSortClick('price')}
						className={clsx('flex items-center gap-1', {
							'bg-blue-100 text-blue-700': sortState.price,
							'border border-gray-200 text-gray-600 hover:bg-gray-200':
								!sortState.price
						})}
					>
						<CurrencyDollarIcon className="h-4 w-4" />
						{renderSortArrow(sortState.price)}
					</Button>

					<Button
						size="sm"
						onClick={() => handleSortClick('name')}
						className={clsx('flex items-center gap-1', {
							'bg-blue-100 text-blue-700': sortState.name,
							'border border-gray-200 text-gray-600 hover:bg-gray-200':
								!sortState.name
						})}
					>
						<LanguageIcon className="h-4 w-4" />
						{renderSortArrow(sortState.name)}
					</Button>

					<div className="relative" ref={viewDropdownRef}>
						<Button
							size="sm"
							onClick={() => setShowViewDropdown(!showViewDropdown)}
							className={clsx('flex items-center gap-2', {
								'border border-gray-200 text-gray-600 hover:bg-gray-200':
									!showViewDropdown
							})}
						>
							<Squares2X2Icon className="h-4 w-4" />
							<ChevronDownIcon
								className={cn(
									'h-4 w-4 transition-transform',
									showViewDropdown && 'rotate-180'
								)}
							/>
						</Button>

						{showViewDropdown && (
							<div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
								<div className="space-y-4">
									<div className="text-sm font-medium text-gray-700">
										Propiedades por fila: {columnsPerRow}
									</div>
									<div className="px-2">
										<ReactSlider
											className="horizontal-slider view-slider"
											thumbClassName="slider-thumb"
											trackClassName="slider-track"
											min={1}
											max={5}
											step={1}
											value={columnsPerRow}
											onChange={value => setColumnsPerRow(value)}
											marks={[1, 2, 3, 4, 5]}
											markClassName="slider-mark"
										/>
									</div>
									<div className="flex justify-between text-xs text-gray-500">
										<span>1</span>
										<span>2</span>
										<span>3</span>
										<span>4</span>
										<span>5</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2 text-sm text-gray-600">
					{(sortState.price || sortState.name) && (
						<div className="flex items-center gap-2">
							<span>Ordenado por:</span>
							{sortState.price && (
								<span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-700">
									<CurrencyDollarIcon className="h-3 w-3" />
									{renderSortArrow(sortState.price)}
								</span>
							)}
							{sortState.name && (
								<span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-700">
									<LanguageIcon className="h-3 w-3" />
									{renderSortArrow(sortState.name)}
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			<div className={getGridClasses()}>
				{sortedProperties.map(property => (
					<PropertyItem key={property.id} property={property} />
				))}

				{loading && (
					<>
						{Array.from({ length: 6 }).map((_, index) => (
							<PropertySkeleton
								key={`skeleton-${properties.length}-${index}`}
							/>
						))}
					</>
				)}
			</div>

			<div ref={loadMoreRef} className="h-10 w-full" />

			{loading && properties.length > 0 && (
				<div className="flex justify-center py-8">
					<div className="flex items-center space-x-2">
						<div className="h-4 w-4 animate-bounce rounded-full bg-blue-600"></div>
						<div
							className="h-4 w-4 animate-bounce rounded-full bg-blue-600"
							style={{ animationDelay: '0.1s' }}
						></div>
						<div
							className="h-4 w-4 animate-bounce rounded-full bg-blue-600"
							style={{ animationDelay: '0.2s' }}
						></div>
						<span className="ml-2 text-gray-600">
							Loading more properties...
						</span>
					</div>
				</div>
			)}

			{!hasNextPage && sortedProperties.length > 0 && (
				<div className="py-8 text-center">
					<p className="text-gray-600">You've reached the end! 🏠</p>
					<p className="mt-1 text-sm text-gray-500">
						Showing all {sortedProperties.length} properties
					</p>
				</div>
			)}

			{showFloatingButton && (
				<div className="fixed right-6 bottom-6 z-50">
					<div ref={floatingButtonRef} className="relative">
						<button
							onClick={handleFloatingMenuToggle}
							className={clsx(
								'bg-foreground hover:bg-foreground/90',
								'flex h-14 w-14 items-center justify-center',
								'rounded-full text-white shadow-lg transition-all duration-200 hover:shadow-xl'
							)}
						>
							<FunnelIcon className="h-6 w-6" />
						</button>

						{showFloatingMenu && (
							<div
								ref={floatingMenuRef}
								className="absolute right-16 bottom-16 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
							>
								<div className="space-y-4">
									<h3 className="text-sm font-medium text-gray-700">
										Ordenar y Vista
									</h3>
									<div className="flex flex-wrap gap-3">
										<Button
											size="sm"
											onClick={() => handleSortClick('price')}
											className={clsx('flex items-center gap-1', {
												'bg-blue-100 text-blue-700': sortState.price,
												'border border-gray-200 text-gray-600 hover:bg-gray-200':
													!sortState.price
											})}
										>
											<CurrencyDollarIcon className="h-4 w-4" />
											{renderSortArrow(sortState.price)}
										</Button>

										<Button
											size="sm"
											onClick={() => handleSortClick('name')}
											className={clsx('flex items-center gap-1', {
												'bg-blue-100 text-blue-700': sortState.name,
												'border border-gray-200 text-gray-600 hover:bg-gray-200':
													!sortState.name
											})}
										>
											<LanguageIcon className="h-4 w-4" />
											{renderSortArrow(sortState.name)}
										</Button>

										<div className="relative" ref={viewDropdownRef}>
											<Button
												size="sm"
												onClick={() => setShowViewDropdown(!showViewDropdown)}
												className={clsx('flex items-center gap-2', {
													'border border-gray-200 text-gray-600 hover:bg-gray-200':
														!showViewDropdown
												})}
											>
												<Squares2X2Icon className="h-4 w-4" />
												<ChevronDownIcon
													className={cn(
														'h-4 w-4 transition-transform',
														showViewDropdown && 'rotate-180'
													)}
												/>
											</Button>

											{showViewDropdown && (
												<div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
													<div className="space-y-4">
														<div className="text-sm font-medium text-gray-700">
															Propiedades por fila: {columnsPerRow}
														</div>
														<div className="px-2">
															<ReactSlider
																className="horizontal-slider view-slider"
																thumbClassName="slider-thumb"
																trackClassName="slider-track"
																min={1}
																max={5}
																step={1}
																value={columnsPerRow}
																onChange={value => setColumnsPerRow(value)}
																marks={[1, 2, 3, 4, 5]}
																markClassName="slider-mark"
															/>
														</div>
														<div className="flex justify-between text-xs text-gray-500">
															<span>1</span>
															<span>2</span>
															<span>3</span>
															<span>4</span>
															<span>5</span>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>

									{(sortState.price || sortState.name) && (
										<div className="border-t pt-3">
											<div className="flex items-center gap-2 text-xs text-gray-600">
												<span>Activo:</span>
												{sortState.price && (
													<span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-700">
														<CurrencyDollarIcon className="h-3 w-3" />
														{renderSortArrow(sortState.price)}
													</span>
												)}
												{sortState.name && (
													<span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-700">
														<LanguageIcon className="h-3 w-3" />
														{renderSortArrow(sortState.name)}
													</span>
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	)
}
