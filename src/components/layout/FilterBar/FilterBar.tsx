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

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
	({ isCompact = false, isExpanded = false, onExpand, onCollapse }, ref) => {
		const {
			activeDropdown,
			dropdownVisible,
			dropdownPosition,
			filterButtons,
			setActiveDropdown,
			containerRef
		} = useFilterBar({ isCompact, isExpanded, onExpand, onCollapse })

		// Combine refs properly
		const combinedRef = React.useCallback(
			(node: HTMLDivElement | null) => {
				if (containerRef) {
					containerRef.current = node
				}
				if (ref) {
					if (typeof ref === 'function') {
						ref(node)
					} else {
						ref.current = node
					}
				}
			},
			[ref, containerRef]
		)

		return (
			<div
				ref={combinedRef}
				className={clsx(
					'relative container rounded-lg bg-white shadow-lg',
					'w-1/2 transition-all duration-300 ease-in-out'
				)}
			>
				<div className="flex items-center overflow-hidden rounded-lg">
					{filterButtons.map(button => (
						<FilterButton
							key={button.label}
							{...button}
							someTabSelected={activeDropdown !== null}
						/>
					))}
				</div>

				<PropertyDropdown
					isOpen={dropdownVisible === 'property'}
					position={dropdownPosition}
					onClose={() => {
						setActiveDropdown(null)
						onCollapse?.()
					}}
				/>
				<AddressDropdown
					isOpen={dropdownVisible === 'address'}
					position={dropdownPosition}
					onClose={() => {
						setActiveDropdown(null)
						onCollapse?.()
					}}
				/>
				<PriceDropdown
					isOpen={dropdownVisible === 'price'}
					position={dropdownPosition}
					onClose={() => {
						setActiveDropdown(null)
						onCollapse?.()
					}}
				/>
			</div>
		)
	}
)

FilterBar.displayName = 'FilterBar'
