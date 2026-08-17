import {
    ALL_CATEGORIES_VALUE,
    ALL_PARTNERS_VALUE,
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
    type CategoryFilterValue,
    type PartnerFilterValue,
    type SeasonKey,
    type TicketCategoryKey,
} from './data'

export type PartnerSeasonTicketsFilterState = {
    partner: PartnerFilterValue
    category: CategoryFilterValue
    season: SeasonKey
}

function resolveCategories(
    category: CategoryFilterValue,
): TicketCategoryKey[] {
    return category === ALL_CATEGORIES_VALUE
        ? [...TICKET_CATEGORY_SERIES]
        : [category]
}

export function getPartnerSeasonTicketsData(
    filters: PartnerSeasonTicketsFilterState,
) {
    const { from, to } = getSeasonDateRange(filters.season)
    const selectedCategories = resolveCategories(filters.category)
    const filterScale = getFilterScale(filters.partner, filters.category)
    const seasonStats = SEASON_STATS[filters.season]
    const partnerFiltered = filters.partner !== ALL_PARTNERS_VALUE

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
        partnersTotal: partnerFiltered ? 1 : PARTNERS_TOTAL,
        partnersActive: partnerFiltered ? 1 : seasonStats.partnersActive,
    })

    return {
        kpis,
        timeline: getUsageTimeline(filteredEvents),
        topEvents: getTopEvents(filteredEvents),
        categoryUtilization: getCategoryUtilization(
            selectedCategories,
            filters.partner,
        ),
        partnerUsage: getPartnerUsageRows(
            selectedCategories,
            filters.partner,
        ),
        selectedCategories,
        hasEvents: filteredEvents.length > 0,
    }
}
