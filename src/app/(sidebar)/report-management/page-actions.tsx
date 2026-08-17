'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { useFilters } from './use-filters'

export function PageActions() {
    const { dateRange, setDateRange, today } = useFilters()

    return (
        <>
            <DateRangeFilter
                value={dateRange}
                onChange={setDateRange}
                today={today}
            />
            <ExportButton
                dashboard="report-management"
                filename="report-management.pdf"
            />
        </>
    )
}
