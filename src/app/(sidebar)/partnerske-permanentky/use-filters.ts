'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    DEFAULT_SEASON,
    PARTNER_FILTER_OPTIONS,
    SEASON_OPTIONS,
    TICKET_CATEGORY_SERIES,
    type PartnerId,
    type SeasonKey,
    type TicketCategoryKey,
} from './data'

const partnerValues: string[] = PARTNER_FILTER_OPTIONS.map((option) => option.value)
const seasonValues: string[] = SEASON_OPTIONS.map((option) => option.value)

export function useFilters() {
    const [partners, setPartners] = useQueryState(
        'partner',
        parseAsArrayOf(parseAsStringLiteral(partnerValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [categories, setCategories] = useQueryState(
        'category',
        parseAsArrayOf(parseAsStringLiteral([...TICKET_CATEGORY_SERIES] as string[]))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [season, setSeason] = useQueryState(
        'season',
        parseAsStringLiteral(seasonValues).withDefault(DEFAULT_SEASON),
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
