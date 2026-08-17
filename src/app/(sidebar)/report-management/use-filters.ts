'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryStates } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 5, 30)

export function useFilters() {
    const [today] = useState(() => new Date())
    const [{ from, to }, setRange] = useQueryStates({
        from: parseAsIsoDate.withDefault(defaultFrom),
        to: parseAsIsoDate.withDefault(defaultTo),
    })

    const dateRange = useMemo<DateRange>(() => ({ from, to }), [from, to])

    function setDateRange(range: DateRange) {
        void setRange({ from: range.from, to: range.to })
    }

    return {
        today,
        dateRange,
        setDateRange,
    }
}
