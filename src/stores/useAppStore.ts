import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User, SearchFilters } from '@/types'

interface AppState {
	// User state
	user: User | null
	isAuthenticated: boolean

	// UI state
	isLoading: boolean
	sidebarOpen: boolean

	// Search state
	searchFilters: SearchFilters
	searchResults: unknown[]

	// Actions
	setUser: (user: User | null) => void
	setLoading: (loading: boolean) => void
	toggleSidebar: () => void
	setSearchFilters: (filters: Partial<SearchFilters>) => void
	setSearchResults: (results: unknown[]) => void
	reset: () => void
}

const initialState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	sidebarOpen: false,
	searchFilters: {
		propertyTypes: [],
		locations: [],
		features: []
	},
	searchResults: []
}

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			set => ({
				...initialState,

				setUser: user =>
					set({ user, isAuthenticated: !!user }, false, 'setUser'),

				setLoading: isLoading => set({ isLoading }, false, 'setLoading'),

				toggleSidebar: () =>
					set(
						state => ({ sidebarOpen: !state.sidebarOpen }),
						false,
						'toggleSidebar'
					),

				setSearchFilters: filters =>
					set(
						state => ({
							searchFilters: { ...state.searchFilters, ...filters }
						}),
						false,
						'setSearchFilters'
					),

				setSearchResults: searchResults =>
					set({ searchResults }, false, 'setSearchResults'),

				reset: () => set(initialState, false, 'reset')
			}),
			{
				name: 'app-storage',
				partialize: state => ({
					user: state.user,
					isAuthenticated: state.isAuthenticated,
					searchFilters: state.searchFilters
				})
			}
		),
		{
			name: 'app-store'
		}
	)
)
