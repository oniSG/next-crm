'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

import { useTablePage } from '../context'

export function GotoPage() {
    const { page, totalPages, loading, goToPage } = useTablePage()

    const [focused, setFocused] = React.useState(false)
    const [localValue, setLocalValue] = React.useState('')

    const displayValue = focused ? localValue : String(page)
    const inputWidth = `${Math.max(2, displayValue.length + 1)}ch`

    return (
        <InputGroup
            className={cn(
                'h-7 w-auto rounded-none border-l-0',
                loading && 'pointer-events-none opacity-50',
            )}
        >
            <InputGroupInput
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={String(totalPages).length}
                aria-label="Jít na stránku"
                value={displayValue}
                disabled={loading}
                onFocus={(e) => {
                    setFocused(true)
                    setLocalValue(String(page))
                    const target = e.currentTarget
                    requestAnimationFrame(() => target.select())
                }}
                onBlur={() => {
                    if (!focused) return
                    setFocused(false)
                    const n = parseInt(localValue, 10)
                    if (Number.isFinite(n) && n >= 1 && n !== page) {
                        goToPage(Math.min(n, totalPages))
                    }
                }}
                onBeforeInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const ne = e.nativeEvent as InputEvent
                    if (ne.data == null) return
                    if (!/^\d+$/.test(ne.data)) {
                        e.preventDefault()
                        return
                    }
                    const target = e.currentTarget
                    const start = target.selectionStart ?? target.value.length
                    const end = target.selectionEnd ?? start
                    const next =
                        target.value.slice(0, start) + ne.data + target.value.slice(end)
                    if (parseInt(next, 10) > totalPages) e.preventDefault()
                }}
                onChange={(e) => setLocalValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        e.currentTarget.blur()
                    } else if (e.key === 'Escape') {
                        e.preventDefault()
                        setLocalValue(String(page))
                        e.currentTarget.blur()
                    }
                }}
                style={{ width: inputWidth }}
                className="box-content flex-none px-2 text-center text-sm tabular-nums"
            />
            <InputGroupAddon align="inline-end" className="pr-3 pl-0 tabular-nums">
                / {totalPages}
            </InputGroupAddon>
        </InputGroup>
    )
}
