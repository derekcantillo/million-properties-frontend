import { useTranslations } from 'next-intl'
import React from 'react'
import ReactSlider from 'react-slider'

interface ILayoutViewDropdownProps {
	columnsPerRow: number
	onChange: (value: number) => void
}

export const LayoutViewDropdown = ({
	columnsPerRow,
	onChange
}: ILayoutViewDropdownProps) => {
	const t = useTranslations()
	return (
		<div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
			<div className="space-y-4">
				<div className="text-sm font-medium text-gray-700">
					{t('properties.propertiesPerRow')}: {columnsPerRow}
				</div>
				<div className="px-2">
					<ReactSlider
						className="horizontal-slider view-slider"
						thumbClassName="slider-thumb"
						trackClassName="slider-track"
						min={1}
						max={5}
						step={1}
						value={columnsPerRow}
						onChange={value => onChange(value)}
						marks={[1, 2, 3, 4, 5]}
						markClassName="slider-mark"
					/>
				</div>
				<div className="flex justify-between text-xs text-gray-500">
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
				</div>
			</div>
		</div>
	)
}
