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

				const delay = Math.random() * 1000 + 1500
				await new Promise(resolve => setTimeout(resolve, delay))

				if (slug) {
					setProperty(propertyDetailMock as PropertyDetail)
				} else {
					setError('Property not found')
				}
			} catch (err) {
				setError('Failed to load property details')
				throw err
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
