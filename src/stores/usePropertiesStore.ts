import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
	GetPropertiesParams,
	PropertyByAllResponse
} from '@/api/properties/types'

export type PropertiesFilters = Omit<GetPropertiesParams, 'page' | 'pageSize'>

interface PropertiesState {
	filters: PropertiesFilters
	properties: PropertyByAllResponse[]
	setFilters: (filters: Partial<PropertiesFilters> | PropertiesFilters) => void
	resetFilters: () => void
	setProperties: (properties: PropertyByAllResponse[]) => void
	clearProperties: () => void
}

const initialFilters = {} as PropertiesFilters

export const usePropertiesStore = create<PropertiesState>()(
	devtools(
		set => ({
			filters: initialFilters,
			properties: [],
			setFilters: filters =>
				set(
					state => ({ filters: { ...state.filters, ...filters } }),
					false,
					'setFilters'
				),
			resetFilters: () =>
				set({ filters: initialFilters }, false, 'resetFilters'),
			setProperties: properties => set({ properties }, false, 'setProperties'),
			clearProperties: () => set({ properties: [] }, false, 'clearProperties')
		}),
		{ name: 'properties-store' }
	)
)
