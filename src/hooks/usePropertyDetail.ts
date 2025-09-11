'use client'

import { useState, useEffect } from 'react'
import { PropertyDetail } from '@/types/property.types'
import propertyDetailMock from '@/lib/property_detail_mock.json'

interface UsePropertyDetailProps {
	slug: string
}

interface UsePropertyDetailReturn {
	property: PropertyDetail | null
	isLoading: boolean
	error: string | null
}

export const usePropertyDetail = ({
	slug
}: UsePropertyDetailProps): UsePropertyDetailReturn => {
	const [property, setProperty] = useState<PropertyDetail | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPropertyDetail = async () => {
			try {
				setIsLoading(true)
				setError(null)

				// Simulate API delay (1.5-2.5 seconds)
				const delay = Math.random() * 1000 + 1500
				await new Promise(resolve => setTimeout(resolve, delay))

				// For now, we'll return the mock data regardless of slug
				// In a real implementation, this would fetch by slug from an API
				if (slug) {
					setProperty(propertyDetailMock as PropertyDetail)
				} else {
					setError('Property not found')
				}
			} catch (err) {
				console.error(err)
				setError('Failed to load property details')
			} finally {
				setIsLoading(false)
			}
		}

		fetchPropertyDetail()
	}, [slug])

	return {
		property,
		isLoading,
		error
	}
}
