'use client'

import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    CATEGORY_FILTER_OPTIONS,
    PARTNER_FILTER_OPTIONS,
    SEASON_OPTIONS,
} from './data'
import { usePartnerSeasonTicketsFilters } from './use-partner-season-tickets-filters'

export function PageActions() {
    const { partners, setPartners, categories, setCategories, season, setSeason } =
        usePartnerSeasonTicketsFilters()

    return (
        <>
            <MultiSelectFilter
                options={PARTNER_FILTER_OPTIONS}
                value={partners}
                onChange={(next) => {
                    void setPartners(next)
                }}
                leadingLabel="Partner"
                placeholder="Vše"
            />
            <MultiSelectFilter
                options={CATEGORY_FILTER_OPTIONS}
                value={categories}
                onChange={(next) => {
                    void setCategories(next)
                }}
                leadingLabel="Kategorie"
                placeholder="Vše"
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
