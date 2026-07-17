'use client'

import { flexRender } from '@tanstack/react-table'

import {
    TableBody as UiTableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table'

import { useTablePage } from '../context'

export function TableBody() {
    const { table, emptyMessage } = useTablePage()
    const rows = table.getRowModel().rows
    const columnCount = table.getAllLeafColumns().length

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
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="border-r last:border-r-0">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </UiTableBody>
    )
}
