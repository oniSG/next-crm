'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs'

import type { DateRange } from '@/components/custom/filters/date-presets'

import type { Period, RevenueByDatePoint, RevenuePoint } from './data'

const PERIODS = ['day', 'month', 'year'] as const satisfies readonly Period[]

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
            .withDefault('day')
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

export function filterByDateRange(
    data: RevenueByDatePoint[],
    range: DateRange,
): RevenueByDatePoint[] {
    const from = toDateKey(range.from)
    const to = toDateKey(range.to)
    return data.filter((row) => row.period >= from && row.period <= to)
}

/** Redistribute channel mix so totals match the filtered date range. */
export function scaleChannelsToPeriodTotal(
    channels: RevenuePoint[],
    periodTotal: number,
): RevenuePoint[] {
    const seedTotal = channels.reduce((sum, channel) => sum + channel.revenue, 0)
    if (seedTotal === 0) {
        return channels.map((channel) => ({ ...channel, revenue: 0 }))
    }

    return channels.map((channel) => ({
        ...channel,
        revenue: Math.round((channel.revenue / seedTotal) * periodTotal),
    }))
}

export function aggregateByPeriod(
    data: RevenueByDatePoint[],
    period: Period,
): RevenueByDatePoint[] {
    if (period === 'day') {
        return data.map((row) => ({
            ...row,
            label: formatDayLabel(row.period),
        }))
    }

    const groups = new Map<string, RevenueByDatePoint[]>()

    for (const row of data) {
        const key =
            period === 'month'
                ? formatMonthLabel(row.period)
                : formatYearLabel(row.period)
        const bucket = groups.get(key) ?? []
        bucket.push(row)
        groups.set(key, bucket)
    }

    return Array.from(groups.entries()).map(([label, rows]) => {
        const revenue = rows.reduce((sum, row) => sum + row.revenue, 0)
        return {
            id: label,
            period: rows[0]?.period ?? label,
            label,
            revenue,
        }
    })
}
