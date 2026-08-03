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
}

export function SimpleTable<T>({
    data,
    columns,
    getRowKey,
    className,
    footer,
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
