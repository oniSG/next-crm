'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

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
    const [from, setFrom] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(new Date(2026, 0, 1)),
    )
    const [to, setTo] = useQueryState(
        'to',
        parseAsIsoDate.withDefault(new Date(2026, 5, 30)),
    )
    const dateRange = { from, to }

    function setDateRange(value: DateRange) {
        void setFrom(value.from)
        void setTo(value.to)
    }

    return (
        <ReportPeriodContext.Provider
            value={{
                dateRange,
                setDateRange,
                today,
                periodFrom: toPeriod(from),
                periodTo: toPeriod(to),
            }}
        >
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
