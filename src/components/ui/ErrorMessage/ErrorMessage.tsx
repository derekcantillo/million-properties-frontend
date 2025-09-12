import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import {
	Typography,
	TypographyFontFamily,
	TypographySize,
	TypographyTextColor,
	TypographyVariant,
	Button
} from '@/components/ui'

interface ErrorMessageProps {
	buttonAction: () => void
	buttonText: string
	title: string
	description: string
}

export const ErrorMessage = ({
	buttonAction,
	buttonText,
	title,
	description
}: ErrorMessageProps) => {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center py-12">
			<ExclamationTriangleIcon className="h-12 w-12 text-gray-600" />
			<Typography
				fontFamily={TypographyFontFamily.CAIRO}
				size={TypographySize.XL2}
			>
				{title}
			</Typography>
			<Typography
				textColor={TypographyTextColor.DEFAULT}
				variant={TypographyVariant.PARAGRAPH}
			>
				{description}
			</Typography>
			<Button
				onClick={buttonAction}
				className="bg-foreground hover:bg-foreground/90 rounded-lg px-4 py-2 text-white transition-colors"
			>
				{buttonText}
			</Button>
		</div>
	)
}
