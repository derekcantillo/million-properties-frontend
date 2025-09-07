'use client'

import React from 'react'
import {
	AddressDropdown,
	FilterButton,
	PriceDropdown,
	PropertyDropdown,
	useFilterBar
} from '@/components/layout'

export const FilterBar = () => {
	const {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	} = useFilterBar()
	return (
		<div
			ref={containerRef}
			className="relative container mx-auto w-1/2 rounded-lg bg-white shadow-lg"
		>
			<div className="flex items-center overflow-hidden rounded-lg">
				{filterButtons.map(button => (
					<FilterButton key={button.label} {...button} />
				))}
			</div>

			<PropertyDropdown
				isOpen={activeDropdown === 'property'}
				position={dropdownPosition}
				onClose={() => setActiveDropdown(null)}
			/>
			<AddressDropdown
				isOpen={activeDropdown === 'address'}
				position={dropdownPosition}
				onClose={() => setActiveDropdown(null)}
			/>
			<PriceDropdown
				isOpen={activeDropdown === 'price'}
				position={dropdownPosition}
				onClose={() => setActiveDropdown(null)}
			/>
		</div>
	)
}
