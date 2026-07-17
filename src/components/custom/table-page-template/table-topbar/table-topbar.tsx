'use client'

import { flexRender } from '@tanstack/react-table'

import {
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { useTablePage } from '../context'

export function TableTopbar() {
    const { table } = useTablePage()

    return (
        <TableHeader className="[&_tr]:border-b-0">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead
                            key={header.id}
                            className="bg-background sticky top-0 z-10 border-r shadow-[inset_0_-1px_0_var(--border)] last:border-r-0"
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                  )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    )
}
