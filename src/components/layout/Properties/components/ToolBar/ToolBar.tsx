import React, { ReactNode, RefObject } from 'react'
import { Button } from '@/components/ui/Button'
import {
	LayoutViewDropdown,
	SortDirection,
	SortType
} from '@/components/layout'
import { cn } from '@/lib/utils/cn'
import clsx from 'clsx'
import { Squares2X2Icon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface SortToolBarItem {
	kind: 'sort'
	sortKey: SortType
	active: SortDirection
	onClick: (key: SortType) => void
	icon: ReactNode
	renderSortArrow: (direction: SortDirection) => ReactNode
}

interface ViewToolBarItem {
	kind: 'view'
	show: boolean
	onToggle: () => void
	columnsPerRow: number
	onChange: (columns: number) => void
	viewDropdownRef: RefObject<HTMLDivElement | null>
}

export type ToolBarItem = SortToolBarItem | ViewToolBarItem

type ListDensity = 'compact' | 'comfortable'

interface ToolBarPropsBase {
	containerRef: RefObject<HTMLDivElement | null>
	items: ToolBarItem[]
}

interface ToolBarPropsWithDensity extends ToolBarPropsBase {
	listDensity: ListDensity
	onChangeListDensity: (density: ListDensity) => void
}

export type ToolBarProps = ToolBarPropsBase | ToolBarPropsWithDensity

function hasDensityProps(
	props: ToolBarProps
): props is ToolBarPropsWithDensity {
	return (props as ToolBarPropsWithDensity).onChangeListDensity !== undefined
}

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

					// kind === 'view'
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

			{/* Mobile density selector */}
			{hasDensityProps(props) && (
				<div className="block lg:hidden">
					<label
						htmlFor="density-select"
						className="mr-2 text-sm text-gray-600"
					>
						Vista
					</label>
					<select
						id="density-select"
						className="rounded-md border border-gray-200 bg-white p-2 text-sm"
						value={props.listDensity}
						onChange={e =>
							props.onChangeListDensity(e.target.value as ListDensity)
						}
					>
						<option value="compact">Compacta</option>
						<option value="comfortable">Cómoda</option>
					</select>
				</div>
			)}
		</div>
	)
}
