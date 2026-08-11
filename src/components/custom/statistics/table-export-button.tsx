'use client'

import { Download } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import {
    exportTableAsCsv,
    exportTableAsExcel,
    type TableExportable,
} from './table-export'

export type TableExportButtonProps = {
    exportable: TableExportable
    className?: string
}

export function TableExportButton({
    exportable,
    className,
}: TableExportButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    buttonVariants({ variant: 'outline', size: 'icon-sm' }),
                    className,
                )}
                aria-label="Export tabulky"
            >
                <Download />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={6} className="min-w-36">
                <DropdownMenuItem
                    onClick={() => {
                        exportTableAsCsv(exportable)
                    }}
                >
                    CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        exportTableAsExcel(exportable)
                    }}
                >
                    Excel
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
