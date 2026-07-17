import type { UseQueryOptions } from '@tanstack/react-query'

export type TablePageQueryArgs = {
    page: number
    limit: number
    endless: boolean
}

export type TablePageQueryResult<TRow> = {
    rows: TRow[]
    total: number
}

export type TablePageQueryOptionsBuilder<TRow> = (
    args: TablePageQueryArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => UseQueryOptions<TablePageQueryResult<TRow>, Error, TablePageQueryResult<TRow>, any>

export const DEFAULT_PAGE_SIZES = [30, 50, 100, 200] as const
export const DEFAULT_LIMIT = 30
export const DEFAULT_EMPTY_MESSAGE = 'Žádné výsledky.'
