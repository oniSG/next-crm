'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { PERIOD_OPTIONS } from './data'
import { useFilters } from './use-filters'

export function PageActions() {
    const { period, setPeriod, dateRange, setDateRange, today } = useFilters()

    return (
        <>
            <SelectFilter
                options={PERIOD_OPTIONS}
                value={period}
                onChange={setPeriod}
                leadingLabel="Období"
                className="min-w-0 w-auto"
            />
            <DateRangeFilter value={dateRange} onChange={setDateRange} today={today} />
            <ExportButton
                dashboard="report-fan-general"
                filename="report-fan-general.pdf"
            />
        </>
    )
}
