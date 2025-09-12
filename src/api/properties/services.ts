import {
	apiClient,
	API_ENDPOINTS,
	GetPropertiesResponse,
	GetPropertiesParams,
	GetPropertyByIDResponse
} from '@/api'

export const getProperties = (params?: GetPropertiesParams) =>
	apiClient.get<GetPropertiesResponse>(API_ENDPOINTS.properties.base, {
		params
	})

export const getPropertyById = (id: string) =>
	apiClient.get<GetPropertyByIDResponse>(API_ENDPOINTS.properties.byId(id))
