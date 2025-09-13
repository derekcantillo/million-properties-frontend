export interface MobileFilterModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (values: {
		name?: string
		address?: string
		minPrice?: number
		maxPrice?: number
	}) => void
}
