'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    DISCOUNT_CATEGORY_OPTIONS,
    PERIOD_OPTIONS,
    TEAM_OPTIONS,
    type Period,
} from './data'
import { useSalesReportFilters } from './use-sales-report-filters'

const periodValues = PERIOD_OPTIONS.map((option) => option.value)

export function PageActions() {
    const {
        today,
        dateRange,
        setDateRange,
        period,
        setPeriod,
        team,
        setTeam,
        category,
        setCategory,
    } = useSalesReportFilters()

    return (
        <>
            <DateRangeFilter
                value={dateRange}
                onChange={setDateRange}
                today={today}
            />
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
            <SelectFilter
                options={TEAM_OPTIONS}
                value={team}
                onChange={(value) => void setTeam(value as typeof team)}
                leadingLabel="Tým"
            />
            <SelectFilter
                options={DISCOUNT_CATEGORY_OPTIONS}
                value={category}
                onChange={(value) => void setCategory(value as typeof category)}
                leadingLabel="Kategorie slev"
            />
            <ExportButton dashboard="sales-report" filename="sales-report.pdf" />
        </>
    )
}
