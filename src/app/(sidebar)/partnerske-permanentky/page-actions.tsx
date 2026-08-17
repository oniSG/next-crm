'use client'

import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    CATEGORY_FILTER_OPTIONS,
    PARTNER_FILTER_OPTIONS,
    SEASON_OPTIONS,
} from './data'
import { usePartnerSeasonTicketsFilters } from './use-partner-season-tickets-filters'

export function PageActions() {
    const { partner, setPartner, category, setCategory, season, setSeason } =
        usePartnerSeasonTicketsFilters()

    return (
        <>
            <SelectFilter
                options={PARTNER_FILTER_OPTIONS}
                value={partner}
                onChange={setPartner}
                leadingLabel="Partner"
            />
            <SelectFilter
                options={CATEGORY_FILTER_OPTIONS}
                value={category}
                onChange={setCategory}
                leadingLabel="Kategorie"
            />
            <SelectFilter
                options={SEASON_OPTIONS}
                value={season}
                onChange={setSeason}
                leadingLabel="Sezona"
            />
            <ExportButton
                dashboard="partnerske-permanentky"
                filename="partnerske-permanentky.pdf"
            />
        </>
    )
}
