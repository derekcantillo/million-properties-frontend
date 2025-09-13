import React from 'react'
import { Button } from '@/components/ui'
import { LayoutViewDropdown, ToolBarProps } from '@/components/layout'
import { cn } from '@/lib/utils/cn'
import clsx from 'clsx'
import { Squares2X2Icon, ChevronDownIcon } from '@heroicons/react/24/outline'

export const ToolBar = (props: ToolBarProps) => {
	const { containerRef, items } = props
	return (
		<div
			ref={containerRef}
			className="mb-6 flex gap-4 sm:flex-row sm:items-center sm:justify-between"
		>
			<div className="flex flex-wrap gap-3">
				{items.map((item, index) => {
					if (item.kind === 'sort') {
						return (
							<Button
								key={`sort-${item.sortKey}-${index}`}
								size="sm"
								onClick={() => item.onClick(item.sortKey)}
								className={clsx('flex items-center gap-1', {
									'bg-blue-100 text-blue-700': item.active,
									'border border-gray-200 text-gray-600 hover:bg-gray-200':
										!item.active
								})}
							>
								{item.icon}
								{item.renderSortArrow(item.active)}
							</Button>
						)
					}

					return (
						<div
							className="relative hidden lg:block"
							ref={item.viewDropdownRef}
							key={`view`}
						>
							<Button
								size="sm"
								onClick={item.onToggle}
								className={clsx('flex items-center gap-2', {
									'border border-gray-200 text-gray-600 hover:bg-gray-200':
										!item.show
								})}
							>
								<Squares2X2Icon className="h-4 w-4" />
								<ChevronDownIcon
									className={cn(
										'h-4 w-4 transition-transform',
										item.show && 'rotate-180'
									)}
								/>
							</Button>

							{item.show && (
								<LayoutViewDropdown
									columnsPerRow={item.columnsPerRow}
									onChange={item.onChange}
								/>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
