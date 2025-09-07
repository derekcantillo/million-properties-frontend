import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['lodash-es', 'date-fns']
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	typescript: {
		ignoreBuildErrors: false
	},
	eslint: {
		ignoreDuringBuilds: false
	},
	poweredByHeader: false,
	compress: true,
	generateEtags: true
}

export default withNextIntl(nextConfig)
