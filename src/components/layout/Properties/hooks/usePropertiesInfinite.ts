'use client'

import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getProperties } from '@/api/properties/services'
import {
	QUERY_KEYS,
	type GetPropertiesParams,
	type GetPropertiesResponse
} from '@/api'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

type UsePropertiesInfiniteParams = Omit<
	GetPropertiesParams,
	'page' | 'pageSize'
> & {
	pageSize?: number
}

export const usePropertiesInfinite = (params?: UsePropertiesInfiniteParams) => {
	const { pageSize = 12, ...filters } = params ?? {}

	const query = useInfiniteQuery<GetPropertiesResponse, Error>({
		queryKey: QUERY_KEYS.properties.list({ ...filters, pageSize }),
		queryFn: async ({ pageParam }) => {
			const page = (pageParam as number | undefined) ?? 1
			return await getProperties({ ...filters, page, pageSize })
		},
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			return lastPage.hasNextPage ? lastPage.page + 1 : undefined
		},
		staleTime: 0,
		refetchOnMount: 'always',
		refetchOnReconnect: true,
		refetchOnWindowFocus: false
	})

	const properties = useMemo(() => {
		return (query.data?.pages ?? []).flatMap(page => page.data)
	}, [query.data])

	const hasNextPage = Boolean(query.hasNextPage)
	const loading = query.isLoading || query.isFetchingNextPage

	const { loadMoreRef } = useInfiniteScroll({
		hasNextPage,
		loading,
		onLoadMore: () => {
			if (!query.isFetching && query.hasNextPage) {
				void query.fetchNextPage()
			}
		}
	})

	return {
		properties,
		pages: query.data?.pages ?? [],
		total: query.data?.pages?.[0]?.total ?? 0,
		loading,
		isFetchingNextPage: query.isFetchingNextPage,
		hasNextPage,
		isError: query.isError,
		error: query.error?.message ?? null,
		fetchNextPage: query.fetchNextPage,
		refetch: query.refetch,
		loadMoreRef
	}
}
