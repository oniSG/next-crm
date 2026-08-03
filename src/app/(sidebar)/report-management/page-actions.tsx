'use client'

import { useState } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 5, 30)

export function PageActions() {
    const [today] = useState(() => new Date())
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))

    return (
        <>
            <DateRangeFilter
                value={{ from, to }}
                onChange={(range) => {
                    void setFrom(range.from)
                    void setTo(range.to)
                }}
                today={today}
            />
            <ExportButton
                dashboard="report-management"
                filename="report-management.pdf"
            />
        </>
    )
}
