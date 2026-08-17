'use client'

import { useMemo, useState } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'
import { useMultiFilterParam } from '@/lib/alumni/use-filter-param'

import { TICKET_CATEGORY_OPTIONS } from './data'

const categoryValues = TICKET_CATEGORY_OPTIONS.map((option) => option.value)

const defaultFrom = new Date(2025, 7, 1)
const defaultTo = new Date(2026, 3, 30)

export function usePartnerSeasonTicketsFilters() {
    const [today] = useState(() => new Date())
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState(
        'to',
        parseAsIsoDate.withDefault(defaultTo),
    )
    const [categories, setCategories] = useMultiFilterParam(
        'category',
        categoryValues,
    )

    const dateRange = useMemo<DateRange>(() => ({ from, to }), [from, to])

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    return {
        today,
        dateRange,
        setDateRange,
        categories,
        setCategories,
    }
}
