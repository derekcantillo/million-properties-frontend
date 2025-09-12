import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { SortState, SortType, SortDirection } from '@/components/layout'
import { usePropertiesInfinite } from '@/hooks/usePropertiesInfinite'

export const useProperties = () => {
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

	const {
		properties,
		loading,
		error,
		refetch: refetchProperties,
		loadMoreRef,
		isFetchingNextPage
	} = usePropertiesInfinite({ pageSize: 12 })

	const refresh = () => {
		void refetchProperties()
	}

	const sortedProperties = useMemo(() => {
		const items = [...properties]
		const { price, name } = sortState

		if (price) {
			items.sort((a, b) =>
				price === 'asc'
					? a.priceProperty - b.priceProperty
					: b.priceProperty - a.priceProperty
			)
		}

		if (name) {
			items.sort((a, b) => {
				const result = a.name.localeCompare(b.name)
				return name === 'asc' ? result : -result
			})
		}

		return items
	}, [properties, sortState])

	const handleSortClick = (sortType: SortType): void => {
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

	const handleFloatingMenuToggle = (): void => {
		setShowFloatingMenu(!showFloatingMenu)
	}

	const getGridClasses = (): string => {
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

	const handleColumnsPerRow = (columns: number): void => {
		setColumnsPerRow(columns)
	}

	const handleShowViewDropdown = (): void => {
		setShowViewDropdown(showViewDropdown => !showViewDropdown)
	}

	return {
		// data
		properties,
		sortedProperties,
		loading: loading || isFetchingNextPage,
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
		floatingMenuRef,
		sortState,
		showFloatingButton,
		showFloatingMenu,
		handleShowViewDropdown,
		loadMoreRef
	}
}
