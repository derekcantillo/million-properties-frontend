import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
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
		<div className="bg-background min-h-screen p-8">
			<DynamicHeaderFilter />
			<div className="container mx-auto flex min-h-screen items-center justify-center">
				<div className="mb-12 flex justify-center gap-8">
					<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-xl border p-6 shadow-lg">
						<ThemeSwitcher />
					</div>
					<div className="bg-background border-foreground/20 dark:shadow-foreground/10 rounded-xl border p-6 shadow-lg">
						<LanguageSwitcher />
					</div>
				</div>

				{/* Property Types */}
				<div className="mb-12 grid gap-6 md:grid-cols-3">
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
			</div>
		</div>
	)
}
