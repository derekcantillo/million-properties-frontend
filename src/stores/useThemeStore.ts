'use client'

import React from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeState {
	theme: Theme
	resolvedTheme: ResolvedTheme
	systemTheme: ResolvedTheme
	setTheme: (theme: Theme) => void
	initializeTheme: () => void
	updateSystemTheme: (systemTheme: ResolvedTheme) => void
}

const applyTheme = (resolvedTheme: ResolvedTheme) => {
	if (typeof window === 'undefined') return

	const root = document.documentElement
	const isDark = resolvedTheme === 'dark'

	// Toggle dark class
	root.classList.toggle('dark', isDark)
	root.classList.toggle('light', !isDark)

	// Update CSS variables
	if (isDark) {
		root.style.setProperty('--background', '#0f171f')
		root.style.setProperty('--foreground', '#ffffff')
	} else {
		root.style.setProperty('--background', '#ffffff')
		root.style.setProperty('--foreground', '#0f171f')
	}
}

const getSystemTheme = (): ResolvedTheme => {
	if (typeof window === 'undefined') return 'light'
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

const resolveTheme = (
	theme: Theme,
	systemTheme: ResolvedTheme
): ResolvedTheme => {
	return theme === 'system' ? systemTheme : theme
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: 'light',
			resolvedTheme: 'light',
			systemTheme: 'light',

			setTheme: (theme: Theme) => {
				const { systemTheme } = get()
				const resolvedTheme = resolveTheme(theme, systemTheme)

				applyTheme(resolvedTheme)

				set({ theme, resolvedTheme })
			},

			initializeTheme: () => {
				if (typeof window === 'undefined') return

				const systemTheme = getSystemTheme()
				const { theme } = get()
				const resolvedTheme = resolveTheme(theme, systemTheme)

				// Only apply theme if it hasn't been initialized by the script
				if (!document.documentElement.dataset.themeInitialized) {
					applyTheme(resolvedTheme)
				}

				set({ systemTheme, resolvedTheme })

				// Listen for system theme changes
				const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
				const handleSystemThemeChange = (e: MediaQueryListEvent) => {
					const newSystemTheme = e.matches ? 'dark' : 'light'
					get().updateSystemTheme(newSystemTheme)
				}

				mediaQuery.addEventListener('change', handleSystemThemeChange)

				// Cleanup function is not directly available in Zustand,
				// but we can store it in window for cleanup if needed
				;(window as unknown as Record<string, unknown>).__themeCleanup = () => {
					mediaQuery.removeEventListener('change', handleSystemThemeChange)
				}
			},

			updateSystemTheme: (systemTheme: ResolvedTheme) => {
				const { theme } = get()
				const resolvedTheme = resolveTheme(theme, systemTheme)

				if (theme === 'system') {
					applyTheme(resolvedTheme)
				}

				set({ systemTheme, resolvedTheme })
			}
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => {
				// Only use localStorage on client side
				if (typeof window !== 'undefined') {
					return localStorage
				}
				// Return a mock storage for SSR
				return {
					getItem: () => null,
					setItem: () => {
						// Mock implementation for SSR
					},
					removeItem: () => {
						// Mock implementation for SSR
					}
				}
			}),
			partialize: state => ({ theme: state.theme }) // Only persist theme, not resolved values
		}
	)
)

// Hook for easier usage
export const useTheme = () => {
	const store = useThemeStore()

	// Initialize theme on first use (client-side only)
	React.useEffect(() => {
		store.initializeTheme()
	}, [])

	return {
		theme: store.theme,
		resolvedTheme: store.resolvedTheme,
		systemTheme: store.systemTheme,
		setTheme: store.setTheme
	}
}
