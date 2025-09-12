import React from 'react'
import { IFloatingMenuProps, ToolBar } from '@/components/layout'

export const FloatingMenu = ({
	ref,
	toolbarRef,
	toolbarItems,
	listDensity,
	onChangeListDensity
}: IFloatingMenuProps) => {
	return (
		<div
			ref={ref}
			className="absolute right-16 bottom-16 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
		>
			<ToolBar
				containerRef={toolbarRef}
				items={toolbarItems}
				listDensity={listDensity}
				onChangeListDensity={onChangeListDensity}
			/>
		</div>
	)
}
