'use client'

import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import type {
    TablePageQueryArgs,
    TablePageQueryResult,
} from '@/components/custom/table-page-template/types'

import type { Template } from './types'

const TEMPLATES_KEY = 'templates'

export async function fetchTemplates(
    args: TablePageQueryArgs,
): Promise<TablePageQueryResult<Template>> {
    const search = new URLSearchParams({
        page: String(args.page),
        limit: String(args.limit),
        endless: String(args.endless),
    })
    const res = await fetch(`/api/mock/${TEMPLATES_KEY}?${search.toString()}`)
    if (!res.ok) throw new Error(`Failed to fetch templates (${res.status})`)
    return (await res.json()) as TablePageQueryResult<Template>
}

export function templatesQueryOptions(args: TablePageQueryArgs) {
    return queryOptions({
        queryKey: [TEMPLATES_KEY, args] as const,
        queryFn: () => fetchTemplates(args),
        placeholderData: keepPreviousData,
    })
}
