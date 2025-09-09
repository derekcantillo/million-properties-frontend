import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import {
	Typography,
	TypographyVariant,
	TypographyFontFamily,
	TypographyWeight,
	TypographyTextColor,
	TypographySize
} from '@/components/ui/Typography'
import { DynamicHeaderFilter } from '@/components/layout'

export default function HomePage() {
	const propertyT = useTranslations('Property')

	return (
		<div className="bg-background min-h-screen">
			<DynamicHeaderFilter />

			{/* Add top padding to account for fixed header */}
			<div className="pt-32">
				<div className="container mx-auto px-8">
					<div className="mb-12 flex justify-center gap-8">
						<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-xl border p-6 shadow-lg">
							<LanguageSwitcher />
						</div>
					</div>

					{/* Hero Section */}
					<div className="mb-16 text-center">
						<Typography
							variant={TypographyVariant.H1}
							fontFamily={TypographyFontFamily.CINZEL}
							weight={TypographyWeight.BOLD}
							className="mb-6"
						>
							Million Properties
						</Typography>
						<Typography
							variant={TypographyVariant.H4}
							textColor={TypographyTextColor.MUTED}
							className="mb-8"
						>
							Encuentra la propiedad de tus sueños
						</Typography>
					</div>

					{/* Property Types */}
					<div className="mb-16 grid gap-6 md:grid-cols-3">
						<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-lg border p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
							<Typography
								variant={TypographyVariant.H4}
								fontFamily={TypographyFontFamily.CAIRO}
								weight={TypographyWeight.SEMI_BOLD}
								className="mb-2"
							>
								{propertyT('types.apartment')}
							</Typography>
							<Typography
								variant={TypographyVariant.PARAGRAPH}
								textColor={TypographyTextColor.MUTED}
								size={TypographySize.SM}
							>
								{propertyT('descriptions.apartment')}
							</Typography>
						</div>
						<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-lg border p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
							<Typography
								variant={TypographyVariant.H4}
								fontFamily={TypographyFontFamily.CAIRO}
								weight={TypographyWeight.SEMI_BOLD}
								className="mb-2"
							>
								{propertyT('types.house')}
							</Typography>
							<Typography
								variant={TypographyVariant.PARAGRAPH}
								textColor={TypographyTextColor.MUTED}
								size={TypographySize.SM}
							>
								{propertyT('descriptions.house')}
							</Typography>
						</div>
						<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-lg border p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
							<Typography
								variant={TypographyVariant.H4}
								fontFamily={TypographyFontFamily.CAIRO}
								weight={TypographyWeight.SEMI_BOLD}
								className="mb-2"
							>
								{propertyT('types.commercial')}
							</Typography>
							<Typography
								variant={TypographyVariant.PARAGRAPH}
								textColor={TypographyTextColor.MUTED}
								size={TypographySize.SM}
							>
								{propertyT('descriptions.commercial')}
							</Typography>
						</div>
					</div>

					{/* Additional Content for Scrolling */}
					<div className="space-y-16">
						{Array.from({ length: 10 }, (_, i) => (
							<div
								key={i}
								className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-lg border p-8 shadow-md"
							>
								<Typography
									variant={TypographyVariant.H3}
									fontFamily={TypographyFontFamily.CAIRO}
									weight={TypographyWeight.SEMI_BOLD}
									className="mb-4"
								>
									Sección {i + 1}
								</Typography>
								<Typography
									variant={TypographyVariant.PARAGRAPH}
									textColor={TypographyTextColor.MUTED}
									className="mb-4"
								>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</Typography>
								<Typography
									variant={TypographyVariant.PARAGRAPH}
									textColor={TypographyTextColor.MUTED}
								>
									Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur. Excepteur sint
									occaecat cupidatat non proident, sunt in culpa qui officia
									deserunt mollit anim id est laborum.
								</Typography>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
