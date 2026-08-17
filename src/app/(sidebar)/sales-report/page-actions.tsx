'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    DISCOUNT_CATEGORY_OPTIONS,
    PERIOD_OPTIONS,
    TEAM_OPTIONS,
} from './data'
import { useFilters } from './use-filters'

export function PageActions() {
    const {
        today,
        dateRange,
        setDateRange,
        period,
        setPeriod,
        teams,
        setTeams,
        category,
        setCategory,
    } = useFilters()

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
                onChange={setPeriod}
                leadingLabel="Období"
                className="min-w-0 w-auto"
            />
            <MultiSelectFilter
                options={TEAM_OPTIONS}
                value={teams}
                onChange={setTeams}
                leadingLabel="Tým"
                placeholder="Vše"
                className="w-52"
            />
            <SelectFilter
                options={DISCOUNT_CATEGORY_OPTIONS}
                value={category}
                onChange={setCategory}
                leadingLabel="Kategorie slev"
            />
            <ExportButton dashboard="sales-report" filename="sales-report.pdf" />
        </>
    )
}
