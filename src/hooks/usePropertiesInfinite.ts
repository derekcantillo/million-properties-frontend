'use client'

import { PaginatedProperties, Property } from '@/types/property.types'
import { useCallback, useEffect, useState } from 'react'

// Import the mock data
import mockData from '@/lib/properties_pagination_mock.json'

interface UsePropertiesInfiniteReturn {
	properties: Property[]
	loading: boolean
	hasNextPage: boolean
	error: string | null
	loadMore: () => void
	refresh: () => void
}

// Simulate API delay
const simulateApiDelay = (ms: number = 1500) =>
	new Promise(resolve => setTimeout(resolve, ms))

export const usePropertiesInfinite = (): UsePropertiesInfiniteReturn => {
	const [properties, setProperties] = useState<Property[]>([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [hasNextPage, setHasNextPage] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [initialLoad, setInitialLoad] = useState(true)

	// Type assertion for the mock data
	const paginatedData = mockData as PaginatedProperties[]

	const loadPage = useCallback(
		async (page: number) => {
			if (page >= paginatedData.length) {
				setHasNextPage(false)
				return []
			}

			setLoading(true)
			setError(null)

			try {
				// Simulate API call
				await simulateApiDelay(initialLoad ? 2000 : 1000)

				const pageData = paginatedData[page]
				if (!pageData) {
					setHasNextPage(false)
					return []
				}
				setHasNextPage(pageData.hasNextPage)

				return pageData.data
			} catch {
				setError('Failed to load properties')
				return []
			} finally {
				setLoading(false)
				setInitialLoad(false)
			}
		},
		[paginatedData, initialLoad]
	)

	const loadMore = useCallback(async () => {
		if (loading || !hasNextPage) return

		const newProperties = await loadPage(currentPage + 1)
		if (newProperties.length > 0) {
			setProperties(prev => [...prev, ...newProperties])
			setCurrentPage(prev => prev + 1)
		}
	}, [currentPage, hasNextPage, loading, loadPage])

	const refresh = useCallback(async () => {
		setProperties([])
		setCurrentPage(0)
		setHasNextPage(true)
		setError(null)
		setInitialLoad(true)

		const newProperties = await loadPage(0)
		setProperties(newProperties)
		setCurrentPage(0)
	}, [loadPage])

	// Load initial data
	useEffect(() => {
		if (properties.length === 0 && !loading) {
			loadPage(0).then(newProperties => {
				setProperties(newProperties)
				setCurrentPage(0)
			})
		}
	}, [properties.length, loading, loadPage])

	return {
		properties,
		loading,
		hasNextPage,
		error,
		loadMore,
		refresh
	}
}
