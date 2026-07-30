'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { DateRange } from '@/components/custom/filters/date-presets'

type ReportPeriodContextValue = {
    dateRange: DateRange
    setDateRange: (value: DateRange) => void
    today: Date
    periodFrom: string
    periodTo: string
}

const ReportPeriodContext = createContext<ReportPeriodContextValue | null>(null)

function toPeriod(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function ReportPeriodProvider({ children }: { children: ReactNode }) {
    const [today] = useState(() => new Date())
    const [dateRange, setDateRange] = useState<DateRange>(() => ({
        from: new Date(2026, 0, 1),
        to: new Date(2026, 5, 30),
    }))

    const value = useMemo(
        () => ({
            dateRange,
            setDateRange,
            today,
            periodFrom: toPeriod(dateRange.from),
            periodTo: toPeriod(dateRange.to),
        }),
        [dateRange, today],
    )

    return (
        <ReportPeriodContext.Provider value={value}>
            {children}
        </ReportPeriodContext.Provider>
    )
}

export function useReportPeriod() {
    const context = useContext(ReportPeriodContext)
    if (!context) {
        throw new Error('useReportPeriod must be used within ReportPeriodProvider')
    }
    return context
}
