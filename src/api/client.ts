import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

class ApiClient {
	private readonly client: AxiosInstance

	constructor() {
		this.client = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5058/api',
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.get<T>(url, config)
		return response.data
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.client.post<T>(url, data, config)
		return response.data
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.client.put<T>(url, data, config)
		return response.data
	}

	async patch<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.client.patch<T>(url, data, config)
		return response.data
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.client.delete<T>(url, config)
		return response.data
	}
}

export const apiClient = new ApiClient()
