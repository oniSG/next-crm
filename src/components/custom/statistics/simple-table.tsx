import type { ReactNode } from 'react'

import {
    Table,
    TableBody,
    TableCell,
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
}

export function SimpleTable<T>({
    data,
    columns,
    getRowKey,
    className,
}: SimpleTableProps<T>) {
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
                    <TableRow key={getRowKey(row)}>
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
        </Table>
    )
}
