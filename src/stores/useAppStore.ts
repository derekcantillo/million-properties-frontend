import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User, SearchFilters } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;

  // UI state
  isLoading: boolean;
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;

  // Search state
  searchFilters: SearchFilters;
  searchResults: unknown[];

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  setSearchResults: (results: unknown[]) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  theme: 'system' as const,
  sidebarOpen: false,
  searchFilters: {
    propertyTypes: [],
    locations: [],
    features: [],
  },
  searchResults: [],
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        ...initialState,

        setUser: user =>
          set({ user, isAuthenticated: !!user }, false, 'setUser'),

        setLoading: isLoading => set({ isLoading }, false, 'setLoading'),

        setTheme: theme => set({ theme }, false, 'setTheme'),

        toggleSidebar: () =>
          set(
            state => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            'toggleSidebar'
          ),

        setSearchFilters: filters =>
          set(
            state => ({
              searchFilters: { ...state.searchFilters, ...filters },
            }),
            false,
            'setSearchFilters'
          ),

        setSearchResults: searchResults =>
          set({ searchResults }, false, 'setSearchResults'),

        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'app-storage',
        partialize: state => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme,
          searchFilters: state.searchFilters,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);
