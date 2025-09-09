import clsx from 'clsx'
import React from 'react'

interface PropertySkeletonProps {
	className?: string
}

export const PropertySkeleton: React.FC<PropertySkeletonProps> = ({
	className
}) => {
	return (
		<div
			className={clsx(
				'animate-pulse rounded-lg border bg-white shadow-sm',
				className
			)}
		>
			{/* Image skeleton */}
			<div className="h-96 w-full rounded-t-lg bg-gray-300"></div>

			{/* Content skeleton */}
			<div className="space-y-3 p-6">
				{/* Property name skeleton */}
				<div className="h-6 w-3/4 rounded bg-gray-300"></div>

				{/* Address skeleton */}
				<div className="h-4 w-full rounded bg-gray-300"></div>

				{/* Price skeleton */}
				<div className="h-4 w-1/2 rounded bg-gray-300"></div>
			</div>
		</div>
	)
}
