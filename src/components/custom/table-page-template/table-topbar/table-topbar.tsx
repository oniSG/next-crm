'use client'

import { flexRender } from '@tanstack/react-table'

import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { useTablePage } from '../context'
import { isFillColumn } from '../types'

export function TableTopbar() {
    const { table, sortBy, sortDir, scrollState } = useTablePage()
    const elevation = scrollState.scrolledFromTop
        ? 'shadow-[inset_0_-1px_0_var(--border),0_6px_10px_-8px_rgb(0_0_0/0.15)]'
        : 'shadow-[inset_0_-1px_0_var(--border)]'

    return (
        <TableHeader className="[&_tr]:border-b-0">
            {table.getHeaderGroups().map((headerGroup) => {
                const hasExplicitFill = headerGroup.headers.some((h) =>
                    isFillColumn(h.column),
                )
                return (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header, index, arr) => {
                            const isSorted = sortBy === header.column.id
                            const canResize = header.column.getCanResize()
                            const isResizing = header.column.getIsResizing()
                            const isFill = hasExplicitFill
                                ? isFillColumn(header.column)
                                : index === arr.length - 1

                            return (
                                <TableHead
                                    key={header.id}
                                    aria-sort={
                                        isSorted
                                            ? sortDir === 'asc'
                                                ? 'ascending'
                                                : 'descending'
                                            : 'none'
                                    }
                                    style={
                                        isFill
                                            ? undefined
                                            : { width: `var(--h-${header.id})` }
                                    }
                                    className={cn(
                                        'bg-background sticky top-0 z-10 h-12 border-r transition-shadow duration-150 last:border-r-0',
                                        elevation,
                                    )}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                    {canResize && !isFill ? (
                                        <div
                                            role="separator"
                                            aria-orientation="vertical"
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            onDoubleClick={() =>
                                                header.column.resetSize()
                                            }
                                            className="group/resizer absolute inset-y-0 right-0 z-20 flex w-1.5 cursor-col-resize touch-none items-stretch justify-end select-none"
                                        >
                                            <div
                                                className={cn(
                                                    'w-px bg-transparent transition-[background-color,width] duration-100',
                                                    'group-hover/resizer:w-0.5 group-hover/resizer:bg-ring',
                                                    isResizing && 'w-0.5 bg-ring',
                                                )}
                                            />
                                        </div>
                                    ) : null}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                )
            })}
        </TableHeader>
    )
}
