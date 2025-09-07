import React from 'react'
import { FilterBar, Header } from '@/components/layout'

export const DynamicHeaderFilter = () => {
	return (
		<div className="fixed top-0 right-0 left-0 bg-gray-300 py-6">
			<Header />
			<FilterBar />
		</div>
	)
}
