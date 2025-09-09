// Global types for the application

export interface ApiResponse<T = unknown> {
	data: T
	message: string
	success: boolean
	status: number
}

export interface ApiError {
	message: string
	code: string
	status: number
	details?: Record<string, unknown>
}

export interface PaginationParams {
	page: number
	limit: number
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number
		limit: number
		total: number
		totalPages: number
		hasNext: boolean
		hasPrev: boolean
	}
}

// Property types for the real estate application
export interface Property {
	id: string
	title: string
	description: string
	price: number
	currency: string
	type: PropertyType
	status: PropertyStatus
	location: Location
	features: PropertyFeature[]
	images: PropertyImage[]
	createdAt: string
	updatedAt: string
}

export type PropertyType =
	| 'apartment'
	| 'house'
	| 'condo'
	| 'townhouse'
	| 'land'
	| 'commercial'
export type PropertyStatus =
	| 'available'
	| 'sold'
	| 'rented'
	| 'pending'
	| 'off-market'

export interface Location {
	address: string
	city: string
	state: string
	country: string
	zipCode: string
	coordinates: {
		lat: number
		lng: number
	}
}

export interface PropertyFeature {
	id: string
	name: string
	value: string | number
	category: 'basic' | 'amenities' | 'utilities' | 'security'
}

export interface PropertyImage {
	id: string
	url: string
	alt: string
	isPrimary: boolean
	order: number
}

// User types
export interface User {
	id: string
	email: string
	name: string
	avatar?: string
	role: UserRole
	preferences: UserPreferences
	createdAt: string
	updatedAt: string
}

export type UserRole = 'admin' | 'agent' | 'client' | 'guest'

export interface UserPreferences {
	language: string
	currency: string
	notifications: {
		email: boolean
		push: boolean
		sms: boolean
	}
	searchFilters: SearchFilters
}

export interface SearchFilters {
	minPrice?: number
	maxPrice?: number
	propertyTypes: PropertyType[]
	locations: string[]
	features: string[]
}

// Export property types for the mock data structure
export * from './property.types'
