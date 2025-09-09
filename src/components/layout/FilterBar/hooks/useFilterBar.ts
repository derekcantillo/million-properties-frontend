'use client'

import { useEffect, useRef, useState } from 'react'
import { FilterButtonProps, FilterType } from '@/components/layout'

interface UseFilterBarProps {
	isCompact?: boolean
	isExpanded?: boolean
	onExpand?: (() => void) | undefined
	onCollapse?: (() => void) | undefined
}

export const useFilterBar = ({
	isCompact = false,
	isExpanded = false,
	onExpand,
	onCollapse
}: UseFilterBarProps = {}) => {
	const [activeDropdown, setActiveDropdown] = useState<FilterType>(null)
	const [dropdownVisible, setDropdownVisible] = useState<FilterType>(null)
	const [dropdownPosition, setDropdownPosition] = useState({
		top: 0,
		left: 0,
		width: 0
	})
	const containerRef = useRef<HTMLDivElement>(null)
	const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

	const handleDropdownToggle = (filterType: FilterType, buttonKey: string) => {
		if (activeDropdown === filterType) {
			setActiveDropdown(null)
			setDropdownVisible(null)
			onCollapse?.()
			return
		}

		// Set active dropdown but not visible yet
		setActiveDropdown(filterType)
		setDropdownVisible(null) // Hide initially

		// If we're in compact mode, expand first and wait for animation to complete
		if (isCompact) {
			onExpand?.()
			// Wait for expansion to start, then continuously check if it's ready
			setTimeout(() => {
				waitForExpansionComplete(filterType, buttonKey)
			}, 100) // Small initial delay
		} else {
			// If already expanded, show dropdown immediately
			calculateAndSetDropdownPosition(filterType, buttonKey)
		}
	}

	const waitForExpansionComplete = (
		filterType: FilterType,
		buttonKey: string
	) => {
		let attempts = 0
		const maxAttempts = 60 // Max 1 second at 60fps

		const checkIfReady = () => {
			const container = containerRef.current
			if (!container || attempts >= maxAttempts) {
				// Fallback: just show the dropdown after max attempts
				if (attempts >= maxAttempts) {
					calculateAndSetDropdownPosition(filterType, buttonKey)
				}
				return
			}

			attempts++

			// Check if the FilterBar is at full scale (not compact anymore)
			const transform = window.getComputedStyle(container).transform
			const isFullyExpanded =
				transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)'

			if (isFullyExpanded && isExpanded) {
				// Wait one more frame to be absolutely sure
				requestAnimationFrame(() => {
					calculateAndSetDropdownPosition(filterType, buttonKey)
				})
			} else {
				// Check again in next frame
				requestAnimationFrame(checkIfReady)
			}
		}

		checkIfReady()
	}

	const calculateAndSetDropdownPosition = (
		filterType: FilterType,
		buttonKey: string
	) => {
		const button = buttonRefs.current[buttonKey]
		const container = containerRef.current

		if (button && container) {
			// Force reflow to ensure all transforms are applied
			void container.offsetHeight
			void button.offsetHeight

			const buttonRect = button.getBoundingClientRect()
			const containerRect = container.getBoundingClientRect()

			const newPosition = {
				top: buttonRect.bottom - containerRect.top,
				left: buttonRect.left - containerRect.left,
				width: buttonRect.width
			}

			console.log('Position calculation:', {
				buttonKey,
				isCompact,
				isExpanded,
				buttonRect: {
					bottom: buttonRect.bottom,
					left: buttonRect.left,
					width: buttonRect.width
				},
				containerRect: {
					top: containerRect.top,
					left: containerRect.left
				},
				finalPosition: newPosition
			})

			setDropdownPosition(newPosition)
			setDropdownVisible(filterType)
		}
	}

	// Recalculate dropdown position when expanded state changes
	useEffect(() => {
		if (activeDropdown && isExpanded && !isCompact) {
			// If we're now expanded and not compact, recalculate position
			waitForExpansionComplete(activeDropdown, activeDropdown)
		}
	}, [isExpanded, activeDropdown, isCompact])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setActiveDropdown(null)
				setDropdownVisible(null)
				onCollapse?.()
			}
		}

		if (activeDropdown) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [activeDropdown, onCollapse])

	const filterButtons: FilterButtonProps[] = [
		{
			buttonRef: el => {
				buttonRefs.current['property'] = el
			},
			label: 'Nombre de la propiedad',
			placeholder: 'Nombre',
			isActive: activeDropdown === 'property',
			onClick: () => handleDropdownToggle('property', 'property'),
			isCompact,
			isExpanded
		},
		{
			buttonRef: el => {
				buttonRefs.current['address'] = el
			},
			label: 'Dirección de la propiedad',
			placeholder: 'Dirección',
			isActive: activeDropdown === 'address',
			onClick: () => handleDropdownToggle('address', 'address'),
			isCompact,
			isExpanded
		},
		{
			buttonRef: el => {
				buttonRefs.current['price'] = el
			},
			label: 'Rango de precios',
			placeholder: '$ - $',
			isActive: activeDropdown === 'price',
			onClick: () => handleDropdownToggle('price', 'price'),
			isCompact,
			isExpanded
		}
	]
	return {
		activeDropdown,
		dropdownVisible,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		setDropdownPosition,
		containerRef
	}
}
