'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 5, 30)

export function useFilters() {
    const [today] = useState(() => new Date())
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))

    const dateRange = useMemo<DateRange>(() => ({ from, to }), [from, to])

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    return {
        today,
        dateRange,
        setDateRange,
    }
}
