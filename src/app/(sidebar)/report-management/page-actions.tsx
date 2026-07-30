'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { useReportPeriod } from './report-period-context'

export function PageActions() {
    const { dateRange, setDateRange, today } = useReportPeriod()

    return (
        <>
            <DateRangeFilter value={dateRange} onChange={setDateRange} today={today} />
            <ExportButton
                dashboard="report-management"
                filename="report-management.pdf"
            />
        </>
    )
}
