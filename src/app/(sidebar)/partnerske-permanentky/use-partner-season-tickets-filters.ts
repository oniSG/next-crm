'use client'

import { useFilterParam } from '@/lib/alumni/use-filter-param'

import {
    ALL_CATEGORIES_VALUE,
    ALL_PARTNERS_VALUE,
    CATEGORY_FILTER_OPTIONS,
    DEFAULT_SEASON,
    PARTNER_FILTER_OPTIONS,
    SEASON_OPTIONS,
    type CategoryFilterValue,
    type PartnerFilterValue,
    type SeasonKey,
} from './data'

const partnerValues = PARTNER_FILTER_OPTIONS.map((option) => option.value)
const categoryValues = CATEGORY_FILTER_OPTIONS.map((option) => option.value)
const seasonValues = SEASON_OPTIONS.map((option) => option.value)

export function usePartnerSeasonTicketsFilters() {
    const [partner, setPartner] = useFilterParam(
        'partner',
        partnerValues,
        ALL_PARTNERS_VALUE,
    )
    const [category, setCategory] = useFilterParam(
        'category',
        categoryValues,
        ALL_CATEGORIES_VALUE,
    )
    const [season, setSeason] = useFilterParam(
        'season',
        seasonValues,
        DEFAULT_SEASON,
    )

    return {
        partner: partner as PartnerFilterValue,
        setPartner,
        category: category as CategoryFilterValue,
        setCategory,
        season: season as SeasonKey,
        setSeason,
    }
}
