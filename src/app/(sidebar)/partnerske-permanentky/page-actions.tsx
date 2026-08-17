'use client'

import { DateRangeFilter } from '@/components/custom/filters/date-range-filter'
import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { TICKET_CATEGORY_OPTIONS } from './data'
import { usePartnerSeasonTicketsFilters } from './use-partner-season-tickets-filters'

export function PageActions() {
    const {
        today,
        dateRange,
        setDateRange,
        categories,
        setCategories,
    } = usePartnerSeasonTicketsFilters()

    return (
        <>
            <DateRangeFilter
                value={dateRange}
                onChange={setDateRange}
                today={today}
            />
            <MultiSelectFilter
                options={TICKET_CATEGORY_OPTIONS}
                value={categories}
                onChange={setCategories}
                leadingLabel="Kategorie"
                placeholder="Vše"
                className="w-56"
            />
            <ExportButton
                dashboard="partnerske-permanentky"
                filename="partnerske-permanentky.pdf"
            />
        </>
    )
}
