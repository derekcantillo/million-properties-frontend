export interface PagedResult<T> {
	data: T[]
	total: number
	page: number
	pageSize: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
	isLastPage: boolean
}

export type GetPropertiesResponse = PagedResult<PropertyByAllResponse>

export interface PropertyByAllResponse {
	id: string
	idOwner: string
	name: string
	addressProperty: string
	priceProperty: number
	codeInternal: string
	year: number
	owner: Owner
	images: Image[]
	traces: Trace[]
}

export interface Image {
	idPropertyImage: string
	idProperty: string
	file: string
	enabled: boolean
}

export interface Owner {
	idOwner: string
	name: string
	address: string
	photo: string
	birthday: Date
}

export interface Trace {
	idPropertyTrace: string
	idProperty: string
	dateSale: Date
	name: string
	value: number
	tax: number
}

export interface GetPropertiesParams {
	name?: string
	address?: string
	minPrice?: number
	maxPrice?: number
	page?: number
	pageSize?: number
	sortBy?: SortBy
	sortDir?: SortOrder
}

export interface GetPropertyByIDResponse {
	id: string
	idOwner: string
	name: string
	addressProperty: string
	priceProperty: number
	codeInternal: string
	year: number
	owner: Owner
	images: Image[]
	traces: Trace[]
}

export type SortBy = 'price' | 'name'

export type SortOrder = 'asc' | 'desc'
