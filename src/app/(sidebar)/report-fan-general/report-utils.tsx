'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import type { Period } from './data'

type PeriodContextValue = {
    period: Period
    setPeriod: (period: Period) => void
}

const PeriodContext = createContext<PeriodContextValue | null>(null)

export function PeriodProvider({ children }: { children: ReactNode }) {
    const [period, setPeriod] = useState<Period>('month')

    return (
        <PeriodContext.Provider value={{ period, setPeriod }}>
            {children}
        </PeriodContext.Provider>
    )
}

export function usePeriod() {
    const context = useContext(PeriodContext)
    if (!context) {
        throw new Error('usePeriod must be used within PeriodProvider')
    }
    return context
}

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

function formatDayLabel(date: string) {
    const [, month, day] = date.split('-')
    return `${Number(day)}.${Number(month)}.`
}

function formatMonthLabel(date: string) {
    const [year, month] = date.split('-')
    return `${MONTH_LABELS[Number(month) - 1]} ${year}`
}

function formatYearLabel(date: string) {
    return date.slice(0, 4)
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
        const slice = data.slice(-90)
        return slice.map((row) => ({
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
