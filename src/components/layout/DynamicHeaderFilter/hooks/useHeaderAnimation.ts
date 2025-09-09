'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useHeaderAnimation = () => {
	const [isCompact, setIsCompact] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const headerRef = useRef<HTMLElement>(null)
	const filterBarRef = useRef<HTMLDivElement>(null)
	const logoRef = useRef<HTMLDivElement>(null)
	const themeSwitcherRef = useRef<HTMLDivElement>(null)
	const backdropRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!headerRef.current || !filterBarRef.current) return

		const header = headerRef.current
		const filterBar = filterBarRef.current
		const logo = logoRef.current
		const themeSwitcher = themeSwitcherRef.current

		const animateToCompact = () => {
			const tl = gsap.timeline()

			tl.to(header, {
				paddingTop: '0.75rem',
				paddingBottom: '0.75rem',
				duration: 0.3,
				ease: 'power2.out'
			})
				.to(
					filterBar,
					{
						scale: 0.85,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
				.to(
					[logo, themeSwitcher],
					{
						scale: 0.9,
						opacity: 0.8,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
		}

		const animateToNormal = () => {
			const tl = gsap.timeline()

			tl.to(header, {
				paddingTop: '1.5rem',
				paddingBottom: '1.5rem',
				duration: 0.3,
				ease: 'power2.out'
			})
				.to(
					filterBar,
					{
						scale: 1,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
				.to(
					[logo, themeSwitcher],
					{
						scale: 1,
						opacity: 1,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
		}

		// Create scroll trigger for shrinking animation
		ScrollTrigger.create({
			trigger: document.body,
			start: 'top -50px',
			end: 'bottom top',
			onEnter: () => {
				if (!isExpanded) {
					setIsCompact(true)
					animateToCompact()
				}
			},
			onLeaveBack: () => {
				if (!isExpanded) {
					setIsCompact(false)
					animateToNormal()
				}
			}
		})

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [isExpanded])

	const expandHeader = () => {
		if (!headerRef.current || !filterBarRef.current || !backdropRef.current)
			return

		setIsExpanded(true)

		const tl = gsap.timeline()

		// Show backdrop only if we're scrolled (compact state)
		if (isCompact) {
			tl.to(backdropRef.current, {
				opacity: 0.5,
				duration: 0.3,
				ease: 'power2.out'
			})
		}

		// Expand header
		tl.to(
			headerRef.current,
			{
				paddingTop: '1.5rem',
				paddingBottom: '1.5rem',
				duration: 0.3,
				ease: 'power2.out'
			},
			isCompact ? '<' : 0
		)
			.to(
				filterBarRef.current,
				{
					scale: 1,
					duration: 0.3,
					ease: 'power2.out'
				},
				'<'
			)
			.to(
				[logoRef.current, themeSwitcherRef.current],
				{
					scale: 1,
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out'
				},
				'<'
			)
	}

	const collapseHeader = () => {
		if (!headerRef.current || !filterBarRef.current || !backdropRef.current)
			return

		setIsExpanded(false)

		const tl = gsap.timeline()

		// Always hide backdrop
		tl.to(backdropRef.current, {
			opacity: 0,
			duration: 0.3,
			ease: 'power2.out'
		})

		// If we're scrolled, return to compact state
		if (isCompact) {
			tl.to(
				headerRef.current,
				{
					paddingTop: '0.75rem',
					paddingBottom: '0.75rem',
					duration: 0.3,
					ease: 'power2.out'
				},
				'<'
			)
				.to(
					filterBarRef.current,
					{
						scale: 0.85,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
				.to(
					[logoRef.current, themeSwitcherRef.current],
					{
						scale: 0.9,
						opacity: 0.8,
						duration: 0.3,
						ease: 'power2.out'
					},
					'<'
				)
		}
	}

	return {
		isCompact,
		isExpanded,
		headerRef,
		filterBarRef,
		logoRef,
		themeSwitcherRef,
		backdropRef,
		expandHeader,
		collapseHeader
	}
}
