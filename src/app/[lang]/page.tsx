'use client'

import { DynamicHeaderFilter, Properties } from '@/components/layout'

export default function HomePage() {
	return (
		<div className="bg-background">
			{/* Hero section with parallax */}
			<DynamicHeaderFilter />

			{/* Main content */}
			<div className="bg-background relative z-10">
				<div className="container mx-auto px-8 py-8">
					<Properties />
				</div>
			</div>
		</div>
	)
}
