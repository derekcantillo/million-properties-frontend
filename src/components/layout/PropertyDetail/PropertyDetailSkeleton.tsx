import clsx from 'clsx'
import React from 'react'

interface PropertyDetailSkeletonProps {
	className?: string
}

export const PropertyDetailSkeleton: React.FC<PropertyDetailSkeletonProps> = ({
	className
}) => {
	return (
		<div className={clsx('animate-pulse space-y-8', className)}>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div className="flex-1 space-y-2">
					<div className="h-8 w-3/4 rounded bg-gray-300 lg:h-10" />
					<div className="h-5 w-full rounded bg-gray-300 lg:h-6" />
				</div>
				<div className="h-8 w-48 rounded bg-gray-300 lg:h-10" />
			</div>

			<div className="space-y-4">
				<div className="grid h-96 gap-2 md:h-[500px] lg:grid-cols-4 lg:grid-rows-2">
					<div className="rounded-lg bg-gray-300 lg:col-span-2 lg:row-span-2" />
					<div className="hidden rounded-lg bg-gray-300 lg:col-span-2 lg:block" />
					<div className="hidden rounded-lg bg-gray-300 lg:col-span-2 lg:block" />
				</div>

				<div className="flex justify-end">
					<div className="h-10 w-32 rounded bg-gray-300" />
				</div>
			</div>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<div className="space-y-3">
						<div className="h-6 w-32 rounded bg-gray-300" />
						<div className="space-y-2">
							<div className="h-4 w-full rounded bg-gray-300" />
							<div className="h-4 w-full rounded bg-gray-300" />
							<div className="h-4 w-3/4 rounded bg-gray-300" />
						</div>
					</div>

					<div className="space-y-3">
						<div className="h-6 w-40 rounded bg-gray-300" />
						<div className="grid grid-cols-2 gap-4">
							{Array.from({ length: 6 }).map(item => (
								<div
									key={`skeleton-feature-${item}`}
									className="flex items-center gap-2"
								>
									<div className="h-4 w-4 rounded bg-gray-300" />
									<div className="h-4 w-20 rounded bg-gray-300" />
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="h-6 w-32 rounded bg-gray-300" />
					<div className="space-y-4 rounded-lg border p-4">
						<div className="flex items-center gap-3">
							<div className="h-12 w-12 rounded-full bg-gray-300" />
							<div className="flex-1 space-y-1">
								<div className="h-5 w-32 rounded bg-gray-300" />
								<div className="h-4 w-24 rounded bg-gray-300" />
							</div>
						</div>

						<div className="space-y-2">
							<div className="h-4 w-full rounded bg-gray-300" />
							<div className="h-4 w-2/3 rounded bg-gray-300" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
