'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { PERIOD_OPTIONS, type Period } from './data'
import { useFilters } from './use-filters'

const periodValues = PERIOD_OPTIONS.map((option) => option.value)

export function PageActions() {
    const { period, setPeriod, dateRange, setDateRange, today } = useFilters()

    return (
        <>
            <SelectFilter
                options={PERIOD_OPTIONS}
                value={period}
                onChange={(value) => {
                    if (periodValues.includes(value as Period)) {
                        void setPeriod(value as Period)
                    }
                }}
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
