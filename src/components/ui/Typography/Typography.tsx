import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'
import {
	TypographyVariant,
	TypographySize,
	TypographyWeight,
	TypographyFontFamily,
	TypographyAlign,
	TypographyTextColor,
	TypographyTransform,
	VARIANT_ELEMENT_MAP,
	TYPOGRAPHY_DEFAULTS,
	type ITypographyProps
} from './types/typography.types'

const typographyVariants = cva('text-foreground', {
	variants: {
		variant: {
			[TypographyVariant.H1]:
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			[TypographyVariant.H2]:
				'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			[TypographyVariant.H3]:
				'scroll-m-20 text-2xl font-semibold tracking-tight',
			[TypographyVariant.H4]:
				'scroll-m-20 text-xl font-semibold tracking-tight',
			[TypographyVariant.H5]:
				'scroll-m-20 text-lg font-semibold tracking-tight',
			[TypographyVariant.H6]:
				'scroll-m-20 text-base font-semibold tracking-tight',
			[TypographyVariant.PARAGRAPH]: 'leading-7 [&:not(:first-child)]:mt-6',
			[TypographyVariant.BLOCKQUOTE]: 'mt-6 border-l-2 pl-6 italic',
			[TypographyVariant.LEAD]: 'text-xl text-muted-foreground',
			[TypographyVariant.LARGE]: 'text-lg font-semibold',
			[TypographyVariant.SMALL]: 'text-sm font-medium leading-none',
			[TypographyVariant.MUTED]: 'text-sm text-muted-foreground',
			[TypographyVariant.CODE]:
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
			[TypographyVariant.LIST]: 'my-6 ml-6 list-disc [&>li]:mt-2',
			[TypographyVariant.INLINE_CODE]:
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
			[TypographyVariant.SPAN]: 'inline'
		},
		size: {
			[TypographySize.XS]: 'text-xs',
			[TypographySize.SM]: 'text-sm',
			[TypographySize.BASE]: 'text-base',
			[TypographySize.LG]: 'text-lg',
			[TypographySize.XL]: 'text-xl',
			[TypographySize.XL2]: 'text-2xl',
			[TypographySize.XL3]: 'text-3xl',
			[TypographySize.XL4]: 'text-4xl',
			[TypographySize.XL5]: 'text-5xl',
			[TypographySize.XL6]: 'text-6xl'
		},
		weight: {
			[TypographyWeight.THIN]: 'font-thin',
			[TypographyWeight.EXTRA_LIGHT]: 'font-extralight',
			[TypographyWeight.LIGHT]: 'font-light',
			[TypographyWeight.NORMAL]: 'font-normal',
			[TypographyWeight.MEDIUM]: 'font-medium',
			[TypographyWeight.SEMI_BOLD]: 'font-semibold',
			[TypographyWeight.BOLD]: 'font-bold',
			[TypographyWeight.EXTRA_BOLD]: 'font-extrabold',
			[TypographyWeight.BLACK]: 'font-black'
		},
		fontFamily: {
			[TypographyFontFamily.SANS]: 'font-sans',
			[TypographyFontFamily.SERIF]: 'font-serif',
			[TypographyFontFamily.MONO]: 'font-mono',
			[TypographyFontFamily.CAIRO]: 'font-cairo',
			[TypographyFontFamily.CINZEL]: 'font-cinzel'
		},
		align: {
			[TypographyAlign.LEFT]: 'text-left',
			[TypographyAlign.CENTER]: 'text-center',
			[TypographyAlign.RIGHT]: 'text-right',
			[TypographyAlign.JUSTIFY]: 'text-justify'
		},
		textColor: {
			[TypographyTextColor.DEFAULT]: 'text-foreground',
			[TypographyTextColor.MUTED]: 'text-muted-foreground',
			[TypographyTextColor.PRIMARY]: 'text-primary',
			[TypographyTextColor.SECONDARY]: 'text-secondary',
			[TypographyTextColor.ACCENT]: 'text-accent',
			[TypographyTextColor.DESTRUCTIVE]: 'text-destructive',
			[TypographyTextColor.SUCCESS]: 'text-green-600 dark:text-green-400',
			[TypographyTextColor.WARNING]: 'text-yellow-600 dark:text-yellow-400',
			[TypographyTextColor.INFO]: 'text-blue-600 dark:text-blue-400',
			[TypographyTextColor.WHITE]: 'text-white'
		},
		transform: {
			[TypographyTransform.NONE]: 'normal-case',
			[TypographyTransform.UPPERCASE]: 'uppercase',
			[TypographyTransform.LOWERCASE]: 'lowercase',
			[TypographyTransform.CAPITALIZE]: 'capitalize'
		}
	},
	defaultVariants: {
		variant: TYPOGRAPHY_DEFAULTS.variant,
		fontFamily: TYPOGRAPHY_DEFAULTS.fontFamily,
		textColor: TYPOGRAPHY_DEFAULTS.textColor,
		align: TYPOGRAPHY_DEFAULTS.align,
		transform: TYPOGRAPHY_DEFAULTS.transform
	}
})

export interface TypographyProps extends ITypographyProps {}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	(
		{
			className,
			variant,
			size,
			weight,
			fontFamily = TYPOGRAPHY_DEFAULTS.fontFamily,
			align = TYPOGRAPHY_DEFAULTS.align,
			textColor = TYPOGRAPHY_DEFAULTS.textColor,
			transform = TYPOGRAPHY_DEFAULTS.transform,
			as,
			truncate = TYPOGRAPHY_DEFAULTS.truncate,
			lineClamp,
			children,
			...props
		},
		ref
	) => {
		const Element =
			as || (variant ? VARIANT_ELEMENT_MAP[variant] : undefined) || 'p'

		let truncateClasses = ''
		if (truncate) {
			truncateClasses = lineClamp ? `line-clamp-${lineClamp}` : 'truncate'
		}

		return React.createElement(
			Element,
			{
				className: cn(
					typographyVariants({
						variant,
						size,
						weight,
						fontFamily,
						align,
						textColor,
						transform
					}),
					truncateClasses,
					className
				),
				ref,
				...props
			},
			children
		)
	}
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
