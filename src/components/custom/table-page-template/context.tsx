'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnOrderState,
    type ColumnSizingState,
    type Table,
    type VisibilityState,
} from '@tanstack/react-table'
import {
    parseAsBoolean,
    parseAsInteger,
    parseAsString,
    parseAsStringLiteral,
    useQueryState,
} from 'nuqs'

import {
    DEFAULT_COLUMN_MAX_SIZE,
    DEFAULT_COLUMN_MIN_SIZE,
    DEFAULT_COLUMN_SIZE,
    DEFAULT_EMPTY_MESSAGE,
    DEFAULT_LIMIT,
    DEFAULT_PAGE_SIZES,
    type SortDirection,
    type TablePageQueryOptionsBuilder,
} from './types'

type ScrollState = {
    scrolledFromTop: boolean
    scrolledFromBottom: boolean
}

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
    columnVisibility: VisibilityState
    columnOrder: ColumnOrderState
    sortBy: string | null
    sortDir: SortDirection | null
    toggleSort: (field: string) => void
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    setLimit: (limit: number) => void
    setEndless: (endless: boolean) => void
    columnSizeVars: React.CSSProperties
    tableTotalWidth: number
    isResizingColumn: boolean
    scrollState: ScrollState
    setScrollState: React.Dispatch<React.SetStateAction<ScrollState>>
}

const TablePageContext = React.createContext<ContextValue<unknown> | null>(null)

const EMPTY_ROWS: unknown[] = []
const SORT_DIRS = ['asc', 'desc'] as const

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
    defaultColumnWidth?: number
    minColumnWidth?: number
    maxColumnWidth?: number
    children: React.ReactNode
}

export function TablePageProvider<TRow>({
    queryOptions,
    columns,
    pageSizes = DEFAULT_PAGE_SIZES,
    defaultLimit = DEFAULT_LIMIT,
    emptyMessage = DEFAULT_EMPTY_MESSAGE,
    defaultColumnWidth = DEFAULT_COLUMN_SIZE,
    minColumnWidth = DEFAULT_COLUMN_MIN_SIZE,
    maxColumnWidth = DEFAULT_COLUMN_MAX_SIZE,
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
    const [sortBy, setSortBy] = useQueryState(
        'sort',
        parseAsString.withOptions({ clearOnDefault: true }),
    )
    const [sortDir, setSortDir] = useQueryState(
        'dir',
        parseAsStringLiteral(SORT_DIRS).withOptions({ clearOnDefault: true }),
    )

    const query = useQuery(queryOptions({ page, limit, endless, sort: sortBy, dir: sortDir }))
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

    const toggleSort = React.useCallback(
        (field: string) => {
            if (sortBy !== field) {
                setSortBy(field)
                setSortDir('asc')
            } else if (sortDir === 'asc') {
                setSortDir('desc')
            } else {
                setSortBy(null)
                setSortDir(null)
            }
            setPage(1)
        },
        [sortBy, sortDir, setSortBy, setSortDir, setPage],
    )

    const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
    const [scrollState, setScrollState] = React.useState<ScrollState>({
        scrolledFromTop: false,
        scrolledFromBottom: false,
    })

    const defaultColumn = React.useMemo(
        () => ({
            size: defaultColumnWidth,
            minSize: minColumnWidth,
            maxSize: maxColumnWidth,
        }),
        [defaultColumnWidth, minColumnWidth, maxColumnWidth],
    )

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: rows,
        columns,
        defaultColumn,
        state: { columnSizing, columnVisibility, columnOrder },
        onColumnSizingChange: setColumnSizing,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        columnResizeMode: 'onChange',
        enableColumnResizing: true,
        getCoreRowModel: getCoreRowModel(),
    })

    const columnSizingInfo = table.getState().columnSizingInfo
    const isResizingColumn = Boolean(columnSizingInfo.isResizingColumn)

    const columnSizeVars = React.useMemo<React.CSSProperties>(() => {
        const headers = table.getFlatHeaders()
        const vars: Record<string, string> = {}
        for (const header of headers) {
            vars[`--h-${header.id}`] = `${header.getSize()}px`
            vars[`--c-${header.column.id}`] = `${header.column.getSize()}px`
        }
        return vars as React.CSSProperties
        // Recompute whenever a resize event or sizing state changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnSizing, columnSizingInfo, table])

    const tableTotalWidth = table.getTotalSize()

    React.useEffect(() => {
        if (!isResizingColumn) return
        const prevCursor = document.body.style.cursor
        const prevUserSelect = document.body.style.userSelect
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
        return () => {
            document.body.style.cursor = prevCursor
            document.body.style.userSelect = prevUserSelect
        }
    }, [isResizingColumn])

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
            columnVisibility,
            columnOrder,
            sortBy,
            sortDir,
            toggleSort,
            goToPage,
            nextPage,
            prevPage,
            setLimit,
            setEndless,
            columnSizeVars,
            tableTotalWidth,
            isResizingColumn,
            scrollState,
            setScrollState,
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
            columnVisibility,
            columnOrder,
            sortBy,
            sortDir,
            toggleSort,
            goToPage,
            nextPage,
            prevPage,
            setLimit,
            setEndless,
            columnSizeVars,
            tableTotalWidth,
            isResizingColumn,
            scrollState,
        ],
    )

    return (
        <TablePageContext.Provider value={value as ContextValue<unknown>}>
            {children}
        </TablePageContext.Provider>
    )
}
