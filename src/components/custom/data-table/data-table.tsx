'use client'

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

type DataTableProps<TData> = {
    data: TData[]
    columns: ColumnDef<TData>[]
    emptyMessage?: string
}

export function DataTable<TData>({
    data,
    columns,
    emptyMessage = 'Žádné výsledky.',
}: DataTableProps<TData>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
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
            <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="text-muted-foreground h-24 text-center"
                        >
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
