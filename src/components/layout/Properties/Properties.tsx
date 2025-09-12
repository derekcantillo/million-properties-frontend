'use client'

import React from 'react'
import {
	FloatingMenu,
	PropertyItem,
	PropertySkeleton,
	SortDirection,
	useProperties
} from '@/components/layout'
import { Button } from '@/components/ui/Button'
import {
	ArrowUpIcon,
	ArrowDownIcon,
	CurrencyDollarIcon,
	LanguageIcon,
	FunnelIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
	ToolBar,
	ToolBarItem
} from '@/components/layout/Properties/components/ToolBar'

export const Properties = () => {
	const {
		loading,
		error,
		refresh,
		columnsPerRow,
		handleColumnsPerRow,
		getGridClasses,
		handleFloatingMenuToggle,
		handleSortClick,
		showViewDropdown,
		toolbarRef,
		viewDropdownRef,
		floatingButtonRef,
		showFloatingButton,
		sortState,
		properties,
		showFloatingMenu,
		handleShowViewDropdown,
		floatingMenuRef,
		loadMoreRef
	} = useProperties()
	const renderSortArrow = (direction: SortDirection) => {
		if (direction === 'asc') {
			return <ArrowUpIcon className="h-3 w-3 text-blue-600" />
		} else if (direction === 'desc') {
			return <ArrowDownIcon className="h-3 w-3 text-blue-600" />
		}
		return null
	}
	if (error) {
		return (
			<div className="flex h-full flex-col items-center justify-center py-12">
				<p className="mb-4 text-red-600">{error}</p>
				<button
					onClick={() => refresh()}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		)
	}

	const toolbarItems: ToolBarItem[] = [
		{
			kind: 'sort',
			sortKey: 'price',
			active: sortState.price,
			onClick: handleSortClick,
			icon: <CurrencyDollarIcon className="h-4 w-4" />,
			renderSortArrow
		},
		{
			kind: 'sort',
			sortKey: 'name',
			active: sortState.name,
			onClick: handleSortClick,
			icon: <LanguageIcon className="h-4 w-4" />,
			renderSortArrow
		},
		{
			kind: 'view',
			show: showViewDropdown,
			onToggle: handleShowViewDropdown,
			columnsPerRow,
			onChange: handleColumnsPerRow,
			viewDropdownRef
		}
	]

	return (
		<section className="w-full">
			<ToolBar containerRef={toolbarRef} items={toolbarItems} />

			<div className={getGridClasses()}>
				{properties.map(property => (
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

			<div ref={loadMoreRef} className="h-8" />

			{showFloatingButton && (
				<div className="fixed right-6 bottom-6 z-50">
					<div ref={floatingButtonRef} className="relative">
						<Button
							onClick={handleFloatingMenuToggle}
							className={clsx(
								'bg-foreground hover:bg-foreground/90',
								'flex h-14 w-14 items-center justify-center',
								'rounded-full text-white shadow-lg transition-all duration-200 hover:shadow-xl'
							)}
						>
							<FunnelIcon className="h-6 w-6" />
						</Button>

						{showFloatingMenu && (
							<FloatingMenu
								ref={floatingMenuRef}
								viewDropdownRef={viewDropdownRef}
								showViewDropdown={showViewDropdown}
								handleViewDropdown={handleShowViewDropdown}
								columnsPerRow={columnsPerRow}
								handleColumnsPerRow={handleColumnsPerRow}
								sortState={sortState}
								renderSortArrow={renderSortArrow}
								handleSortClick={handleSortClick}
								toolbarRef={toolbarRef}
								toolbarItems={toolbarItems}
							/>
						)}
					</div>
				</div>
			)}
		</section>
	)
}
