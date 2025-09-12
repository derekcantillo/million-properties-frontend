export type SortType = 'price' | 'name'

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
	price: SortDirection
	name: SortDirection
}
