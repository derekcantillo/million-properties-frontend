'use client'

import { DynamicHeaderFilter, Properties } from '@/components/layout'

export default function HomePage() {
	return (
		<div className="bg-background relative min-h-screen">
			<DynamicHeaderFilter />

			<div className="relative z-10 pt-40">
				<div className="container mx-auto px-8">
					<Properties />
				</div>
			</div>
		</div>
	)
}
