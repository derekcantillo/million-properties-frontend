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

export const FilterBar = ({ onCollapse, onExpand }: FilterBarProps) => {
	const {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	} = useFilterBar({ onCollapse, onExpand })

	return (
		<div className="sticky top-0 z-60 flex w-full items-center justify-center">
			<div
				ref={containerRef}
				className={clsx('relative bg-white shadow-lg', 'w-full')}
			>
				<div className="flex w-full items-center overflow-hidden rounded-lg">
					{filterButtons.map(button => (
						<FilterButton
							key={button.label}
							{...button}
							someTabSelected={activeDropdown !== null}
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
			</div>
		</div>
	)
}

FilterBar.displayName = 'FilterBar'
