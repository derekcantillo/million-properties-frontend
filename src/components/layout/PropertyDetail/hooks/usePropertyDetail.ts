'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPropertyById } from '@/api/properties/services'
import { QUERY_KEYS, type GetPropertyByIDResponse } from '@/api'
import {
	type PropertyDetail,
	UsePropertyDetailProps,
	UsePropertyDetailReturn
} from '@/components/layout'

const mapApiToUiDetail = (api: GetPropertyByIDResponse): PropertyDetail => {
	return {
		id: api.id,
		name: api.name,
		addressProperty: api.addressProperty,
		priceProperty: api.priceProperty,
		year: api.year,
		codeInternal: api.codeInternal,
		description: '',
		propertyType: 'N/A',
		status: 'N/A',
		bedrooms: 3,
		bathrooms: 2,
		areaSqFt: 1450,
		parkingSpaces: 0,
		images: api.images,
		owner: {
			idOwner: api.owner.idOwner,
			name: api.owner.name,
			address: api.owner.address,
			photo: api.owner.photo,
			birthday: new Date(api.owner.birthday)
		},
		traces: api.traces.map(t => ({
			idPropertyTrace: t.idPropertyTrace,
			dateSale: new Date(t.dateSale),
			idProperty: t.idProperty,
			name: t.name,
			value: t.value,
			tax: t.tax
		})),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
}

export const usePropertyDetail = ({
	slug
}: UsePropertyDetailProps): UsePropertyDetailReturn => {
	const enabled = Boolean(slug)

	const query = useQuery<GetPropertyByIDResponse, Error>({
		queryKey: [...QUERY_KEYS.properties.detail(slug)],
		queryFn: async () => await getPropertyById(slug),
		enabled,
		staleTime: 0,
		refetchOnMount: 'always'
	})

	const property = useMemo(() => {
		if (!query.data) return null
		return mapApiToUiDetail(query.data)
	}, [query.data])

	return {
		property,
		isLoading: query.isLoading || query.isFetching,
		error: query.error?.message ?? null
	}
}
