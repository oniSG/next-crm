'use client'

import * as React from 'react'

import { Table as UiTable } from '@/components/ui/table'

import { useTablePage } from './context'

export function Table({ children }: { children: React.ReactNode }) {
    const { page, limit, endless } = useTablePage()
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 })
    }, [page, limit, endless])

    return (
        <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-auto overscroll-none"
        >
            <UiTable containerClassName="">{children}</UiTable>
        </div>
    )
}
