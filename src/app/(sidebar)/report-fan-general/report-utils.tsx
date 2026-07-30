'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import type { Period } from './data'

const PERIODS = ['day', 'month', 'year'] as const satisfies readonly Period[]

export type ChartRow = {
    label: string
} & Record<string, string | number>

const MONTH_LABELS = [
    'Led',
    'Úno',
    'Bře',
    'Dub',
    'Kvě',
    'Čer',
    'Čvc',
    'Srp',
    'Zář',
    'Říj',
    'Lis',
    'Pro',
] as const

export function useReportPeriod() {
    return useQueryState(
        'period',
        parseAsStringLiteral(PERIODS)
            .withDefault('month')
            .withOptions({ clearOnDefault: true }),
    )
}

export function useReportDateRange() {
    const [today] = useState(() => new Date())
    const defaultFrom = useMemo(
        () => new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        [today],
    )

    const [from, setFrom] = useQueryState('from', parseAsIsoDate)
    const [to, setTo] = useQueryState('to', parseAsIsoDate)

    const dateRange: DateRange = {
        from: from ?? defaultFrom,
        to: to ?? today,
    }

    function setDateRange(range: DateRange) {
        void setFrom(range.from)
        void setTo(range.to)
    }

    return { today, dateRange, setDateRange }
}

function formatDayLabel(date: string) {
    const [year, month, day] = date.split('-')
    return `${Number(day)}.${Number(month)}.${year}`
}

function formatMonthLabel(date: string) {
    const [year, month] = date.split('-')
    return `${MONTH_LABELS[Number(month) - 1]} ${year}`
}

function formatYearLabel(date: string) {
    return date.slice(0, 4)
}

function toDateKey(date: Date) {
    return format(date, 'yyyy-MM-dd')
}

export function filterByDateRange<T extends { date: string }>(
    data: T[],
    range: DateRange,
): T[] {
    const from = toDateKey(range.from)
    const to = toDateKey(range.to)
    return data.filter((row) => row.date >= from && row.date <= to)
}

function sumMetrics(
    rows: Array<Record<string, string | number>>,
    series: readonly string[],
) {
    const totals: Record<string, number> = {}
    for (const key of series) totals[key] = 0
    for (const row of rows) {
        for (const key of series) {
            totals[key] += Number(row[key] ?? 0)
        }
    }
    return totals
}

export function aggregateByPeriod(
    data: Array<{ date: string } & Record<string, string | number>>,
    series: readonly string[],
    period: Period,
): ChartRow[] {
    if (period === 'day') {
        return data.map((row) => ({
            label: formatDayLabel(row.date),
            ...Object.fromEntries(series.map((key) => [key, Number(row[key])])),
        }))
    }

    const groups = new Map<
        string,
        Array<{ date: string } & Record<string, string | number>>
    >()

    for (const row of data) {
        const key =
            period === 'month' ? formatMonthLabel(row.date) : formatYearLabel(row.date)
        const bucket = groups.get(key) ?? []
        bucket.push(row)
        groups.set(key, bucket)
    }

    return Array.from(groups.entries()).map(([label, rows]) => ({
        label,
        ...sumMetrics(rows, series),
    }))
}
