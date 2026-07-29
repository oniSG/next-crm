'use client'

import { cn } from '@/lib/utils'

import { ColumnsDropdown } from './columns-dropdown'

export function TableToolbar({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'bg-background flex h-12 shrink-0 items-center gap-2 border-b px-4',
                className,
            )}
        >
            <ColumnsDropdown />
        </div>
    )
}
