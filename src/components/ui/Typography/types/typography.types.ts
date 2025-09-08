import React from 'react'

/**
 * Typography variant types - defines the semantic meaning and default HTML element
 */
export enum TypographyVariant {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	H5 = 'h5',
	H6 = 'h6',
	PARAGRAPH = 'p',
	BLOCKQUOTE = 'blockquote',
	LEAD = 'lead',
	LARGE = 'large',
	SMALL = 'small',
	MUTED = 'muted',
	CODE = 'code',
	LIST = 'list',
	INLINE_CODE = 'inlineCode'
}

/**
 * Font size variants
 */
export enum TypographySize {
	XS = 'xs',
	SM = 'sm',
	BASE = 'base',
	LG = 'lg',
	XL = 'xl',
	XL2 = '2xl',
	XL3 = '3xl',
	XL4 = '4xl',
	XL5 = '5xl',
	XL6 = '6xl'
}

/**
 * Font weight variants
 */
export enum TypographyWeight {
	THIN = 'thin',
	EXTRA_LIGHT = 'extralight',
	LIGHT = 'light',
	NORMAL = 'normal',
	MEDIUM = 'medium',
	SEMI_BOLD = 'semibold',
	BOLD = 'bold',
	EXTRA_BOLD = 'extrabold',
	BLACK = 'black'
}

/**
 * Font family variants
 */
export enum TypographyFontFamily {
	SANS = 'sans',
	SERIF = 'serif',
	MONO = 'mono',
	CAIRO = 'cairo',
	CINZEL = 'cinzel'
}

/**
 * Text alignment variants
 */
export enum TypographyAlign {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right',
	JUSTIFY = 'justify'
}

/**
 * Text color variants
 */
export enum TypographyTextColor {
	DEFAULT = 'default',
	MUTED = 'muted',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	ACCENT = 'accent',
	DESTRUCTIVE = 'destructive',
	SUCCESS = 'success',
	WARNING = 'warning',
	INFO = 'info',
	WHITE = 'white'
}

/**
 * Text transform variants
 */
export enum TypographyTransform {
	NONE = 'none',
	UPPERCASE = 'uppercase',
	LOWERCASE = 'lowercase',
	CAPITALIZE = 'capitalize'
}

/**
 * Line clamp options
 */
export enum TypographyLineClamp {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6
}

/**
 * Mapping of variants to their corresponding HTML elements
 */
export const VARIANT_ELEMENT_MAP: Record<
	TypographyVariant,
	keyof React.JSX.IntrinsicElements
> = {
	[TypographyVariant.H1]: 'h1',
	[TypographyVariant.H2]: 'h2',
	[TypographyVariant.H3]: 'h3',
	[TypographyVariant.H4]: 'h4',
	[TypographyVariant.H5]: 'h5',
	[TypographyVariant.H6]: 'h6',
	[TypographyVariant.PARAGRAPH]: 'p',
	[TypographyVariant.BLOCKQUOTE]: 'blockquote',
	[TypographyVariant.LEAD]: 'p',
	[TypographyVariant.LARGE]: 'div',
	[TypographyVariant.SMALL]: 'small',
	[TypographyVariant.MUTED]: 'p',
	[TypographyVariant.CODE]: 'code',
	[TypographyVariant.LIST]: 'ul',
	[TypographyVariant.INLINE_CODE]: 'code'
} as const

/**
 * Typography variant configuration for class-variance-authority
 */
export interface TypographyVariants {
	variant?: TypographyVariant
	size?: TypographySize
	weight?: TypographyWeight
	fontFamily?: TypographyFontFamily
	align?: TypographyAlign
	textColor?: TypographyTextColor
	transform?: TypographyTransform
}

/**
 * Main Typography component props interface
 */
export interface ITypographyProps
	extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
		TypographyVariants {
	/**
	 * The HTML element to render
	 * If not provided, will be inferred from the variant
	 */
	as?: keyof React.JSX.IntrinsicElements

	/**
	 * Whether to truncate the text with ellipsis
	 */
	truncate?: boolean

	/**
	 * Number of lines to show before truncating (requires truncate to be true)
	 */
	lineClamp?: TypographyLineClamp

	/**
	 * Children content to render
	 */
	children?: React.ReactNode
}

/**
 * Default values for Typography props
 */
export const TYPOGRAPHY_DEFAULTS = {
	variant: TypographyVariant.PARAGRAPH,
	fontFamily: TypographyFontFamily.SANS,
	textColor: TypographyTextColor.DEFAULT,
	align: TypographyAlign.LEFT,
	transform: TypographyTransform.NONE,
	truncate: false
} as const

/**
 * Type for the typography variants function from class-variance-authority
 */
export type TypographyVariantsFunction = (props?: TypographyVariants) => string
