export type FilterType = 'property' | 'address' | 'price' | null

export interface DropdownPosition {
	top: number
	left: number
	width: number
}

export interface FilterButtonProps {
	label: string
	placeholder: string
	isActive: boolean
	onClick: () => void
	buttonRef: React.RefCallback<HTMLButtonElement>
	someTabSelected?: boolean
	isCompact?: boolean
	isExpanded?: boolean
}

export interface FilterBarProps {
	isCompact?: boolean
	isExpanded?: boolean
	onExpand?: () => void
	onCollapse?: () => void
}

export interface BaseDropdownProps {
	isOpen: boolean
	position: DropdownPosition
	onClose: () => void
}
