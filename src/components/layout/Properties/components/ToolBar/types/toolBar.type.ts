import { SortDirection, SortType } from '@/components/layout'
import { ReactNode, RefObject } from 'react'

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
