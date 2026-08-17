import {
    PARTNER_EVENTS,
    SEASON_STATS,
    PARTNERS_TOTAL,
    TICKET_CATEGORY_SERIES,
    computeKpis,
    filterEventsByDate,
    getCategoryUtilization,
    getFilterScale,
    getPartnerUsageRows,
    getSeasonDateRange,
    getTopEvents,
    getUsageTimeline,
    type PartnerId,
    type SeasonKey,
    type TicketCategoryKey,
} from './data'

export type PartnerSeasonTicketsFilterState = {
    partners: PartnerId[]
    categories: TicketCategoryKey[]
    season: SeasonKey
}

function resolveCategories(categories: TicketCategoryKey[]): TicketCategoryKey[] {
    return categories.length === 0 ? [...TICKET_CATEGORY_SERIES] : categories
}

export function getPartnerSeasonTicketsData(
    filters: PartnerSeasonTicketsFilterState,
) {
    const { from, to } = getSeasonDateRange(filters.season)
    const selectedCategories = resolveCategories(filters.categories)
    const filterScale = getFilterScale(filters.partners, filters.categories)
    const seasonStats = SEASON_STATS[filters.season]
    const partnerFiltered = filters.partners.length > 0

    const filteredEvents = filterEventsByDate(PARTNER_EVENTS, from, to).map(
        (event) => ({
            ...event,
            visits: Math.round(event.visits * filterScale),
        }),
    )

    const scaledIssued = Math.max(0, Math.round(seasonStats.issued * filterScale))
    const scaledUsed = Math.max(0, Math.round(seasonStats.used * filterScale))

    const kpis = computeKpis(filteredEvents, {
        issued: scaledIssued,
        used: scaledUsed,
        partnersTotal: partnerFiltered
            ? filters.partners.length
            : PARTNERS_TOTAL,
        partnersActive: partnerFiltered
            ? filters.partners.length
            : seasonStats.partnersActive,
    })

    return {
        kpis,
        timeline: getUsageTimeline(filteredEvents),
        topEvents: getTopEvents(filteredEvents),
        categoryUtilization: getCategoryUtilization(
            selectedCategories,
            filters.partners,
        ),
        partnerUsage: getPartnerUsageRows(
            selectedCategories,
            filters.partners,
        ),
        selectedCategories,
    }
}
