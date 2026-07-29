'use client'

import { flexRender } from '@tanstack/react-table'

import {
    TableBody as UiTableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table'

import { useTablePage } from '../context'
import { isFillColumn } from '../types'

export function TableBody() {
    const { table, emptyMessage } = useTablePage()
    const rows = table.getRowModel().rows
    const leafColumns = table.getAllLeafColumns()
    const columnCount = leafColumns.length
    const hasExplicitFill = leafColumns.some((c) => isFillColumn(c))

    if (rows.length === 0) {
        return (
            <UiTableBody>
                <TableRow>
                    <TableCell
                        colSpan={columnCount}
                        className="text-muted-foreground h-24 text-center"
                    >
                        {emptyMessage}
                    </TableCell>
                </TableRow>
            </UiTableBody>
        )
    }

    return (
        <UiTableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell, index, arr) => {
                        const isFill = hasExplicitFill
                            ? isFillColumn(cell.column)
                            : index === arr.length - 1
                        return (
                            <TableCell
                                key={cell.id}
                                style={
                                    isFill
                                        ? undefined
                                        : { width: `var(--c-${cell.column.id})` }
                                }
                                className="overflow-hidden border-r text-ellipsis last:border-r-0"
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        )
                    })}
                </TableRow>
            ))}
        </UiTableBody>
    )
}
