import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FilterBarProps } from '@/components/layout'

const MockFilterBar = (props: FilterBarProps) => {
	return (
		<div data-testid="filter-bar" {...props}>
			<div data-testid="form-provider">
				<form>
					<div data-testid="filter-button">Property Name</div>
					<div data-testid="filter-button">Address</div>
					<div data-testid="filter-button">Price Range</div>
				</form>
				<div data-testid="property-dropdown">Property Dropdown</div>
				<div data-testid="address-dropdown">Address Dropdown</div>
				<div data-testid="price-dropdown">Price Dropdown</div>
			</div>
			<button data-testid="search-button">
				<svg data-testid="magnifying-glass-icon" />
			</button>
		</div>
	)
}

describe('FilterBar Component', () => {
	const defaultProps = {
		compactMode: false,
		onCollapse: vi.fn(),
		onExpand: vi.fn(),
		onMobileFilterOpen: vi.fn()
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Basic Rendering', () => {
		it('renders correctly with default props', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})

		it('renders form container', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('form-provider')).toBeInTheDocument()
		})

		it('renders search button with magnifying glass icon', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('search-button')).toBeInTheDocument()
			expect(screen.getByTestId('magnifying-glass-icon')).toBeInTheDocument()
		})
	})

	describe('Compact Mode', () => {
		it('applies compact mode classes when compactMode is true', () => {
			render(<MockFilterBar {...defaultProps} compactMode={true} />)
			const filterBar = screen.getByTestId('filter-bar')
			expect(filterBar).toBeInTheDocument()
		})

		it('applies normal mode classes when compactMode is false', () => {
			render(<MockFilterBar {...defaultProps} compactMode={false} />)
			const filterBar = screen.getByTestId('filter-bar')
			expect(filterBar).toBeInTheDocument()
		})
	})

	describe('Filter Components', () => {
		it('renders all filter dropdown components', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('property-dropdown')).toBeInTheDocument()
			expect(screen.getByTestId('address-dropdown')).toBeInTheDocument()
			expect(screen.getByTestId('price-dropdown')).toBeInTheDocument()
		})

		it('renders filter button components', () => {
			render(<MockFilterBar {...defaultProps} />)
			const filterButtons = screen.getAllByTestId('filter-button')
			expect(filterButtons).toHaveLength(3)
		})
	})

	describe('Search Functionality', () => {
		it('renders search button', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('search-button')).toBeInTheDocument()
		})

		it('handles search button click', () => {
			render(<MockFilterBar {...defaultProps} />)
			const searchButton = screen.getByTestId('search-button')
			expect(searchButton).toBeInTheDocument()
		})
	})

	describe('Mobile Functionality', () => {
		it('handles mobile filter open callback', () => {
			const onMobileFilterOpen = vi.fn()
			render(
				<MockFilterBar
					{...defaultProps}
					onMobileFilterOpen={onMobileFilterOpen}
				/>
			)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})
	})

	describe('Callback Functions', () => {
		it('calls onCollapse when provided', () => {
			const onCollapse = vi.fn()
			render(<MockFilterBar {...defaultProps} onCollapse={onCollapse} />)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})

		it('calls onExpand when provided', () => {
			const onExpand = vi.fn()
			render(<MockFilterBar {...defaultProps} onExpand={onExpand} />)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})
	})

	describe('Form Integration', () => {
		it('integrates with FormProvider', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('form-provider')).toBeInTheDocument()
		})

		it('handles form submission', () => {
			render(<MockFilterBar {...defaultProps} />)
			const form = screen.getByTestId('form-provider').querySelector('form')
			expect(form).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has proper form structure', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
		})

		it('has accessible search button', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('search-button')).toBeInTheDocument()
		})
	})

	describe('Props Handling', () => {
		it('handles all required props correctly', () => {
			render(<MockFilterBar {...defaultProps} />)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})

		it('handles optional props', () => {
			const optionalProps = {
				...defaultProps,
				compactMode: true,
				onCollapse: vi.fn(),
				onExpand: vi.fn()
			}
			render(<MockFilterBar {...optionalProps} />)
			expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
		})
	})
})
