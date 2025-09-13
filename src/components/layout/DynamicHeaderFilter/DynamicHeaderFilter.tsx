'use client'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
	FilterBar,
	Header,
	MobileFilterModal,
	DynamicHeaderFilterProps
} from '@/components/layout'
import {
	Typography,
	TypographyFontFamily,
	TypographyTextColor,
	TypographyVariant,
	TypographyWeight
} from '@/components/ui'
import clsx from 'clsx'
import { usePropertiesStore } from '@/stores/usePropertiesStore'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export const DynamicHeaderFilter = ({
	showVideo = true,
	showHeroText = true
}: DynamicHeaderFilterProps) => {
	const t = useTranslations()
	const [showBackdrop, setShowBackdrop] = useState(false)
	const [isDark, setIsDark] = useState(!showVideo)
	const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
	const setFilters = usePropertiesStore(s => s.setFilters)

	const containerRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)
	const filterBarRef = useRef<HTMLDivElement>(null)
	const heroContentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current
		const header = headerRef.current
		const video = videoRef.current
		const filterBar = filterBarRef.current
		const heroContent = heroContentRef.current

		if (showVideo) {
			ScrollTrigger.create({
				trigger: container,
				start: 'top top',
				end: 'bottom top',
				scrub: 1,
				onUpdate: self => {
					const progress = self.progress

					if (header) {
						const opacity = Math.min(progress * 2, 1)
						gsap.set(header, {
							backgroundColor: `rgba(255, 255, 255, ${opacity})`,
							backdropFilter: `blur(${opacity * 10}px)`
						})

						const shouldBeDark = progress > 0.5
						if (shouldBeDark !== isDark) {
							setIsDark(shouldBeDark)
						}
					}

					if (video) {
						gsap.set(video, {
							yPercent: progress * -30
						})
					}

					if (heroContent) {
						gsap.set(heroContent, {
							opacity: 1 - progress * 2,
							yPercent: progress * -20
						})
					}
				}
			})

			ScrollTrigger.create({
				trigger: filterBar,
				start: 'top top+=64',
				end: '+=1',
				onToggle: self => {
					if (video) {
						gsap.to(video.parentElement, {
							opacity: self.isActive ? 0 : 1,
							duration: 0.3
						})
					}
				}
			})

			if (filterBar) {
				ScrollTrigger.create({
					trigger: filterBar,
					start: 'top top+=56',
					end: '+=9999',
					pin: true,
					pinSpacing: false
				})
			}
		} else if (filterBar) {
			ScrollTrigger.create({
				trigger: filterBar,
				start: 'top top+=56',
				end: '+=9999',
				pin: true,
				pinSpacing: false
			})
		}

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [showVideo, isDark])

	const handleMobileFilterOpen = () => {
		setIsMobileModalOpen(true)
	}

	const handleMobileFilterSubmit = (values: {
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}) => {
		const next: Record<string, unknown> = {}
		if (values.name !== undefined) next.name = values.name
		if (values.address !== undefined) next.address = values.address
		if (values.minPrice !== undefined) next.minPrice = values.minPrice
		if (values.maxPrice !== undefined) next.maxPrice = values.maxPrice
		setFilters(next)
		setIsMobileModalOpen(false)
	}

	return (
		<>
			<div ref={containerRef} className="relative">
				<div
					className={clsx('relative w-full overflow-hidden', {
						'h-96': showVideo,
						'h-auto': !showVideo
					})}
				>
					<div
						ref={headerRef}
						className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
					>
						<Header isDark={isDark} />
					</div>

					{showVideo && (
						<>
							<div className="fixed inset-0 z-0 h-screen w-full">
								<video
									ref={videoRef}
									src="assets/videos/hero.mp4"
									autoPlay
									muted
									loop
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="absolute inset-0 h-full w-full">
								<div className="absolute inset-0 z-20 bg-black/50" />
								{showHeroText && (
									<div
										ref={heroContentRef}
										className="absolute inset-0 z-30 flex flex-col items-center justify-center"
									>
										<Typography
											variant={TypographyVariant.H2}
											fontFamily={TypographyFontFamily.CINZEL}
											weight={TypographyWeight.NORMAL}
											className="transition-all duration-300 ease-in-out"
											textColor={TypographyTextColor.WHITE}
										>
											{t('hero.title')}
										</Typography>
										<Typography
											variant={TypographyVariant.H3}
											fontFamily={TypographyFontFamily.CINZEL}
											weight={TypographyWeight.NORMAL}
											className="transition-all duration-300 ease-in-out"
											textColor={TypographyTextColor.WHITE}
										>
											{t('hero.subtitle')}
										</Typography>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>

			<div ref={filterBarRef} className="bg-background z-40 w-full shadow-md">
				<FilterBar
					onCollapse={() => setShowBackdrop(false)}
					onExpand={() => setShowBackdrop(true)}
					compactMode={!showVideo || isDark}
					onMobileFilterOpen={handleMobileFilterOpen}
				/>
			</div>
			{showBackdrop && (
				<button
					type="button"
					className="fixed inset-0 z-30 bg-black/50"
					onClick={() => setShowBackdrop(false)}
					onKeyDown={e => {
						if (e.key === 'Escape') {
							setShowBackdrop(false)
						}
					}}
					aria-label={t('common.closeDropdown')}
				/>
			)}

			<MobileFilterModal
				isOpen={isMobileModalOpen}
				onClose={() => setIsMobileModalOpen(false)}
				onSubmit={handleMobileFilterSubmit}
			/>
		</>
	)
}
