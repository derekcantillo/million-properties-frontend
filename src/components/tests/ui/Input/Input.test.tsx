import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui'

describe('Input Component', () => {
	describe('Rendering', () => {
		it('renders correctly with default props', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
		})

		it('applies custom className', () => {
			render(<Input className="custom-class" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('custom-class')
		})

		it('applies default styling classes', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass(
				'border-input',
				'bg-background',
				'ring-offset-background',
				'flex',
				'h-10',
				'w-full',
				'rounded-md',
				'border',
				'px-3',
				'py-2',
				'text-sm'
			)
		})

		it('renders with different input types', () => {
			const { rerender } = render(<Input type="password" />)
			let input = document.querySelector(
				'input[type="password"]'
			) as HTMLInputElement
			expect(input.type).toBe('password')

			rerender(<Input type="email" />)
			input = screen.getByRole('textbox') as HTMLInputElement
			expect(input.type).toBe('email')

			rerender(<Input type="number" />)
			input = screen.getByRole('spinbutton') as HTMLInputElement
			expect(input.type).toBe('number')

			rerender(<Input type="tel" />)
			input = screen.getByRole('textbox') as HTMLInputElement
			expect(input.type).toBe('tel')
		})
	})

	describe('HTML Attributes', () => {
		it('passes through standard HTML input attributes', () => {
			render(
				<Input
					placeholder="Enter text"
					disabled
					required
					maxLength={10}
					minLength={2}
					pattern="[A-Za-z]+"
					autoComplete="name"
					autoFocus
					readOnly
					tabIndex={1}
				/>
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('placeholder', 'Enter text')
			expect(input).toBeDisabled()
			expect(input).toBeRequired()
			expect(input).toHaveAttribute('maxlength', '10')
			expect(input).toHaveAttribute('minlength', '2')
			expect(input).toHaveAttribute('pattern', '[A-Za-z]+')
			expect(input).toHaveAttribute('autocomplete', 'name')
			expect(input).toHaveFocus()
			expect(input).toHaveAttribute('readonly')
			expect(input).toHaveAttribute('tabindex', '1')
		})

		it('handles value and defaultValue', () => {
			const { rerender } = render(<Input defaultValue="default text" />)
			let input = screen.getByDisplayValue('default text')
			expect(input).toBeInTheDocument()

			rerender(<Input value="controlled value" onChange={() => {}} />)
			input = screen.getByDisplayValue('controlled value')
			expect(input).toBeInTheDocument()
		})

		it('handles name and id attributes', () => {
			render(<Input name="username" id="user-input" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('name', 'username')
			expect(input).toHaveAttribute('id', 'user-input')
		})
	})

	describe('User Interactions', () => {
		it('handles onChange events', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'hello')

			expect(handleChange).toHaveBeenCalledTimes(5) // One for each character
		})

		it('handles onFocus and onBlur events', async () => {
			const handleFocus = vi.fn()
			const handleBlur = vi.fn()
			const user = userEvent.setup()

			render(<Input onFocus={handleFocus} onBlur={handleBlur} />)

			const input = screen.getByRole('textbox')

			await user.click(input)
			expect(handleFocus).toHaveBeenCalledTimes(1)

			await user.tab()
			expect(handleBlur).toHaveBeenCalledTimes(1)
		})

		it('handles keyboard events', async () => {
			const handleKeyDown = vi.fn()
			const handleKeyPress = vi.fn()
			const handleKeyUp = vi.fn()
			const user = userEvent.setup()

			render(
				<Input
					onKeyDown={handleKeyDown}
					onKeyPress={handleKeyPress}
					onKeyUp={handleKeyUp}
				/>
			)

			const input = screen.getByRole('textbox')
			await user.type(input, 'a')

			expect(handleKeyDown).toHaveBeenCalled()
			expect(handleKeyUp).toHaveBeenCalled()
		})

		it('updates value when typing', async () => {
			const user = userEvent.setup()

			render(<Input />)

			const input = screen.getByRole('textbox') as HTMLInputElement
			await user.type(input, 'test value')

			expect(input.value).toBe('test value')
		})
	})

	describe('Disabled State', () => {
		it('applies disabled styling when disabled', () => {
			render(<Input disabled />)

			const input = screen.getByRole('textbox')
			expect(input).toBeDisabled()
			expect(input).toHaveClass(
				'disabled:cursor-not-allowed',
				'disabled:opacity-50'
			)
		})

		it('does not respond to user input when disabled', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input disabled onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'should not work')

			expect(handleChange).not.toHaveBeenCalled()
			expect(input).toHaveValue('')
		})
	})

	describe('Focus States', () => {
		it('applies focus styling classes', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass(
				'focus-visible:ring-ring',
				'focus-visible:ring-2',
				'focus-visible:ring-offset-2',
				'focus-visible:outline-none'
			)
		})

		it('can be focused programmatically', () => {
			const ref = vi.fn()

			render(<Input ref={ref} />)

			expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
		})
	})

	describe('File Input Specific', () => {
		it('handles file input type correctly', () => {
			render(<Input type="file" />)

			const input = document.querySelector(
				'input[type="file"]'
			) as HTMLInputElement
			expect(input.type).toBe('file')
			expect(input).toHaveClass(
				'file:border-0',
				'file:bg-transparent',
				'file:text-sm',
				'file:font-medium'
			)
		})

		it('handles file input attributes', () => {
			render(<Input type="file" accept=".jpg,.png" multiple />)

			const input = document.querySelector(
				'input[type="file"]'
			) as HTMLInputElement
			expect(input).toHaveAttribute('accept', '.jpg,.png')
			expect(input).toHaveAttribute('multiple')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = { current: null as HTMLInputElement | null }

			render(<Input ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLInputElement)
		})

		it('allows direct DOM manipulation through ref', () => {
			const ref = { current: null as HTMLInputElement | null }

			render(<Input ref={ref} />)

			if (ref.current) {
				ref.current.focus()
				expect(ref.current).toHaveFocus()
			}
		})
	})

	describe('Accessibility', () => {
		it('supports aria attributes', () => {
			render(
				<Input
					aria-label="Search input"
					aria-describedby="search-help"
					aria-invalid={true}
					aria-required={true}
				/>
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-label', 'Search input')
			expect(input).toHaveAttribute('aria-describedby', 'search-help')
			expect(input).toHaveAttribute('aria-invalid', 'true')
			expect(input).toHaveAttribute('aria-required', 'true')
		})

		it('works with labels', () => {
			render(
				<div>
					<label htmlFor="test-input">Test Label</label>
					<Input id="test-input" />
				</div>
			)

			const input = screen.getByLabelText('Test Label')
			expect(input).toBeInTheDocument()
		})
	})

	describe('Placeholder Behavior', () => {
		it('shows placeholder text correctly', () => {
			render(<Input placeholder="Enter your name" />)

			const input = screen.getByPlaceholderText('Enter your name')
			expect(input).toBeInTheDocument()
		})

		it('applies placeholder styling', () => {
			render(<Input placeholder="Test placeholder" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('placeholder:text-muted-foreground')
		})
	})
})
