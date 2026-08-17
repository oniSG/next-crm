'use client'

import {
    useFilterParam,
    useMultiFilterParam,
} from '@/lib/alumni/use-filter-param'

import {
    CATEGORY_FILTER_OPTIONS,
    DEFAULT_SEASON,
    PARTNER_FILTER_OPTIONS,
    SEASON_OPTIONS,
    TICKET_CATEGORY_SERIES,
    type PartnerId,
    type SeasonKey,
    type TicketCategoryKey,
} from './data'

const partnerValues = PARTNER_FILTER_OPTIONS.map((option) => option.value)
const categoryValues = TICKET_CATEGORY_SERIES
const seasonValues = SEASON_OPTIONS.map((option) => option.value)

export function usePartnerSeasonTicketsFilters() {
    const [partners, setPartners] = useMultiFilterParam('partner', partnerValues)
    const [categories, setCategories] = useMultiFilterParam(
        'category',
        categoryValues,
    )
    const [season, setSeason] = useFilterParam(
        'season',
        seasonValues,
        DEFAULT_SEASON,
    )

    return {
        partners: partners as PartnerId[],
        setPartners,
        categories: categories as TicketCategoryKey[],
        setCategories,
        season: season as SeasonKey,
        setSeason,
    }
}
