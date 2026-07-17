'use client'

import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import type {
    TablePageQueryArgs,
    TablePageQueryResult,
} from '@/components/custom/table-page-template/types'

import type { Segment } from './types'

const SEGMENTS_KEY = 'segments'

export async function fetchSegments(
    args: TablePageQueryArgs,
): Promise<TablePageQueryResult<Segment>> {
    const search = new URLSearchParams({
        page: String(args.page),
        limit: String(args.limit),
        endless: String(args.endless),
    })
    const res = await fetch(`/api/mock/${SEGMENTS_KEY}?${search.toString()}`)
    if (!res.ok) throw new Error(`Failed to fetch segments (${res.status})`)
    return (await res.json()) as TablePageQueryResult<Segment>
}

export function segmentsQueryOptions(args: TablePageQueryArgs) {
    return queryOptions({
        queryKey: [SEGMENTS_KEY, args] as const,
        queryFn: () => fetchSegments(args),
        placeholderData: keepPreviousData,
    })
}
