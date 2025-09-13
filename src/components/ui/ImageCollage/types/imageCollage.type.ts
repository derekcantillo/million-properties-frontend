import { PropertyImage } from '@/api'

export interface ImageCollageProps {
	images: PropertyImage[]
	propertyName: string
	onImageClick?: (index: number) => void
	onViewAllClick?: () => void
	className?: string
}
