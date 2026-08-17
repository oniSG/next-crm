'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    DEFAULT_SEASON,
    PARTNER_USAGE,
    SEASON_OPTIONS,
    TICKET_CATEGORY_SERIES,
    type PartnerId,
    type SeasonKey,
    type TicketCategoryKey,
} from './data'
import { setLiteralParam, setLiteralParams } from '@/lib/query-state'

const partnerValues = PARTNER_USAGE.map((partner) => partner.id) as [
    PartnerId,
    ...PartnerId[],
]
const seasonValues = SEASON_OPTIONS.map((option) => option.value) as [
    SeasonKey,
    ...SeasonKey[],
]
const categoryValues = TICKET_CATEGORY_SERIES as [
    TicketCategoryKey,
    ...TicketCategoryKey[],
]

export function useFilters() {
    const [partners, setPartners] = useQueryState(
        'partner',
        parseAsArrayOf(parseAsStringLiteral(partnerValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [categories, setCategories] = useQueryState(
        'category',
        parseAsArrayOf(parseAsStringLiteral(categoryValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [season, setSeason] = useQueryState(
        'season',
        parseAsStringLiteral(seasonValues).withDefault(DEFAULT_SEASON),
    )

    return {
        partners,
        setPartners: setLiteralParams(setPartners),
        categories,
        setCategories: setLiteralParams(setCategories),
        season,
        setSeason: setLiteralParam(setSeason),
    }
}
