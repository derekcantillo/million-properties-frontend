'use client'
import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
	hasNextPage: boolean
	loading: boolean
	onLoadMore: () => void
	threshold?: number
}

export const useInfiniteScroll = ({
	hasNextPage,
	loading,
	onLoadMore,
	threshold = 100
}: UseInfiniteScrollOptions) => {
	const loadMoreRef = useRef<HTMLDivElement>(null)

	const handleScroll = useCallback(() => {
		if (loading || !hasNextPage) return

		const element = loadMoreRef.current
		if (!element) return

		const rect = element.getBoundingClientRect()
		const isVisible = rect.top <= window.innerHeight + threshold

		if (isVisible) {
			onLoadMore()
		}
	}, [loading, hasNextPage, onLoadMore, threshold])

	useEffect(() => {
		const handleScrollThrottled = () => {
			requestAnimationFrame(handleScroll)
		}

		window.addEventListener('scroll', handleScrollThrottled, { passive: true })
		window.addEventListener('resize', handleScrollThrottled, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScrollThrottled)
			window.removeEventListener('resize', handleScrollThrottled)
		}
	}, [handleScroll])

	return { loadMoreRef }
}
