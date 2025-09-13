import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer/Footer'
import '@testing-library/jest-dom'

vi.mock('next-intl', () => ({
	useTranslations: vi.fn(() => (key: string) => {
		const translations: Record<string, string> = {
			developedBy: 'Developed By',
			developer: 'Derek Cantillo',
			position: 'Fullstack Developer',
			location: 'Colombia',
			technicalTest: 'Technical Test',
			projectName: 'Million Properties Frontend',
			projectDescription: 'Real estate platform built with modern technologies',
			contact: 'Contact',
			email: 'cantilloderek@gmail.com',
			linkedin: 'LinkedIn Profile',
			github: 'GitHub Profile',
			copyright: '© 2024 Million Properties. All rights reserved.',
			viewSourceCode: 'View Source Code',
			documentation: 'Documentation',
			'technologies.nextjs': 'Next.js',
			'technologies.react': 'React',
			'technologies.typescript': 'TypeScript',
			'technologies.tailwind': 'Tailwind CSS'
		}
		return translations[key] || key
	})
}))

vi.mock('@/components/ui', () => ({
	Typography: vi.fn(
		({ children, variant, fontFamily, className, ...props }) => (
			<span
				className={className}
				data-variant={variant}
				data-font-family={fontFamily}
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
		PARAGRAPH: 'p',
		SMALL: 'small',
		SPAN: 'span'
	},
	TypographyFontFamily: {
		CAIRO: 'cairo'
	}
}))

vi.mock('next/link', () => ({
	default: vi.fn(({ children, href, target, rel, className, ...props }) => (
		<a href={href} target={target} rel={rel} className={className} {...props}>
			{children}
		</a>
	))
}))

vi.mock('@heroicons/react/24/outline', () => ({
	EnvelopeIcon: ({ className }: { className?: string }) => (
		<svg className={className} data-testid="envelope-icon">
			<path />
		</svg>
	),
	MapPinIcon: ({ className }: { className?: string }) => (
		<svg className={className} data-testid="map-pin-icon">
			<path />
		</svg>
	)
}))

describe('Footer Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Basic Rendering', () => {
		it('renders correctly with semantic footer element', () => {
			render(<Footer />)

			expect(screen.getByRole('contentinfo')).toBeInTheDocument()
		})

		it('renders main sections correctly', () => {
			render(<Footer />)

			expect(screen.getByText('Developed By')).toBeInTheDocument()
			expect(screen.getByText('Technical Test')).toBeInTheDocument()
			expect(screen.getByText('Contact')).toBeInTheDocument()
		})

		it('applies correct footer structure classes', () => {
			render(<Footer />)

			const footer = screen.getByRole('contentinfo')
			expect(footer).toHaveClass(
				'border-border',
				'bg-background',
				'relative',
				'z-10',
				'mt-auto',
				'border-t'
			)
		})
	})

	describe('Developer Information Section', () => {
		it('displays developer information correctly', () => {
			render(<Footer />)

			expect(screen.getByText('Developed By')).toBeInTheDocument()
			expect(screen.getByText('Derek Cantillo')).toBeInTheDocument()
			expect(screen.getByText('Fullstack Developer')).toBeInTheDocument()
			expect(screen.getByText('Colombia')).toBeInTheDocument()
		})

		it('renders map pin icon for location', () => {
			render(<Footer />)

			expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument()
			expect(screen.getByTestId('map-pin-icon')).toHaveClass('h-4', 'w-4')
		})

		it('applies correct Typography variants for developer section', () => {
			render(<Footer />)

			const sectionTitle = screen.getByText('Developed By')
			expect(sectionTitle).toHaveAttribute('data-variant', 'h3')
			expect(sectionTitle).toHaveAttribute('data-font-family', 'cairo')
		})
	})

	describe('Project Information Section', () => {
		it('displays project information correctly', () => {
			render(<Footer />)

			expect(screen.getByText('Technical Test')).toBeInTheDocument()
			expect(
				screen.getByText('Million Properties Frontend')
			).toBeInTheDocument()
			expect(
				screen.getByText('Real estate platform built with modern technologies')
			).toBeInTheDocument()
		})

		it('renders technology badges correctly', () => {
			render(<Footer />)

			expect(screen.getByText('Next.js')).toBeInTheDocument()
			expect(screen.getByText('React')).toBeInTheDocument()
			expect(screen.getByText('TypeScript')).toBeInTheDocument()
			expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
		})

		it('applies correct styling to technology badges', () => {
			render(<Footer />)

			const nextJsBadge = screen.getByText('Next.js')
			expect(nextJsBadge).toHaveClass(
				'bg-primary/10',
				'text-primary',
				'inline-flex',
				'items-center',
				'rounded-full',
				'px-2',
				'py-1',
				'text-xs',
				'font-medium'
			)
		})
	})

	describe('Contact Section', () => {
		it('displays contact information correctly', () => {
			render(<Footer />)

			expect(screen.getByText('Contact')).toBeInTheDocument()
			expect(screen.getByText('cantilloderek@gmail.com')).toBeInTheDocument()
			expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument()
			expect(screen.getByText('GitHub Profile')).toBeInTheDocument()
		})

		it('renders contact icons correctly', () => {
			render(<Footer />)

			expect(screen.getByTestId('envelope-icon')).toBeInTheDocument()
			expect(screen.getByTestId('envelope-icon')).toHaveClass('h-4', 'w-4')
		})

		it('renders email link with correct attributes', () => {
			render(<Footer />)

			const emailLink = screen.getByRole('link', {
				name: /cantilloderek@gmail.com/i
			})
			expect(emailLink).toHaveAttribute(
				'href',
				'mailto:cantilloderek@gmail.com'
			)
			expect(emailLink).toHaveClass(
				'text-muted-foreground',
				'font-cairo',
				'hover:text-foreground',
				'pointer-events-auto',
				'flex',
				'cursor-pointer',
				'items-center',
				'space-x-2',
				'text-sm',
				'transition-colors'
			)
		})

		it('renders LinkedIn link with correct attributes', () => {
			render(<Footer />)

			const linkedinLink = screen.getByRole('link', {
				name: /LinkedIn Profile/i
			})
			expect(linkedinLink).toHaveAttribute(
				'href',
				'https://www.linkedin.com/in/derek-cantillo/'
			)
			expect(linkedinLink).toHaveAttribute('target', '_blank')
			expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
		})

		it('renders GitHub link with correct attributes', () => {
			render(<Footer />)

			const githubLink = screen.getByRole('link', { name: /GitHub Profile/i })
			expect(githubLink).toHaveAttribute(
				'href',
				'https://github.com/derekcantillo'
			)
			expect(githubLink).toHaveAttribute('target', '_blank')
			expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
		})
	})

	describe('Copyright and Bottom Links Section', () => {
		it('displays copyright information', () => {
			render(<Footer />)

			expect(
				screen.getByText('© 2024 Million Properties. All rights reserved.')
			).toBeInTheDocument()
		})

		it('renders bottom navigation links', () => {
			render(<Footer />)

			const sourceCodeLink = screen.getByRole('link', {
				name: /View Source Code/i
			})
			expect(sourceCodeLink).toHaveAttribute(
				'href',
				'https://github.com/derek/million-properties-frontend'
			)
			expect(sourceCodeLink).toHaveAttribute('target', '_blank')
			expect(sourceCodeLink).toHaveAttribute('rel', 'noopener noreferrer')

			const docsLink = screen.getByRole('link', { name: /Documentation/i })
			expect(docsLink).toHaveAttribute('href', '/docs')
		})

		it('applies correct bottom section styling', () => {
			render(<Footer />)

			const bottomSection = screen
				.getByText('© 2024 Million Properties. All rights reserved.')
				.closest('div')?.parentElement
			expect(bottomSection).toHaveClass(
				'border-border',
				'mt-8',
				'border-t',
				'pt-6'
			)
		})
	})

	describe('Responsive Layout', () => {
		it('applies correct grid layout classes', () => {
			render(<Footer />)

			const gridContainer = screen
				.getByRole('contentinfo')
				.querySelector('.grid')
			expect(gridContainer).toHaveClass(
				'grid',
				'grid-cols-1',
				'gap-8',
				'md:grid-cols-3'
			)
		})

		it('applies responsive container classes', () => {
			render(<Footer />)

			const container = screen.getByRole('contentinfo').firstChild
			expect(container).toHaveClass(
				'mx-auto',
				'max-w-7xl',
				'px-4',
				'py-8',
				'sm:px-6',
				'lg:px-8'
			)
		})

		it('applies responsive bottom section layout', () => {
			render(<Footer />)

			const bottomLayout = screen
				.getByText('© 2024 Million Properties. All rights reserved.')
				.closest('.flex')
			expect(bottomLayout).toHaveClass(
				'flex',
				'flex-col',
				'items-center',
				'justify-between',
				'space-y-2',
				'sm:flex-row',
				'sm:space-y-0'
			)
		})
	})

	describe('Typography Integration', () => {
		it('uses correct Typography variants for different content types', () => {
			render(<Footer />)

			const sectionTitles = screen.getAllByText(
				/Developed By|Technical Test|Contact/
			)
			sectionTitles.forEach(title => {
				expect(title).toHaveAttribute('data-variant', 'h3')
				expect(title).toHaveAttribute('data-font-family', 'cairo')
			})
		})

		it('applies correct text styling classes', () => {
			render(<Footer />)

			const sectionTitle = screen.getByText('Developed By')
			expect(sectionTitle).toHaveClass('text-foreground')
		})
	})

	describe('Accessibility', () => {
		it('uses semantic footer element', () => {
			render(<Footer />)

			expect(screen.getByRole('contentinfo')).toBeInTheDocument()
		})

		it('has accessible external links with proper rel attributes', () => {
			render(<Footer />)

			const externalLinks = screen.getAllByRole('link', {
				name: /LinkedIn Profile|GitHub Profile|View Source Code/i
			})

			externalLinks.forEach(link => {
				expect(link).toHaveAttribute('target', '_blank')
				expect(link).toHaveAttribute('rel', 'noopener noreferrer')
			})
		})

		it('maintains proper heading hierarchy', () => {
			render(<Footer />)

			const headings = screen.getAllByText(
				/Developed By|Technical Test|Contact/
			)
			headings.forEach(heading => {
				expect(heading).toHaveAttribute('data-variant', 'h3')
			})
		})
	})

	describe('Internationalization', () => {
		it('uses translation keys correctly', () => {
			render(<Footer />)

			// Verify that the component renders correctly with translations
			expect(screen.getByText('Developed By')).toBeInTheDocument()
		})

		it('displays translated content', () => {
			render(<Footer />)

			expect(screen.getByText('Developed By')).toBeInTheDocument()
			expect(screen.getByText('Derek Cantillo')).toBeInTheDocument()
			expect(screen.getByText('Technical Test')).toBeInTheDocument()
			expect(screen.getByText('Contact')).toBeInTheDocument()
		})
	})
})
