'use client'
import { useState, useEffect } from 'react'

export const useIsMobile = () => {
	const MOBILE_BREAKPOINT = 768
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
		}

		mql.addEventListener('change', onChange)

		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

		return () => {
			mql.removeEventListener('change', onChange)
		}
	}, [MOBILE_BREAKPOINT])

	return !!isMobile
}
