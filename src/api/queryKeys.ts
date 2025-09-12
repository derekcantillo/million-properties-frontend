export const QUERY_KEYS = {
	properties: {
		all: ['properties'] as const,
		list: (filters?: object) => ['properties', filters] as const,
		detail: (id: string) => ['properties', id] as const
	}
}
