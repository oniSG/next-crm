import type { UseQueryOptions } from '@tanstack/react-query'
import type { Column } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    // Marks a column as the "fill" column — no fixed width, soaks up leftover
    // space, and shows no resize handle. If none is marked, the last column fills.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        fill?: boolean
        label?: string
    }
}

export function isFillColumn<TRow>(column: Column<TRow, unknown>): boolean {
    return column.columnDef.meta?.fill === true
}

export function getColumnLabel<TRow>(column: Column<TRow, unknown>): string {
    return column.columnDef.meta?.label ?? column.id
}

export type SortDirection = 'asc' | 'desc'

export type TablePageQueryArgs = {
    page: number
    limit: number
    endless: boolean
    sort: string | null
    dir: SortDirection | null
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
export const DEFAULT_COLUMN_SIZE = 180
export const DEFAULT_COLUMN_MIN_SIZE = 60
export const DEFAULT_COLUMN_MAX_SIZE = 800
