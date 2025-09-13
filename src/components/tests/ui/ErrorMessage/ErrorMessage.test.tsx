import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorMessage } from '@/components/ui'

describe('ErrorMessage Component', () => {
	const mockProps = {
		buttonAction: vi.fn(),
		buttonText: 'Try Again',
		title: 'Something went wrong',
		description: 'An error occurred while processing your request.'
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders correctly with all props', () => {
		render(<ErrorMessage {...mockProps} />)

		expect(screen.getByText(mockProps.title)).toBeInTheDocument()
		expect(screen.getByText(mockProps.description)).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: mockProps.buttonText })
		).toBeInTheDocument()
	})

	it('displays the exclamation triangle icon', () => {
		render(<ErrorMessage {...mockProps} />)

		const icon = document.querySelector('svg')
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveClass('h-12', 'w-12', 'text-gray-600')
	})

	it('applies correct layout classes', () => {
		const { container } = render(<ErrorMessage {...mockProps} />)

		const wrapper = container.firstChild as HTMLElement
		expect(wrapper).toHaveClass(
			'flex',
			'min-h-[50vh]',
			'flex-col',
			'items-center',
			'justify-center',
			'py-12'
		)
	})

	it('calls buttonAction when button is clicked', async () => {
		const user = userEvent.setup()
		render(<ErrorMessage {...mockProps} />)

		const button = screen.getByRole('button', { name: mockProps.buttonText })
		await user.click(button)

		expect(mockProps.buttonAction).toHaveBeenCalledTimes(1)
	})

	it('renders with different text content', () => {
		const customProps = {
			...mockProps,
			title: 'Custom Error Title',
			description: 'Custom error description message',
			buttonText: 'Retry'
		}

		render(<ErrorMessage {...customProps} />)

		expect(screen.getByText('Custom Error Title')).toBeInTheDocument()
		expect(
			screen.getByText('Custom error description message')
		).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
	})

	it('button has correct styling classes', () => {
		render(<ErrorMessage {...mockProps} />)

		const button = screen.getByRole('button', { name: mockProps.buttonText })
		expect(button).toHaveClass(
			'bg-foreground',
			'hover:bg-foreground/90',
			'rounded-lg',
			'px-4',
			'py-2',
			'text-white',
			'transition-colors'
		)
	})

	it('renders Typography components with correct props', () => {
		render(<ErrorMessage {...mockProps} />)

		// Check if title is rendered as h1 element (Typography with XL2 size)
		const titleElement = screen.getByText(mockProps.title)
		expect(titleElement.tagName).toBe('P') // Typography defaults to paragraph

		// Check if description is rendered
		const descriptionElement = screen.getByText(mockProps.description)
		expect(descriptionElement).toBeInTheDocument()
	})

	it('handles multiple button clicks correctly', async () => {
		const user = userEvent.setup()
		render(<ErrorMessage {...mockProps} />)

		const button = screen.getByRole('button', { name: mockProps.buttonText })

		await user.click(button)
		await user.click(button)
		await user.click(button)

		expect(mockProps.buttonAction).toHaveBeenCalledTimes(3)
	})

	it('is accessible with proper button role', () => {
		render(<ErrorMessage {...mockProps} />)

		const button = screen.getByRole('button', { name: mockProps.buttonText })
		expect(button).toBeEnabled()
		// Button component uses default button behavior, no explicit type attribute needed
		expect(button).toBeInTheDocument()
	})
})
