import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
	it('renders correctly with default props', () => {
		render(<Button>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent('Click me')
	})

	it('applies the correct default classes', () => {
		render(<Button>Default Button</Button>)

		const button = screen.getByRole('button')
		expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
		expect(button).toHaveClass('rounded-md', 'text-sm', 'font-medium')
		expect(button).toHaveClass('h-10', 'py-2', 'px-4') // default size
	})

	it('renders with different variants', () => {
		const { rerender } = render(
			<Button variant="destructive">Destructive</Button>
		)
		let button = screen.getByRole('button')
		expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')

		rerender(<Button variant="outline">Outline</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass('border', 'border-input')

		rerender(<Button variant="secondary">Secondary</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')

		rerender(<Button variant="ghost">Ghost</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass(
			'hover:bg-accent',
			'hover:text-accent-foreground'
		)

		rerender(<Button variant="link">Link</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass('underline-offset-4', 'hover:underline')
	})

	it('renders with different sizes', () => {
		const { rerender } = render(<Button size="sm">Small</Button>)
		let button = screen.getByRole('button')
		expect(button).toHaveClass('h-9', 'px-3')

		rerender(<Button size="lg">Large</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass('h-11', 'px-8')

		rerender(<Button size="icon">Icon</Button>)
		button = screen.getByRole('button')
		expect(button).toHaveClass('h-10', 'w-10')
	})

	it('applies custom className', () => {
		render(<Button className="custom-class">Custom</Button>)

		const button = screen.getByRole('button')
		expect(button).toHaveClass('custom-class')
	})

	it('handles click events', async () => {
		const handleClick = vi.fn()
		const user = userEvent.setup()

		render(<Button onClick={handleClick}>Clickable</Button>)

		const button = screen.getByRole('button')
		await user.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('handles disabled state', () => {
		const handleClick = vi.fn()
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>
		)

		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
		expect(button).toHaveClass(
			'disabled:opacity-50',
			'disabled:pointer-events-none'
		)

		fireEvent.click(button)
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('passes through other HTML button attributes', () => {
		render(
			<Button
				type="submit"
				data-testid="submit-button"
				aria-label="Submit form"
			>
				Submit
			</Button>
		)

		const button = screen.getByRole('button')
		expect(button).toHaveAttribute('type', 'submit')
		expect(button).toHaveAttribute('data-testid', 'submit-button')
		expect(button).toHaveAttribute('aria-label', 'Submit form')
	})

	it('forwards ref correctly', () => {
		const ref = vi.fn()

		render(<Button ref={ref}>Button with ref</Button>)

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
	})

	it('combines variant and size classes correctly', () => {
		render(
			<Button variant="outline" size="lg">
				Large Outline
			</Button>
		)

		const button = screen.getByRole('button')
		expect(button).toHaveClass('border', 'border-input') // outline variant
		expect(button).toHaveClass('h-11', 'px-8') // lg size
	})
})
