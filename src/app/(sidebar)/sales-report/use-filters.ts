'use client'

import { useMemo, useState } from 'react'
import {
    parseAsArrayOf,
    parseAsIsoDate,
    parseAsStringLiteral,
    useQueryState,
    useQueryStates,
} from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    DISCOUNT_CATEGORY_OPTIONS,
    PERIOD_OPTIONS,
    TEAM_OPTIONS,
    type Period,
} from './data'

const periodValues = PERIOD_OPTIONS.map((option) => option.value) as [
    Period,
    ...Period[],
]
const teamValues = TEAM_OPTIONS.map((option) => option.value) as [
    (typeof TEAM_OPTIONS)[number]['value'],
    ...(typeof TEAM_OPTIONS)[number]['value'][],
]
const categoryValues = DISCOUNT_CATEGORY_OPTIONS.map((option) => option.value) as [
    (typeof DISCOUNT_CATEGORY_OPTIONS)[number]['value'],
    ...(typeof DISCOUNT_CATEGORY_OPTIONS)[number]['value'][],
]

const defaultFrom = new Date(2024, 4, 17)
const defaultTo = new Date(2026, 7, 15)

export function useFilters() {
    const [today] = useState(() => new Date())
    const [{ from, to }, setRange] = useQueryStates({
        from: parseAsIsoDate.withDefault(defaultFrom),
        to: parseAsIsoDate.withDefault(defaultTo),
    })
    const [period, setPeriod] = useQueryState(
        'period',
        parseAsStringLiteral(periodValues)
            .withDefault('month')
            .withOptions({ clearOnDefault: true }),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(teamValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [category, setCategory] = useQueryState(
        'category',
        parseAsStringLiteral(categoryValues)
            .withDefault('all')
            .withOptions({ clearOnDefault: true }),
    )

    const dateRange = useMemo<DateRange>(
        () => ({ from, to }),
        [from, to],
    )

    function setDateRange(range: DateRange) {
        void setRange({ from: range.from, to: range.to })
    }

    return {
        today,
        dateRange,
        setDateRange,
        period,
        setPeriod,
        teams,
        setTeams,
        category,
        setCategory,
    }
}
