'use client'

import { cn } from '@/lib/utils'

import { useTablePage } from '../context'
import { LimitSelector } from './limit-selector'
import { Pagination } from './pagination'

export function TableBottombar({ className }: { className?: string }) {
    const { total, endless, scrollState } = useTablePage()

    return (
        <div
            className={cn(
                'relative grid grid-cols-3 items-center gap-3 border-t bg-background px-3 py-2 transition-shadow duration-150',
                scrollState.scrolledFromBottom &&
                    'shadow-[0_-6px_10px_-8px_rgb(0_0_0/0.15)]',
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
