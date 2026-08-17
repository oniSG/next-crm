'use client'

import type { ReactNode } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export type SimpleTableColumn<T> = {
    id: string
    header: ReactNode
    cell: (row: T) => ReactNode
    headerClassName?: string
    cellClassName?: string
}

export type SimpleTableProps<T> = {
    data: T[]
    columns: SimpleTableColumn<T>[]
    getRowKey: (row: T) => string
    className?: string
    footer?: ReactNode[]
    onRowClick?: (row: T) => void
    emptyMessage?: string
}

export function SimpleTable<T>({
    data,
    columns,
    getRowKey,
    className,
    footer,
    onRowClick,
    emptyMessage = 'No data for the selected period.',
}: SimpleTableProps<T>) {
    if (data.length === 0) {
        return (
            <div
                className={cn(
                    'text-muted-foreground flex h-24 items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

    return (
        <Table className={cn(className)}>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={column.id}
                            className={column.headerClassName}
                        >
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow
                        key={getRowKey(row)}
                        className={
                            onRowClick
                                ? 'hover:bg-muted/40 cursor-pointer'
                                : undefined
                        }
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                        onKeyDown={
                            onRowClick
                                ? (event) => {
                                      if (
                                          event.key !== 'Enter' &&
                                          event.key !== ' '
                                      ) {
                                          return
                                      }
                                      event.preventDefault()
                                      onRowClick(row)
                                  }
                                : undefined
                        }
                        tabIndex={onRowClick ? 0 : undefined}
                        role={onRowClick ? 'button' : undefined}
                    >
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                className={column.cellClassName}
                            >
                                {column.cell(row)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            {footer && (
                <TableFooter>
                    <TableRow>
                        {footer.map((cell, index) => (
                            <TableCell
                                key={columns[index]?.id ?? index}
                                className={columns[index]?.cellClassName}
                            >
                                {cell}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableFooter>
            )}
        </Table>
    )
}
