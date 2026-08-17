'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, parseAsStringLiteral, useQueryStates } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import { PERIOD_OPTIONS, type Period } from './data'

const periodValues = PERIOD_OPTIONS.map((option) => option.value) as [
    Period,
    ...Period[],
]

export function useFilters() {
    const [today] = useState(() => new Date())
    const defaultFrom = useMemo(
        () => new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        [today],
    )

    const [{ from, to, period }, setFilters] = useQueryStates({
        from: parseAsIsoDate.withDefault(defaultFrom),
        to: parseAsIsoDate.withDefault(today),
        period: parseAsStringLiteral(periodValues)
            .withDefault('month')
            .withOptions({ clearOnDefault: true }),
    })

    const dateRange = useMemo<DateRange>(() => ({ from, to }), [from, to])

    function setDateRange(range: DateRange) {
        void setFilters({ from: range.from, to: range.to })
    }

    return {
        today,
        dateRange,
        setDateRange,
        period,
        setPeriod: (value: Period) => {
            void setFilters({ period: value })
        },
    }
}
