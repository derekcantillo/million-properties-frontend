'use client'
import React, { useState } from 'react'

import { FilterBar, Header } from '@/components/layout'

export const DynamicHeaderFilter = () => {
	const [showBackdrop, setShowBackdrop] = useState(false)

	return (
		<>
			<div className="relative h-96 border">
				<Header />
				<div className="absolute inset-0 h-full w-full">
					<div className="absolute inset-0 bg-black/50" />
					<video
						src="assets/videos/hero.mp4"
						autoPlay
						muted
						loop
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
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
