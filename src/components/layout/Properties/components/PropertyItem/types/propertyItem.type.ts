import { PropertyByAllResponse } from '@/api'

export interface PropertyItemProps {
	property: PropertyByAllResponse
	className?: string
	// layout hints
	columnsPerRow?: number
	isDesktop?: boolean
	listDensity?: 'compact' | 'comfortable'
}
