'use client'

import * as React from 'react'

import { Table as UiTable } from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { useTablePage } from './context'

export function Table({ children }: { children: React.ReactNode }) {
    const {
        page,
        limit,
        endless,
        columnSizeVars,
        tableTotalWidth,
        isResizingColumn,
        setScrollState,
    } = useTablePage()
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 })
    }, [page, limit, endless])

    React.useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = el
            setScrollState({
                scrolledFromTop: scrollTop > 0,
                scrolledFromBottom:
                    scrollHeight - clientHeight - scrollTop > 1,
            })
        }
        update()
        el.addEventListener('scroll', update, { passive: true })
        const ro = new ResizeObserver(update)
        ro.observe(el)
        const inner = el.firstElementChild
        if (inner) ro.observe(inner)
        return () => {
            el.removeEventListener('scroll', update)
            ro.disconnect()
        }
    }, [setScrollState])

    return (
        <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-auto overscroll-none"
        >
            <UiTable
                containerClassName=""
                className={cn(
                    'w-auto table-fixed',
                    isResizingColumn && 'select-none',
                )}
                style={{
                    ...columnSizeVars,
                    width: tableTotalWidth,
                    minWidth: '100%',
                }}
            >
                {children}
            </UiTable>
        </div>
    )
}
