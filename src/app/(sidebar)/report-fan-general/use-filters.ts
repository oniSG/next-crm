'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import { PERIOD_OPTIONS, type Period } from './data'

const periodValues = PERIOD_OPTIONS.map((option) => option.value)

export function useFilters() {
    const [today] = useState(() => new Date())
    const defaultFrom = useMemo(
        () => new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        [today],
    )

    const [from, setFrom] = useQueryState('from', parseAsIsoDate)
    const [to, setTo] = useQueryState('to', parseAsIsoDate)
    const [period, setPeriod] = useQueryState(
        'period',
        parseAsStringLiteral(periodValues)
            .withDefault('month')
            .withOptions({ clearOnDefault: true }),
    )

    const dateRange: DateRange = {
        from: from ?? defaultFrom,
        to: to ?? today,
    }

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    return {
        today,
        dateRange,
        setDateRange,
        period: period as Period,
        setPeriod,
    }
}
