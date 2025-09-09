// Property types that match the mock JSON structure
export interface PropertyImage {
	idPropertyImage: string
	idProperty: string
	file: string
	enabled: boolean
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
}
