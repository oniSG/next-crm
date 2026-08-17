'use client'

import { useMemo, useState } from 'react'
import {
    parseAsArrayOf,
    parseAsIsoDate,
    parseAsStringLiteral,
    useQueryState,
} from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import {
    DISCOUNT_CATEGORY_OPTIONS,
    PERIOD_OPTIONS,
    TEAM_OPTIONS,
    type Period,
} from './data'

const periodValues: string[] = PERIOD_OPTIONS.map((option) => option.value)
const teamValues: string[] = TEAM_OPTIONS.map((option) => option.value)
const categoryValues: string[] = DISCOUNT_CATEGORY_OPTIONS.map((option) => option.value)

const defaultFrom = new Date(2024, 4, 17)
const defaultTo = new Date(2026, 7, 15)

export function useFilters() {
    const [today] = useState(() => new Date())
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(defaultFrom),
    )
    const [to, setTo] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))
    const [period, setPeriod] = useQueryState(
        'period',
        parseAsStringLiteral(periodValues).withDefault('month'),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(teamValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [category, setCategory] = useQueryState(
        'category',
        parseAsStringLiteral(categoryValues).withDefault('all'),
    )

    const dateRange = useMemo<DateRange>(
        () => ({ from, to }),
        [from, to],
    )

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
        teams,
        setTeams,
        category,
        setCategory,
    }
}
