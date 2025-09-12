'use client'

import { DynamicHeaderFilter, Properties } from '@/components/layout'

export default function HomePage() {
	return (
		<div className="bg-background">
			<DynamicHeaderFilter />

			<div className="relative z-10 bg-white">
				<div className="container mx-auto bg-white px-8 py-8">
					<Properties />
				</div>
			</div>
		</div>
	)
}
