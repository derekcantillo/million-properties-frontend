// Property types that match the mock JSON structure
export interface PropertyImage {
	idPropertyImage: string
	idProperty?: string
	file: string
	enabled: boolean
}

export interface PropertyOwner {
	idOwner: string
	name: string
	address: string
	photo: string
	birthday: string
}

export interface PropertyTrace {
	idPropertyTrace: string
	dateSale: string
	name: string
	value: number
	tax: number
}

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

export interface Property {
	id: string
	idOwner: string
	name: string
	addressProperty: string
	priceProperty: number
	images: PropertyImage[]
}

export interface PaginatedProperties {
	data: Property[]
	total: number
	page: number
	pageSize: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
	isLastPage: boolean
}

export interface PropertyItemProps {
	property: Property
	className?: string
	// layout hints
	columnsPerRow?: number
	isDesktop?: boolean
	listDensity?: 'compact' | 'comfortable'
}
