import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

vi.mock('@/components/ui', () => ({
	Typography: vi.fn(
		({
			children,
			variant,
			fontFamily,
			weight,
			textColor,
			className,
			...props
		}) => (
			<span
				className={className}
				data-variant={variant}
				data-font-family={fontFamily}
				data-weight={weight}
				data-text-color={textColor}
				{...props}
			>
				{children}
			</span>
		)
	),
	TypographyVariant: {
		H1: 'h1',
		H2: 'h2',
		H3: 'h3',
		H4: 'h4',
		H5: 'h5',
		H6: 'h6',
		PARAGRAPH: 'p',
		SPAN: 'span'
	},
	TypographyFontFamily: {
		CAIRO: 'cairo',
		CINZEL: 'cinzel'
	},
	TypographyWeight: {
		NORMAL: 'normal',
		MEDIUM: 'medium',
		SEMIBOLD: 'semibold',
		BOLD: 'bold'
	},
	TypographyTextColor: {
		DEFAULT: 'default',
		WHITE: 'white',
		PRIMARY: 'primary',
		MUTED: 'muted'
	},
	SettingsDropdown: vi.fn(() => (
		<div data-testid="settings-dropdown">Settings Dropdown</div>
	))
}))

vi.mock('next/link', () => ({
	default: vi.fn(({ children, href, ...props }) => (
		<a href={href} {...props}>
			{children}
		</a>
	))
}))

vi.mock('clsx', () => ({
	default: vi.fn((...args) => {
		const classes: string[] = []
		args.forEach(arg => {
			if (typeof arg === 'string') {
				classes.push(arg)
			} else if (typeof arg === 'object' && arg !== null) {
				Object.entries(arg).forEach(([key, value]) => {
					if (value) classes.push(key)
				})
			}
		})
		return classes.join(' ')
	})
}))

import { Header } from '@/components/layout/Header/Header'

describe('Header Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Basic Rendering', () => {
		it('renders correctly with default props', () => {
			render(<Header />)

			expect(screen.getByRole('banner')).toBeInTheDocument()
			expect(screen.getByText('Million Properties')).toBeInTheDocument()
		})

		it('renders the brand link correctly', () => {
			render(<Header />)

			const brandLink = screen.getByRole('link')
			expect(brandLink).toHaveAttribute('href', '/')
			expect(brandLink).toContainElement(screen.getByText('Million Properties'))
		})

		it('renders Typography with correct props for brand', () => {
			render(<Header />)

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-variant', 'h4')
			expect(brandText).toHaveAttribute('data-font-family', 'cinzel')
			expect(brandText).toHaveAttribute('data-weight', 'bold')
		})
	})

	describe('Light Mode (isDark = false)', () => {
		it('renders settings dropdown in light mode', () => {
			render(<Header isDark={false} />)

			expect(screen.getByTestId('settings-dropdown')).toBeInTheDocument()
		})

		it('applies white text color in light mode', () => {
			render(<Header isDark={false} />)

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-text-color', 'white')
		})

		it('applies correct header classes for light mode', () => {
			render(<Header isDark={false} />)

			const header = screen.getByRole('banner')
			expect(header).toHaveClass(
				'relative',
				'z-60',
				'transition-all',
				'duration-300',
				'ease-in-out'
			)
		})

		it('applies correct container layout for light mode', () => {
			render(<Header isDark={false} />)

			const container = screen.getByRole('banner').firstChild
			expect(container).toHaveClass(
				'container',
				'mx-auto',
				'flex',
				'items-center',
				'gap-8',
				'px-4'
			)
		})
	})

	describe('Dark Mode (isDark = true)', () => {
		it('does not render settings dropdown in dark mode', () => {
			render(<Header isDark={true} />)

			expect(screen.queryByTestId('settings-dropdown')).not.toBeInTheDocument()
		})

		it('applies default text color in dark mode', () => {
			render(<Header isDark={true} />)

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-text-color', 'default')
		})

		it('applies correct header classes for dark mode', () => {
			render(<Header isDark={true} />)

			const header = screen.getByRole('banner')
			expect(header).toHaveClass(
				'relative',
				'z-60',
				'transition-all',
				'duration-300',
				'ease-in-out',
				'border-b',
				'border-gray-200',
				'bg-white',
				'py-4'
			)
		})

		it('centers content in dark mode', () => {
			render(<Header isDark={true} />)

			const container = screen.getByRole('banner').firstChild
			expect(container).toHaveClass('justify-center')
		})
	})

	describe('Responsive Design', () => {
		it('applies responsive classes correctly', () => {
			render(<Header />)

			const header = screen.getByRole('banner')
			expect(header).toHaveClass('relative', 'z-60')

			const container = header.firstChild
			expect(container).toHaveClass('container', 'mx-auto', 'px-4')
		})

		it('applies transition classes for smooth animations', () => {
			render(<Header />)

			const header = screen.getByRole('banner')
			expect(header).toHaveClass(
				'transition-all',
				'duration-300',
				'ease-in-out'
			)

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveClass(
				'transition-all',
				'duration-300',
				'ease-in-out'
			)
		})
	})

	describe('Accessibility', () => {
		it('uses semantic header element', () => {
			render(<Header />)

			expect(screen.getByRole('banner')).toBeInTheDocument()
		})

		it('has accessible brand link', () => {
			render(<Header />)

			const brandLink = screen.getByRole('link')
			expect(brandLink).toHaveAttribute('href', '/')
			expect(brandLink).toBeInTheDocument()
		})

		it('maintains proper heading hierarchy', () => {
			render(<Header />)

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-variant', 'h4')
		})
	})

	describe('Props Handling', () => {
		it('handles undefined isDark prop (defaults to false)', () => {
			render(<Header />)

			expect(screen.getByTestId('settings-dropdown')).toBeInTheDocument()

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-text-color', 'white')
		})

		it('handles isDark prop explicitly set to false', () => {
			render(<Header isDark={false} />)

			expect(screen.getByTestId('settings-dropdown')).toBeInTheDocument()

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-text-color', 'white')
		})

		it('handles isDark prop set to true', () => {
			render(<Header isDark={true} />)

			expect(screen.queryByTestId('settings-dropdown')).not.toBeInTheDocument()

			const brandText = screen.getByText('Million Properties')
			expect(brandText).toHaveAttribute('data-text-color', 'default')
		})
	})

	describe('CSS Classes Application', () => {
		it('applies conditional padding classes correctly', () => {
			const { rerender } = render(<Header isDark={false} />)

			let header = screen.getByRole('banner')
			expect(header).toHaveClass('py-6')
			expect(header).not.toHaveClass('py-4')

			rerender(<Header isDark={true} />)

			header = screen.getByRole('banner')
			expect(header).toHaveClass('py-4')
			expect(header).not.toHaveClass('py-6')
		})

		it('applies conditional layout classes correctly', () => {
			const { rerender } = render(<Header isDark={false} />)

			let container = screen.getByRole('banner').firstChild
			expect(container).toHaveClass('justify-between')
			expect(container).not.toHaveClass('justify-center')

			rerender(<Header isDark={true} />)

			container = screen.getByRole('banner').firstChild
			expect(container).toHaveClass('justify-center')
			expect(container).not.toHaveClass('justify-between')
		})
	})
})
