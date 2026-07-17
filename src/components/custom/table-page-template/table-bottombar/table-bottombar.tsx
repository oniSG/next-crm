'use client'

import { cn } from '@/lib/utils'

import { useTablePage } from '../context'
import { LimitSelector } from './limit-selector'
import { Pagination } from './pagination'

export function TableBottombar({ className }: { className?: string }) {
    const { total, endless } = useTablePage()

    return (
        <div
            className={cn(
                'grid grid-cols-3 items-center gap-3 border-t bg-background px-3 py-2',
                className,
            )}
        >
            <div className="flex justify-start">{!endless && <Pagination />}</div>
            <div className="text-muted-foreground text-center text-sm tabular-nums">
                Celkem {total} záznamů
            </div>
            <div className="flex justify-end">
                <LimitSelector />
            </div>
        </div>
    )
}
