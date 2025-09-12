import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
	Typography,
	TypographyVariant,
	TypographyFontFamily
} from '@/components/ui'

export function Footer() {
	const t = useTranslations('footer')

	return (
		<footer className="border-border bg-background relative z-10 mt-auto border-t">
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="space-y-4">
						<Typography
							variant={TypographyVariant.H3}
							fontFamily={TypographyFontFamily.CAIRO}
							className="text-foreground"
						>
							{t('developedBy')}
						</Typography>
						<div className="space-y-2">
							<Typography
								variant={TypographyVariant.PARAGRAPH}
								fontFamily={TypographyFontFamily.CAIRO}
								className="text-muted-foreground"
							>
								<strong className="text-foreground">{t('developer')}</strong>
							</Typography>
							<Typography
								variant={TypographyVariant.SMALL}
								fontFamily={TypographyFontFamily.CAIRO}
								className="text-muted-foreground"
							>
								{t('position')}
							</Typography>
							<div className="text-muted-foreground flex items-center space-x-2 text-sm">
								<MapPinIcon className="h-4 w-4" />
								<Typography
									variant={TypographyVariant.SPAN}
									fontFamily={TypographyFontFamily.CAIRO}
									className="text-muted-foreground"
								>
									{t('location')}
								</Typography>
							</div>
						</div>
					</div>

					{/* Información del Proyecto */}
					<div className="space-y-4">
						<Typography
							variant={TypographyVariant.H3}
							fontFamily={TypographyFontFamily.CAIRO}
							className="text-foreground"
						>
							{t('technicalTest')}
						</Typography>
						<div className="space-y-2">
							<Typography
								variant={TypographyVariant.SMALL}
								fontFamily={TypographyFontFamily.CAIRO}
								className="text-muted-foreground"
							>
								<strong className="text-foreground">{t('projectName')}</strong>
							</Typography>
							<Typography
								variant={TypographyVariant.SMALL}
								fontFamily={TypographyFontFamily.CAIRO}
								className="text-muted-foreground"
							>
								{t('projectDescription')}
							</Typography>
							<div className="flex flex-wrap gap-2">
								<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
									{t('technologies.nextjs')}
								</span>
								<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
									{t('technologies.react')}
								</span>
								<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
									{t('technologies.typescript')}
								</span>
								<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
									{t('technologies.tailwind')}
								</span>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<Typography
							variant={TypographyVariant.H3}
							fontFamily={TypographyFontFamily.CAIRO}
							className="text-foreground"
						>
							{t('contact')}
						</Typography>
						<div className="space-y-3">
							<a
								href="mailto:cantilloderek@gmail.com"
								className="text-muted-foreground font-cairo hover:text-foreground pointer-events-auto flex cursor-pointer items-center space-x-2 text-sm transition-colors"
							>
								<EnvelopeIcon className="h-4 w-4" />
								<span>{t('email')}</span>
							</a>
							<a
								href="https://www.linkedin.com/in/derek-cantillo/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground font-cairo hover:text-foreground pointer-events-auto flex cursor-pointer items-center space-x-2 text-sm transition-colors"
							>
								<svg
									className="h-4 w-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
								<span>{t('linkedin')}</span>
							</a>
							<a
								href="https://github.com/derekcantillo"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground font-cairo hover:text-foreground pointer-events-auto flex cursor-pointer items-center space-x-2 text-sm transition-colors"
							>
								<svg
									className="h-4 w-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								<span>{t('github')}</span>
							</a>
						</div>
					</div>
				</div>

				{/* Línea divisoria y copyright */}
				<div className="border-border mt-8 border-t pt-6">
					<div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
						<Typography
							variant={TypographyVariant.SMALL}
							fontFamily={TypographyFontFamily.CAIRO}
							className="text-muted-foreground"
						>
							{t('copyright')}
						</Typography>
						<div className="text-muted-foreground flex items-center space-x-4 text-sm">
							<Link
								href="https://github.com/derek/million-properties-frontend"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground font-cairo hover:text-foreground pointer-events-auto cursor-pointer transition-colors"
							>
								{t('viewSourceCode')}
							</Link>
							<span className="text-muted-foreground font-cairo">•</span>
							<Link
								href="/docs"
								className="text-muted-foreground font-cairo hover:text-foreground pointer-events-auto cursor-pointer transition-colors"
							>
								{t('documentation')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
