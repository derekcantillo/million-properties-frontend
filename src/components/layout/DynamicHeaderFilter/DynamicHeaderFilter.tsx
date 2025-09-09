'use client'
import React, { useState } from 'react'

import { FilterBar, Header } from '@/components/layout'

export const DynamicHeaderFilter = () => {
	const [showBackdrop, setShowBackdrop] = useState(false)

	return (
		<>
			<Header />
			<FilterBar
				onCollapse={() => setShowBackdrop(false)}
				onExpand={() => setShowBackdrop(true)}
			/>{' '}
			{showBackdrop && (
				<button
					type="button"
					className="fixed inset-0 z-30 bg-black/50"
					onClick={() => setShowBackdrop(false)}
					onKeyDown={e => {
						if (e.key === 'Escape') {
							setShowBackdrop(false)
						}
					}}
					aria-label="Cerrar dropdown"
				/>
			)}
		</>
	)
}
