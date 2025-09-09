'use client'

import React from 'react'
import { PropertyItem } from '@/components/layout'
import { PropertySkeleton } from '@/components/ui/PropertySkeleton'
import { usePropertiesInfinite } from '@/hooks/usePropertiesInfinite'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const Properties = () => {
	const { properties, loading, hasNextPage, error, loadMore, refresh } =
		usePropertiesInfinite()
	const { loadMoreRef } = useInfiniteScroll({
		hasNextPage,
		loading,
		onLoadMore: loadMore,
		threshold: 200
	})

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<p className="mb-4 text-red-600">{error}</p>
				<button
					onClick={refresh}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		)
	}

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{properties.map(property => (
					<PropertyItem key={property.id} property={property} />
				))}

				{loading && (
					<>
						{Array.from({ length: 6 }).map((_, index) => (
							<PropertySkeleton
								key={`skeleton-${properties.length}-${index}`}
							/>
						))}
					</>
				)}
			</div>

			<div ref={loadMoreRef} className="h-10 w-full" />

			{/* Loading indicator */}
			{loading && properties.length > 0 && (
				<div className="flex justify-center py-8">
					<div className="flex items-center space-x-2">
						<div className="h-4 w-4 animate-bounce rounded-full bg-blue-600"></div>
						<div
							className="h-4 w-4 animate-bounce rounded-full bg-blue-600"
							style={{ animationDelay: '0.1s' }}
						></div>
						<div
							className="h-4 w-4 animate-bounce rounded-full bg-blue-600"
							style={{ animationDelay: '0.2s' }}
						></div>
						<span className="ml-2 text-gray-600">
							Loading more properties...
						</span>
					</div>
				</div>
			)}

			{/* End message */}
			{!hasNextPage && properties.length > 0 && (
				<div className="py-8 text-center">
					<p className="text-gray-600">You've reached the end! 🏠</p>
					<p className="mt-1 text-sm text-gray-500">
						Showing all {properties.length} properties
					</p>
				</div>
			)}
		</div>
	)
}
