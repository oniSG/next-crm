'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type Table,
} from '@tanstack/react-table'
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs'

import {
    DEFAULT_EMPTY_MESSAGE,
    DEFAULT_LIMIT,
    DEFAULT_PAGE_SIZES,
    type TablePageQueryOptionsBuilder,
} from './types'

type ContextValue<TRow> = {
    page: number
    limit: number
    endless: boolean
    total: number
    totalPages: number
    rows: TRow[]
    loading: boolean
    pageSizes: readonly number[]
    emptyMessage: string
    table: Table<TRow>
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    setLimit: (limit: number) => void
    setEndless: (endless: boolean) => void
}

const TablePageContext = React.createContext<ContextValue<unknown> | null>(null)

const EMPTY_ROWS: unknown[] = []

export function useTablePage<TRow = unknown>() {
    const ctx = React.useContext(TablePageContext)
    if (!ctx) {
        throw new Error('useTablePage must be used within <TablePageProvider>')
    }
    return ctx as ContextValue<TRow>
}

export type TablePageProviderProps<TRow> = {
    queryOptions: TablePageQueryOptionsBuilder<TRow>
    columns: ColumnDef<TRow>[]
    pageSizes?: readonly number[]
    defaultLimit?: number
    emptyMessage?: string
    children: React.ReactNode
}

export function TablePageProvider<TRow>({
    queryOptions,
    columns,
    pageSizes = DEFAULT_PAGE_SIZES,
    defaultLimit = DEFAULT_LIMIT,
    emptyMessage = DEFAULT_EMPTY_MESSAGE,
    children,
}: TablePageProviderProps<TRow>) {
    const [page, setPage] = useQueryState(
        'page',
        parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
    )
    const [limit, setLimitParam] = useQueryState(
        'limit',
        parseAsInteger.withDefault(defaultLimit).withOptions({ clearOnDefault: true }),
    )
    const [endless, setEndlessParam] = useQueryState(
        'endless',
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
    )

    const query = useQuery(queryOptions({ page, limit, endless }))
    const rows = React.useMemo<TRow[]>(
        () => query.data?.rows ?? (EMPTY_ROWS as TRow[]),
        [query.data],
    )
    const total = query.data?.total ?? 0
    const loading = query.isFetching

    const totalPages = React.useMemo(() => {
        if (endless || limit <= 0) return 1
        return Math.max(1, Math.ceil(total / limit))
    }, [total, limit, endless])

    React.useEffect(() => {
        if (page > totalPages) setPage(totalPages)
        else if (page < 1) setPage(1)
    }, [page, totalPages, setPage])

    const goToPage = React.useCallback(
        (next: number) => {
            if (!Number.isFinite(next)) return
            const clamped = Math.min(Math.max(1, Math.floor(next)), totalPages)
            setPage(clamped)
        },
        [setPage, totalPages],
    )

    const nextPage = React.useCallback(() => {
        setPage((prev) => Math.min(totalPages, (prev ?? 1) + 1))
    }, [setPage, totalPages])

    const prevPage = React.useCallback(() => {
        setPage((prev) => Math.max(1, (prev ?? 1) - 1))
    }, [setPage])

    const setLimit = React.useCallback(
        (next: number) => {
            setLimitParam(next)
            setPage(1)
        },
        [setLimitParam, setPage],
    )

    const setEndless = React.useCallback(
        (next: boolean) => {
            setEndlessParam(next)
            if (next) setPage(1)
        },
        [setEndlessParam, setPage],
    )

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const value = React.useMemo<ContextValue<TRow>>(
        () => ({
            page,
            limit,
            endless,
            total,
            totalPages,
            rows,
            loading,
            pageSizes,
            emptyMessage,
            table,
            goToPage,
            nextPage,
            prevPage,
            setLimit,
            setEndless,
        }),
        [
            page,
            limit,
            endless,
            total,
            totalPages,
            rows,
            loading,
            pageSizes,
            emptyMessage,
            table,
            goToPage,
            nextPage,
            prevPage,
            setLimit,
            setEndless,
        ],
    )

    return (
        <TablePageContext.Provider value={value as ContextValue<unknown>}>
            {children}
        </TablePageContext.Provider>
    )
}
