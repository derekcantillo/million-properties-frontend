import { SortState, SortDirection, SortType } from '@/components/layout'
import { ToolBarItem } from '../../ToolBar'

type ListDensity = 'compact' | 'comfortable'

export interface IFloatingMenuProps {
	ref: React.RefObject<HTMLDivElement | null>
	viewDropdownRef: React.RefObject<HTMLDivElement | null>
	showViewDropdown: boolean
	handleViewDropdown: () => void
	columnsPerRow: number
	handleColumnsPerRow: (columns: number) => void
	sortState: SortState
	renderSortArrow: (direction: SortDirection) => React.ReactNode
	handleSortClick: (sortType: SortType) => void
	toolbarRef: React.RefObject<HTMLDivElement | null>
	toolbarItems: ToolBarItem[]
	listDensity?: ListDensity
	onChangeListDensity?: (density: ListDensity) => void
}
