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
	compactMode?: boolean
}

export interface FilterBarProps {
	onCollapse?: () => void
	onExpand?: () => void
	compactMode?: boolean
}

export interface BaseDropdownProps {
	isOpen: boolean
	position: DropdownPosition
	onClose: () => void
}

export interface UseFilterBarProps {
	onCollapse?: (() => void) | undefined
	onExpand?: (() => void) | undefined
}
