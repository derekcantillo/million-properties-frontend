'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Typography,
	TypographyVariant,
	TypographySize,
	TypographyFontFamily
} from '@/components/ui'
import { FilterButtonProps } from '@/components/layout'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { formatPropertyPrice } from '@/lib/utils/format'

export const FilterButton: React.FC<FilterButtonProps> = ({
	label,
	placeholder,
	isActive,
	onClick,
	buttonRef,
	someTabSelected,
	compactMode
}) => {
	const form = useFormContext<{
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}>()

	const inputRef = useRef<HTMLInputElement>(null)

	const fieldName = useMemo(() => {
		if (label.toLowerCase().includes('nombre')) return 'name'
		if (label.toLowerCase().includes('dirección')) return 'address'
		if (label.toLowerCase().includes('precio')) return 'price'
		return undefined
	}, [label])

	const isPriceField = fieldName === 'price'

	const nameValue = form.watch('name')
	const addressValue = form.watch('address')
	const minPrice = form.watch('minPrice')
	const maxPrice = form.watch('maxPrice')

	const getCurrentValue = () => {
		if (fieldName === 'name') return nameValue || ''
		if (fieldName === 'address') return addressValue || ''
		return ''
	}

	const formatPriceRange = useCallback(() => {
		if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
			return `${formatPropertyPrice(minPrice)} - ${formatPropertyPrice(maxPrice)}`
		}

		return ''
	}, [minPrice, maxPrice])

	const [priceInputValue, setPriceInputValue] = useState(() => {
		if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
			return `${formatPropertyPrice(minPrice)} - ${formatPropertyPrice(maxPrice)}`
		}
		return ''
	})

	useEffect(() => {
		if (isPriceField) {
			const formattedValue = formatPriceRange()
			setPriceInputValue(formattedValue)
		}
	}, [isPriceField, formatPriceRange, minPrice, maxPrice])

	useEffect(() => {
		if (isActive && !compactMode && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus()
			}, 50)
		}
	}, [isActive, compactMode])

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			if (fieldName && fieldName !== 'price') {
				form.setValue(fieldName, value)
			}
		},
		[fieldName, form]
	)

	const parseAndSetPriceRange = useCallback(
		(inputValue: string) => {
			const cleanInput = inputValue.replace(/[^\d\s-]/g, '')
			const parts = cleanInput.split('-').map(part => part.trim())

			if (parts.length === 2 && parts[0] && parts[1]) {
				const min = parseInt(parts[0]) || 0
				const max = parseInt(parts[1]) || 5000000

				if (min >= 0 && max <= 5000000 && min <= max) {
					form.setValue('minPrice', min)
					form.setValue('maxPrice', max)
					return true
				}
			}

			return false
		},
		[form]
	)

	const handlePriceInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPriceInputValue(e.target.value)
		},
		[]
	)

	const handlePriceInputBlur = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const success = parseAndSetPriceRange(e.target.value)
			if (!success) {
				setPriceInputValue(formatPriceRange())
			}
		},
		[parseAndSetPriceRange, formatPriceRange]
	)

	const handlePriceInputKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				const target = e.target as HTMLInputElement
				const success = parseAndSetPriceRange(target.value)
				if (!success) {
					setPriceInputValue(formatPriceRange())
				}
			}
		},
		[parseAndSetPriceRange, formatPriceRange]
	)

	return (
		<button
			ref={buttonRef}
			type="button"
			className={clsx(
				'flex flex-1 cursor-pointer flex-col p-4',
				'bg-white transition-all duration-300 ease-in-out',
				{
					'bg-gray-100 hover:bg-gray-100': !isActive && !someTabSelected,
					'z-40 shadow-2xl': isActive && someTabSelected
				}
			)}
			onClick={e => {
				if (compactMode) {
					e.preventDefault()
					e.stopPropagation()
					onClick()
				} else {
					const target = e.target as HTMLElement
					const isInputClick = target.tagName === 'INPUT'

					if (!isInputClick) {
						e.preventDefault()
						e.stopPropagation()
						onClick()
					}
				}
			}}
		>
			<Typography
				variant={TypographyVariant.H4}
				size={TypographySize.LG}
				className={clsx(
					'text-muted-foreground font-medium transition-all duration-300'
				)}
				fontFamily={TypographyFontFamily.CAIRO}
			>
				{label}
			</Typography>
			{!compactMode && (
				<>
					{isPriceField ? (
						<input
							ref={inputRef}
							type="text"
							value={priceInputValue}
							onChange={handlePriceInputChange}
							onBlur={handlePriceInputBlur}
							onKeyDown={handlePriceInputKeyDown}
							placeholder={placeholder}
							className="font-cairo text-start transition-all duration-300 ease-in-out focus:ring-0 focus:ring-offset-0 focus:outline-none"
							autoComplete="off"
							onClick={e => {
								e.stopPropagation()
							}}
						/>
					) : (
						<input
							ref={inputRef}
							type="text"
							value={getCurrentValue()}
							onChange={handleInputChange}
							placeholder={placeholder}
							className="font-cairo transition-all duration-300 ease-in-out focus:ring-0 focus:ring-offset-0 focus:outline-none"
							autoComplete="off"
							onClick={e => {
								e.stopPropagation()
							}}
						/>
					)}
				</>
			)}
		</button>
	)
}
