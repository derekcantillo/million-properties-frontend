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
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export const FilterBar = ({
	onCollapse,
	onExpand,
	compactMode
}: FilterBarProps) => {
	const {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	} = useFilterBar({ onCollapse, onExpand })

	return (
		<div
			ref={containerRef}
			className={clsx('relative bg-white shadow-lg', 'w-full')}
		>
			<div className="flex w-full items-center divide-x divide-gray-200 overflow-hidden rounded-lg">
				{filterButtons.map(button => (
					<FilterButton
						key={button.label}
						{...button}
						someTabSelected={activeDropdown !== null}
						compactMode={Boolean(compactMode && !activeDropdown)}
					/>
				))}
			</div>

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
			<Button
				variant="ghost"
				size="icon"
				className={clsx(
					'bg-foreground z-50 rounded-full',
					'absolute top-1/2 right-6 -translate-y-1/2',
					'hover:bg-foreground/90 border'
				)}
			>
				<ArrowRightIcon className="h-4 w-4 text-white" />
			</Button>
		</div>
	)
}

FilterBar.displayName = 'FilterBar'
