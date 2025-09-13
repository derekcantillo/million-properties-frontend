import clsx from 'clsx'
import React from 'react'
import { PropertySkeletonProps } from '@/components/layout'

export const PropertySkeleton: React.FC<PropertySkeletonProps> = ({
	className
}) => {
	return (
		<div
			className={clsx('animate-pulse rounded-lg bg-white shadow-sm', className)}
		>
			<div className="h-96 w-full rounded-t-lg bg-gray-300" />

			<div className="space-y-3 p-6">
				<div className="h-6 w-3/4 rounded bg-gray-300" />

				<div className="h-4 w-full rounded bg-gray-300" />

				<div className="h-4 w-1/2 rounded bg-gray-300" />
			</div>
		</div>
	)
}
