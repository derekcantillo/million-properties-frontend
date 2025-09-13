import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
	Typography,
	TypographyVariant,
	TypographySize,
	TypographyWeight,
	TypographyFontFamily,
	TypographyAlign,
	TypographyTextColor,
	TypographyTransform
} from '@/components/ui/'
import React from 'react'

describe('Typography Component', () => {
	describe('Basic Rendering', () => {
		it('renders with default props', () => {
			render(<Typography>Default text</Typography>)

			const element = screen.getByText('Default text')
			expect(element).toBeInTheDocument()
			expect(element.tagName).toBe('P')
		})

		it('renders children correctly', () => {
			render(<Typography>Test content</Typography>)

			expect(screen.getByText('Test content')).toBeInTheDocument()
		})

		it('accepts custom className', () => {
			render(<Typography className="custom-class">Text</Typography>)

			const element = screen.getByText('Text')
			expect(element).toHaveClass('custom-class')
		})

		it('forwards additional props', () => {
			render(<Typography data-testid="typography-test">Text</Typography>)

			expect(screen.getByTestId('typography-test')).toBeInTheDocument()
		})
	})

	describe('HTML Element Mapping', () => {
		it('maps variants to correct HTML elements', () => {
			const { rerender } = render(
				<Typography variant={TypographyVariant.H1}>Heading 1</Typography>
			)
			expect(screen.getByText('Heading 1').tagName).toBe('H1')

			rerender(
				<Typography variant={TypographyVariant.H2}>Heading 2</Typography>
			)
			expect(screen.getByText('Heading 2').tagName).toBe('H2')

			rerender(
				<Typography variant={TypographyVariant.PARAGRAPH}>Paragraph</Typography>
			)
			expect(screen.getByText('Paragraph').tagName).toBe('P')

			rerender(
				<Typography variant={TypographyVariant.BLOCKQUOTE}>Quote</Typography>
			)
			expect(screen.getByText('Quote').tagName).toBe('BLOCKQUOTE')

			rerender(<Typography variant={TypographyVariant.CODE}>Code</Typography>)
			expect(screen.getByText('Code').tagName).toBe('CODE')

			rerender(<Typography variant={TypographyVariant.SMALL}>Small</Typography>)
			expect(screen.getByText('Small').tagName).toBe('SMALL')

			rerender(<Typography variant={TypographyVariant.LIST}>List</Typography>)
			expect(screen.getByText('List').tagName).toBe('UL')

			rerender(<Typography variant={TypographyVariant.SPAN}>Span</Typography>)
			expect(screen.getByText('Span').tagName).toBe('SPAN')
		})

		it('allows custom element override with as prop', () => {
			render(<Typography as="section">Custom element</Typography>)

			expect(screen.getByText('Custom element').tagName).toBe('SECTION')
		})
	})

	describe('Variant Styles', () => {
		it('applies heading variant styles', () => {
			const { rerender } = render(
				<Typography variant={TypographyVariant.H1}>H1 text</Typography>
			)
			let element = screen.getByText('H1 text')
			expect(element).toHaveClass('scroll-m-20', 'text-4xl', 'font-extrabold')

			rerender(<Typography variant={TypographyVariant.H2}>H2 text</Typography>)
			element = screen.getByText('H2 text')
			expect(element).toHaveClass('scroll-m-20', 'border-b', 'text-3xl')
		})

		it('applies special variant styles', () => {
			const { rerender } = render(
				<Typography variant={TypographyVariant.LEAD}>Lead text</Typography>
			)
			let element = screen.getByText('Lead text')
			expect(element).toHaveClass('text-xl')

			rerender(
				<Typography variant={TypographyVariant.LARGE}>Large text</Typography>
			)
			element = screen.getByText('Large text')
			expect(element).toHaveClass('text-lg', 'font-semibold')

			rerender(
				<Typography variant={TypographyVariant.SMALL}>Small text</Typography>
			)
			element = screen.getByText('Small text')
			expect(element).toHaveClass('text-sm', 'font-medium', 'leading-none')

			rerender(
				<Typography variant={TypographyVariant.MUTED}>Muted text</Typography>
			)
			element = screen.getByText('Muted text')
			expect(element).toHaveClass('text-sm')
		})

		it('applies code variant styles', () => {
			render(
				<Typography variant={TypographyVariant.CODE}>Code block</Typography>
			)

			const element = screen.getByText('Code block')
			expect(element).toHaveClass(
				'relative',
				'rounded',
				'bg-muted',
				'px-[0.3rem]',
				'py-[0.2rem]',
				'text-sm',
				'font-semibold'
			)
		})
	})

	describe('Size Variants', () => {
		it('applies size classes correctly', () => {
			const { rerender } = render(
				<Typography size={TypographySize.XS}>Extra small</Typography>
			)
			let element = screen.getByText('Extra small')
			expect(element).toHaveClass('text-xs')

			rerender(<Typography size={TypographySize.SM}>Small</Typography>)
			element = screen.getByText('Small')
			expect(element).toHaveClass('text-sm')

			rerender(<Typography size={TypographySize.LG}>Large</Typography>)
			element = screen.getByText('Large')
			expect(element).toHaveClass('text-lg')

			rerender(<Typography size={TypographySize.XL}>Extra large</Typography>)
			element = screen.getByText('Extra large')
			expect(element).toHaveClass('text-xl')
		})
	})

	describe('Weight Variants', () => {
		it('applies weight classes correctly', () => {
			const { rerender } = render(
				<Typography weight={TypographyWeight.THIN}>Thin</Typography>
			)
			let element = screen.getByText('Thin')
			expect(element).toHaveClass('font-thin')

			rerender(<Typography weight={TypographyWeight.NORMAL}>Normal</Typography>)
			element = screen.getByText('Normal')
			expect(element).toHaveClass('font-normal')

			rerender(<Typography weight={TypographyWeight.BOLD}>Bold</Typography>)
			element = screen.getByText('Bold')
			expect(element).toHaveClass('font-bold')
		})
	})

	describe('Font Family Variants', () => {
		it('applies font family classes correctly', () => {
			const { rerender } = render(
				<Typography fontFamily={TypographyFontFamily.SANS}>Sans</Typography>
			)
			let element = screen.getByText('Sans')
			expect(element).toHaveClass('font-sans')

			rerender(
				<Typography fontFamily={TypographyFontFamily.SERIF}>Serif</Typography>
			)
			element = screen.getByText('Serif')
			expect(element).toHaveClass('font-serif')

			rerender(
				<Typography fontFamily={TypographyFontFamily.MONO}>Mono</Typography>
			)
			element = screen.getByText('Mono')
			expect(element).toHaveClass('font-mono')

			rerender(
				<Typography fontFamily={TypographyFontFamily.CAIRO}>Cairo</Typography>
			)
			element = screen.getByText('Cairo')
			expect(element).toHaveClass('font-cairo')
		})
	})

	describe('Alignment Variants', () => {
		it('applies alignment classes correctly', () => {
			const { rerender } = render(
				<Typography align={TypographyAlign.LEFT}>Left</Typography>
			)
			let element = screen.getByText('Left')
			expect(element).toHaveClass('text-left')

			rerender(<Typography align={TypographyAlign.CENTER}>Center</Typography>)
			element = screen.getByText('Center')
			expect(element).toHaveClass('text-center')

			rerender(<Typography align={TypographyAlign.RIGHT}>Right</Typography>)
			element = screen.getByText('Right')
			expect(element).toHaveClass('text-right')
		})
	})

	describe('Color Variants', () => {
		it('applies color classes correctly', () => {
			const { rerender } = render(
				<Typography textColor={TypographyTextColor.DEFAULT}>Default</Typography>
			)
			let element = screen.getByText('Default')
			expect(element).toHaveClass('text-foreground')

			rerender(
				<Typography textColor={TypographyTextColor.PRIMARY}>Primary</Typography>
			)
			element = screen.getByText('Primary')
			expect(element).toHaveClass('text-primary')

			rerender(
				<Typography textColor={TypographyTextColor.DESTRUCTIVE}>
					Destructive
				</Typography>
			)
			element = screen.getByText('Destructive')
			expect(element).toHaveClass('text-destructive')
		})
	})

	describe('Transform Variants', () => {
		it('applies text transform classes correctly', () => {
			const { rerender } = render(
				<Typography transform={TypographyTransform.NONE}>None</Typography>
			)
			let element = screen.getByText('None')
			expect(element).toHaveClass('normal-case')

			rerender(
				<Typography transform={TypographyTransform.UPPERCASE}>
					Uppercase
				</Typography>
			)
			element = screen.getByText('Uppercase')
			expect(element).toHaveClass('uppercase')

			rerender(
				<Typography transform={TypographyTransform.LOWERCASE}>
					Lowercase
				</Typography>
			)
			element = screen.getByText('Lowercase')
			expect(element).toHaveClass('lowercase')
		})
	})

	describe('Truncation', () => {
		it('applies truncate class when truncate prop is true', () => {
			render(<Typography truncate>Truncated text</Typography>)

			const element = screen.getByText('Truncated text')
			expect(element).toHaveClass('truncate')
		})

		it('applies line clamp when lineClamp is specified', () => {
			render(
				<Typography truncate lineClamp={3}>
					Clamped text
				</Typography>
			)

			const element = screen.getByText('Clamped text')
			expect(element).toHaveClass('line-clamp-3')
		})

		it('does not apply truncate classes when truncate is false', () => {
			render(<Typography truncate={false}>Normal text</Typography>)

			const element = screen.getByText('Normal text')
			expect(element).not.toHaveClass('truncate')
			expect(element).not.toHaveClass('line-clamp-3')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLParagraphElement>()
			render(<Typography ref={ref}>Ref test</Typography>)

			expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
			expect(ref.current?.textContent).toBe('Ref test')
		})
	})
})
