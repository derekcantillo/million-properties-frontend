import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    fontFamily: {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
      cairo: 'font-cairo',
      cinzel: 'font-cinzel',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    textColor: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
    },
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
  },
  defaultVariants: {
    variant: 'p',
    fontFamily: 'sans',
    textColor: 'default',
    align: 'left',
    transform: 'none',
  },
});

// Mapping of variants to their corresponding HTML elements
const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  code: 'code',
  list: 'ul',
  inlineCode: 'code',
} as const;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /**
   * The HTML element to render
   * If not provided, will be inferred from the variant
   */
  as?: keyof React.JSX.IntrinsicElements;
  /**
   * Whether to truncate the text with ellipsis
   */
  truncate?: boolean;
  /**
   * Number of lines to show before truncating (requires truncate to be true)
   */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'p',
      size,
      weight,
      fontFamily,
      align,
      textColor,
      transform,
      as,
      truncate = false,
      lineClamp,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element to render
    const Element = as || variantElementMap[variant || 'p'] || 'div';

    // Build additional classes for truncation
    let truncateClasses = '';
    if (truncate) {
      truncateClasses = lineClamp ? `line-clamp-${lineClamp}` : 'truncate';
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
            transform,
          }),
          truncateClasses,
          className
        ),
        ref,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
