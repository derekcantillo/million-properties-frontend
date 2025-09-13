import { PropertyImage, PropertyOwner, PropertyTrace } from '@/api'

export interface PropertyDetail {
	id: string
	name: string
	addressProperty: string
	priceProperty: number
	year: number
	codeInternal: string
	description: string
	propertyType: string
	status: string
	bedrooms: number
	bathrooms: number
	areaSqFt: number
	parkingSpaces: number
	images: PropertyImage[]
	owner: PropertyOwner
	traces: PropertyTrace[]
	createdAt: string
	updatedAt: string
}

export interface UsePropertyDetailProps {
	slug: string
}

export interface UsePropertyDetailReturn {
	property: PropertyDetail | null
	isLoading: boolean
	error: string | null
}
