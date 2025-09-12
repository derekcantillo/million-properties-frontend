export const API_ENDPOINTS = {
	properties: {
		base: '/properties',
		byId: (id: string) => `/properties/${id}`
	}
} as const
