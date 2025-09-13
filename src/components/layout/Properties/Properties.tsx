'use client'

import React from 'react'
import {
	FloatingMenu,
	PropertyItem,
	PropertySkeleton,
	SortDirection,
	useProperties,
	ToolBar,
	ToolBarItem
} from '@/components/layout'
import { Button, ErrorMessage } from '@/components/ui'
import {
	ArrowUpIcon,
	ArrowDownIcon,
	CurrencyDollarIcon,
	LanguageIcon,
	FunnelIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const Properties = () => {
	const t = useTranslations()
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
		loadMoreRef,
		isMobile,
		listDensity,
		handleListDensityChange
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
			<ErrorMessage
				buttonAction={() => refresh()}
				buttonText={t('common.refresh') ?? 'Refresh'}
				title={t('common.somethingWentWrong') ?? 'Something went wrong'}
				description={t('common.pleaseTryAgain') ?? 'Please try again.'}
			/>
		)
	}

	if (!loading && properties.length === 0) {
		return (
			<ErrorMessage
				buttonAction={() => refresh()}
				buttonText={t('common.refresh')}
				title={t('properties.noPropertiesFound') ?? 'No properties found'}
				description={
					t('properties.noPropertiesDescription') ??
					'No properties match your search criteria. Try adjusting your filters or refresh to see all properties.'
				}
			/>
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
			<ToolBar
				containerRef={toolbarRef}
				items={toolbarItems}
				listDensity={listDensity}
				onChangeListDensity={handleListDensityChange}
			/>

			<div className={getGridClasses()}>
				{properties.map(property => (
					<PropertyItem
						key={property.id}
						property={property}
						columnsPerRow={columnsPerRow}
						isDesktop={!isMobile}
						listDensity={listDensity}
					/>
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
								listDensity={listDensity}
								onChangeListDensity={handleListDensityChange}
							/>
						)}
					</div>
				</div>
			)}
		</section>
	)
}
