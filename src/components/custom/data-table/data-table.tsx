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
        <div className="min-w-0 flex-1 overflow-auto overscroll-none">
            <Table containerClassName="">
                <TableHeader className="[&_tr]:border-b-0">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="bg-background sticky top-0 z-10 border-r last:border-r-0 shadow-[inset_0_-1px_0_var(--border)]"
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
                                    <TableCell
                                        key={cell.id}
                                        className="border-r last:border-r-0"
                                    >
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
        </div>
    )
}
