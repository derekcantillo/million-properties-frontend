'use client'

import { useEffect, useRef, useState } from 'react'
import {
	FilterButtonProps,
	FilterType,
	UseFilterBarProps
} from '@/components/layout'

export const useFilterBar = ({ onCollapse, onExpand }: UseFilterBarProps) => {
	const [activeDropdown, setActiveDropdown] = useState<FilterType>(null)
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
			onCollapse?.()
			return
		}

		setActiveDropdown(filterType)
		calculateDropdownPosition(buttonKey)
		onExpand?.()
	}

	const calculateDropdownPosition = (buttonKey: string) => {
		const button = buttonRefs.current[buttonKey]
		const container = containerRef.current

		if (button && container) {
			const buttonRect = button.getBoundingClientRect()
			const containerRect = container.getBoundingClientRect()

			const newPosition = {
				top: buttonRect.bottom - containerRect.top,
				left: buttonRect.left - containerRect.left,
				width: buttonRect.width
			}

			setDropdownPosition(newPosition)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setActiveDropdown(null)
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
			onClick: () => handleDropdownToggle('property', 'property')
		},
		{
			buttonRef: el => {
				buttonRefs.current['address'] = el
			},
			label: 'Dirección de la propiedad',
			placeholder: 'Dirección',
			isActive: activeDropdown === 'address',
			onClick: () => handleDropdownToggle('address', 'address')
		},
		{
			buttonRef: el => {
				buttonRefs.current['price'] = el
			},
			label: 'Rango de precios',
			placeholder: '$ - $',
			isActive: activeDropdown === 'price',
			onClick: () => handleDropdownToggle('price', 'price')
		}
	]

	return {
		activeDropdown,
		dropdownPosition,
		filterButtons,
		setActiveDropdown,
		containerRef
	}
}
