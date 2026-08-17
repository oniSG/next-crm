import type { ChartConfig } from '@/components/ui/chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})
const eventDateFormatter = new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
})
const eventDateLongFormatter = new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
})

export function formatCount(value: number) {
    return numberFormatter.format(value)
}

export function formatPercent(value: number) {
    return `${percentFormatter.format(value)} %`
}

export function formatEventDate(isoDate: string) {
    return eventDateFormatter.format(new Date(`${isoDate}T00:00:00`))
}

export function formatEventDateLong(isoDate: string) {
    return eventDateLongFormatter.format(new Date(`${isoDate}T00:00:00`))
}

export const TICKET_CATEGORIES = [
    { key: 'klub', label: 'Klub' },
    { key: 'partneri', label: 'Partneři' },
    { key: 'sezonni', label: 'Sezónní' },
    { key: 'sezonniVerni', label: 'Sezónní věrní' },
    { key: 'sezonniMmhk', label: 'Sezónní - MMHK' },
    { key: 'skybox', label: 'Skybox' },
    { key: 'vipGold', label: 'VIP Gold' },
    { key: 'vipSilver', label: 'VIP Silver' },
] as const

export type TicketCategoryKey = (typeof TICKET_CATEGORIES)[number]['key']

export const TICKET_CATEGORY_OPTIONS = TICKET_CATEGORIES.map((category) => ({
    value: category.key,
    label: category.label,
}))

export const TICKET_CATEGORY_SERIES = TICKET_CATEGORIES.map((category) => category.key)

export const TICKET_CATEGORY_CONFIG = {
    klub: { label: 'Klub', color: 'var(--chart-3)' },
    partneri: { label: 'Partneři', color: 'var(--chart-5)' },
    sezonni: { label: 'Sezónní', color: 'var(--chart-4)' },
    sezonniVerni: { label: 'Sezónní věrní', color: 'var(--chart-1)' },
    sezonniMmhk: { label: 'Sezónní - MMHK', color: 'var(--chart-2)' },
    skybox: { label: 'Skybox', color: 'var(--chart-6)' },
    vipGold: { label: 'VIP Gold', color: 'var(--chart-8)' },
    vipSilver: { label: 'VIP Silver', color: 'var(--chart-7)' },
} satisfies ChartConfig

export const USAGE_OVER_TIME_CONFIG = {
    visits: { label: 'Návštěvy', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const USAGE_OVER_TIME_SERIES = ['visits'] as const

export type PartnerEvent = {
    date: string
    opponent: string
    visits: number
}

export const PARTNER_EVENTS: PartnerEvent[] = [
    { date: '2025-08-07', opponent: 'BK Mladá Boleslav', visits: 142 },
    { date: '2025-08-22', opponent: 'HC Vítkovice Ridera', visits: 168 },
    { date: '2025-09-05', opponent: 'HC Kometa Brno', visits: 196 },
    { date: '2025-09-12', opponent: 'HC Škoda Plzeň', visits: 211 },
    { date: '2025-09-19', opponent: 'Bílí Tygři Liberec', visits: 154 },
    { date: '2025-09-26', opponent: 'HC Energie Karlovy Vary', visits: 138 },
    { date: '2025-10-03', opponent: 'HC Sparta Praha', visits: 248 },
    { date: '2025-10-05', opponent: 'HC Olomouc', visits: 121 },
    { date: '2025-10-12', opponent: 'HC Dynamo Pardubice', visits: 286 },
    { date: '2025-10-17', opponent: 'PSG Berani Zlín', visits: 133 },
    { date: '2025-10-24', opponent: 'Rytíři Kladno', visits: 147 },
    { date: '2025-10-31', opponent: 'HC Litvínov', visits: 176 },
    { date: '2025-11-07', opponent: 'HC Oceláři Třinec', visits: 229 },
    { date: '2025-11-14', opponent: 'HC Vítkovice Ridera', visits: 164 },
    { date: '2025-11-21', opponent: 'HC Kometa Brno', visits: 201 },
    { date: '2025-11-29', opponent: 'HC Škoda Plzeň', visits: 188 },
    { date: '2025-12-05', opponent: 'Bílí Tygři Liberec', visits: 172 },
    { date: '2025-12-12', opponent: 'HC Energie Karlovy Vary', visits: 119 },
    { date: '2025-12-19', opponent: 'HC Sparta Praha', visits: 230 },
    { date: '2025-12-26', opponent: 'HC Olomouc', visits: 158 },
    { date: '2026-01-02', opponent: 'BK Mladá Boleslav', visits: 136 },
    { date: '2026-01-09', opponent: 'HC Dynamo Pardubice', visits: 254 },
    { date: '2026-01-16', opponent: 'PSG Berani Zlín', visits: 129 },
    { date: '2026-01-23', opponent: 'Rytíři Kladno', visits: 161 },
    { date: '2026-01-30', opponent: 'HC Litvínov', visits: 174 },
    { date: '2026-02-06', opponent: 'HC Oceláři Třinec', visits: 237 },
    { date: '2026-02-13', opponent: 'HC Vítkovice Ridera', visits: 149 },
    { date: '2026-02-20', opponent: 'HC Kometa Brno', visits: 183 },
    { date: '2026-02-27', opponent: 'HC Škoda Plzeň', visits: 166 },
    { date: '2026-03-06', opponent: 'Bílí Tygři Liberec', visits: 192 },
    { date: '2026-03-13', opponent: 'HC Energie Karlovy Vary', visits: 144 },
    { date: '2026-03-20', opponent: 'HC Oceláři Třinec', visits: 304 },
    { date: '2026-03-22', opponent: 'HC Sparta Praha', visits: 208 },
    { date: '2026-03-27', opponent: 'HC Oceláři Třinec', visits: 297 },
    { date: '2026-04-03', opponent: 'HC Dynamo Pardubice', visits: 226 },
    { date: '2026-04-07', opponent: 'HC Olomouc', visits: 151 },
    { date: '2026-04-10', opponent: 'Rytíři Kladno', visits: 139 },
    { date: '2026-04-14', opponent: 'HC Litvínov', visits: 145 },
    { date: '2026-04-17', opponent: 'PSG Berani Zlín', visits: 128 },
    // 2024/25
    { date: '2024-08-08', opponent: 'BK Mladá Boleslav', visits: 128 },
    { date: '2024-08-23', opponent: 'HC Vítkovice Ridera', visits: 151 },
    { date: '2024-09-06', opponent: 'HC Kometa Brno', visits: 178 },
    { date: '2024-09-13', opponent: 'HC Škoda Plzeň', visits: 194 },
    { date: '2024-09-20', opponent: 'Bílí Tygři Liberec', visits: 142 },
    { date: '2024-10-04', opponent: 'HC Sparta Praha', visits: 231 },
    { date: '2024-10-11', opponent: 'HC Dynamo Pardubice', visits: 268 },
    { date: '2024-10-18', opponent: 'PSG Berani Zlín', visits: 121 },
    { date: '2024-11-08', opponent: 'HC Oceláři Třinec', visits: 214 },
    { date: '2024-11-22', opponent: 'HC Kometa Brno', visits: 186 },
    { date: '2024-12-06', opponent: 'Bílí Tygři Liberec', visits: 159 },
    { date: '2024-12-20', opponent: 'HC Sparta Praha', visits: 218 },
    { date: '2025-01-10', opponent: 'HC Dynamo Pardubice', visits: 241 },
    { date: '2025-02-07', opponent: 'HC Oceláři Třinec', visits: 223 },
    { date: '2025-03-07', opponent: 'Bílí Tygři Liberec', visits: 181 },
    { date: '2025-03-21', opponent: 'HC Oceláři Třinec', visits: 276 },
    { date: '2025-04-04', opponent: 'HC Dynamo Pardubice', visits: 208 },
    { date: '2025-04-11', opponent: 'Rytíři Kladno', visits: 127 },
]

export const TOP_PARTNERS_LIMIT = 100

export const ISSUED_SEASON_TICKETS = 408
export const USED_SEASON_TICKETS = 374
export const PARTNERS_TOTAL = 50
export const PARTNERS_ACTIVE = 50

export const CATEGORY_UTILIZATION: Record<TicketCategoryKey, number> = {
    sezonniMmhk: 62.4,
    vipGold: 55.1,
    sezonniVerni: 48.6,
    vipSilver: 41.8,
    skybox: 34.9,
    partneri: 29.7,
    sezonni: 21.4,
    klub: 14.8,
}

export type PartnerUsage = {
    id: string
    name: string
    byCategory: Partial<Record<TicketCategoryKey, number>>
}

export const DEFAULT_SEASON = '2025-26'

export const SEASON_OPTIONS = [
    { value: '2025-26', label: '2025/26' },
    { value: '2024-25', label: '2024/25' },
] as const

export type SeasonKey = (typeof SEASON_OPTIONS)[number]['value']

export const SEASON_STATS: Record<
    SeasonKey,
    { issued: number; used: number; partnersActive: number }
> = {
    '2025-26': { issued: 408, used: 374, partnersActive: 50 },
    '2024-25': { issued: 392, used: 358, partnersActive: 47 },
}

export const SEASON_RANGES: Record<SeasonKey, { from: Date; to: Date }> = {
    '2025-26': { from: new Date(2025, 7, 1), to: new Date(2026, 3, 30) },
    '2024-25': { from: new Date(2024, 7, 1), to: new Date(2025, 3, 30) },
}

export function getSeasonDateRange(season: string) {
    return SEASON_RANGES[season as SeasonKey] ?? SEASON_RANGES[DEFAULT_SEASON]
}

export const PARTNER_USAGE: PartnerUsage[] = [
    {
        id: 'advokatni-kancelar-slezak',
        name: 'Advokátní kancelář Slezák a partneři',
        byCategory: { vipGold: 38.2, partneri: 22.1, sezonniMmhk: 18.4 },
    },
    {
        id: 'astor-komplex',
        name: 'ASTOR-KOMPLEX s.r.o.',
        byCategory: { vipSilver: 31.6, skybox: 24.8, sezonniVerni: 16.2 },
    },
    {
        id: 'audit-eu',
        name: 'Audit EU s.r.o.',
        byCategory: { sezonniMmhk: 29.4, sezonni: 17.8, klub: 11.3 },
    },
    {
        id: 'axam',
        name: 'AXAM spol. s r.o.',
        byCategory: { partneri: 26.7, sezonniVerni: 20.5, vipGold: 15.9 },
    },
    {
        id: 'ricoh-czech-republic',
        name: 'RICOH Czech Republic',
        byCategory: { vipGold: 41.2, sezonniMmhk: 33.8 },
    },
    {
        id: 'msv-vytahy',
        name: 'MSV výtahy, a.s.',
        byCategory: { vipGold: 28.4, sezonniMmhk: 24.1, sezonniVerni: 19.6 },
    },
    {
        id: 'logex-logistics',
        name: 'LogEx Logistics s.r.o.',
        byCategory: { vipGold: 70.2 },
    },
    {
        id: 'gastro-hk',
        name: 'GASTRO-HK s.r.o.',
        byCategory: {
            partneri: 18.4,
            sezonni: 16.1,
            sezonniVerni: 15.8,
            sezonniMmhk: 17.2,
        },
    },
    {
        id: 'cez-esco',
        name: 'ČEZ ESCO',
        byCategory: { vipSilver: 32.6, skybox: 28.4 },
    },
    {
        id: 'petrof',
        name: 'Petrof, spol. s r.o.',
        byCategory: { vipGold: 22.8, vipSilver: 21.4, sezonniMmhk: 14.9 },
    },
    {
        id: 'trelleborg-bohemia',
        name: 'Trelleborg Bohemia',
        byCategory: { sezonniVerni: 26.3, sezonni: 18.7, klub: 12.4 },
    },
    {
        id: 'autocont',
        name: 'AutoCont a.s.',
        byCategory: { vipSilver: 29.1, partneri: 16.8, skybox: 11.2 },
    },
    {
        id: 'kiekert-cs',
        name: 'Kiekert-CS s.r.o.',
        byCategory: { sezonniMmhk: 27.5, sezonniVerni: 18.6 },
    },
    {
        id: 'continental-barum',
        name: 'Continental Barum',
        byCategory: { skybox: 24.8, klub: 13.1, partneri: 9.4 },
    },
    {
        id: 'synot-tip',
        name: 'Synot Tip',
        byCategory: { vipGold: 21.7, partneri: 14.6, sezonni: 8.9 },
    },
    {
        id: 'premedis',
        name: 'Premedis s.r.o.',
        byCategory: { sezonniVerni: 19.4, sezonni: 12.8, klub: 8.2 },
    },
]

export type PartnerId = (typeof PARTNER_USAGE)[number]['id']

export const PARTNER_FILTER_OPTIONS = PARTNER_USAGE.map((partner) => ({
    value: partner.id,
    label: partner.name,
}))

export const CATEGORY_FILTER_OPTIONS = TICKET_CATEGORY_OPTIONS

export type UsageTimelinePoint = {
    date: string
    opponent: string
    label: string
    event: string
    visits: number
}

export type TopEventPoint = {
    label: string
    event: string
    visits: number
}

function shortOpponent(opponent: string) {
    return opponent.replace(/^(HC|BK|PSG)\s+/u, '').replace(/\s+Ridera$/u, '')
}

export function getTopEvents(events: PartnerEvent[], limit = 3): TopEventPoint[] {
    return [...events]
        .sort((a, b) => b.visits - a.visits || a.date.localeCompare(b.date))
        .slice(0, limit)
        .map((event) => ({
            label: `${formatEventDate(event.date)} · ${shortOpponent(event.opponent)}`,
            event: `${formatEventDateLong(event.date)} – Mountfield HK – ${event.opponent}`,
            visits: event.visits,
        }))
}

export type CategoryUtilizationPoint = {
    label: string
    key: TicketCategoryKey
    utilization: number
}

export type PartnerUsagePoint = {
    label: string
} & Record<string, string | number>

export function filterEventsByDate(events: PartnerEvent[], from: Date, to: Date) {
    const fromTime = new Date(from)
    fromTime.setHours(0, 0, 0, 0)
    const toTime = new Date(to)
    toTime.setHours(23, 59, 59, 999)

    return events.filter((event) => {
        const time = new Date(`${event.date}T00:00:00`).getTime()
        return time >= fromTime.getTime() && time <= toTime.getTime()
    })
}

export function getUsageTimeline(events: PartnerEvent[]): UsageTimelinePoint[] {
    return events.map((event) => ({
        date: event.date,
        opponent: event.opponent,
        label: formatEventDate(event.date),
        event: `Mountfield HK – ${event.opponent}`,
        visits: event.visits,
    }))
}

export function partnerUsageWeight(
    partner: PartnerUsage,
    categories: readonly TicketCategoryKey[] = TICKET_CATEGORY_SERIES,
) {
    return categories.reduce((sum, key) => sum + (partner.byCategory[key] ?? 0), 0)
}

export function getPartnersShare(partnerIds: readonly PartnerId[]) {
    if (partnerIds.length === 0) return 1

    const totalWeight = PARTNER_USAGE.reduce(
        (sum, row) => sum + partnerUsageWeight(row),
        0,
    )
    const selectedWeight = PARTNER_USAGE.filter((row) =>
        partnerIds.includes(row.id),
    ).reduce((sum, row) => sum + partnerUsageWeight(row), 0)

    return totalWeight > 0 ? selectedWeight / totalWeight : 1
}

export function getCategoriesShare(categoryKeys: readonly TicketCategoryKey[]) {
    if (categoryKeys.length === 0) return 1

    const totalSum = TICKET_CATEGORY_SERIES.reduce(
        (sum, key) => sum + CATEGORY_UTILIZATION[key],
        0,
    )
    const selectedSum = categoryKeys.reduce(
        (sum, key) => sum + CATEGORY_UTILIZATION[key],
        0,
    )

    return totalSum > 0 ? selectedSum / totalSum : 1
}

export function getFilterScale(
    partners: readonly PartnerId[],
    categories: readonly TicketCategoryKey[],
) {
    return getPartnersShare(partners) * getCategoriesShare(categories)
}

function averagePartnerCategoryUtil(
    partners: PartnerUsage[],
    categoryKey: TicketCategoryKey,
) {
    const values = partners
        .map((partner) => partner.byCategory[categoryKey] ?? 0)
        .filter((value) => value > 0)

    if (values.length === 0) return 0

    return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function getCategoryUtilization(
    categories: readonly TicketCategoryKey[],
    partnerIds: readonly PartnerId[] = [],
): CategoryUtilizationPoint[] {
    const partners =
        partnerIds.length === 0
            ? null
            : PARTNER_USAGE.filter((row) => partnerIds.includes(row.id))

    return TICKET_CATEGORIES.filter((category) => categories.includes(category.key))
        .map((category) => ({
            label: category.label,
            key: category.key,
            utilization: partners
                ? averagePartnerCategoryUtil(partners, category.key)
                : CATEGORY_UTILIZATION[category.key],
        }))
        .filter(
            (row) =>
                partnerIds.length === 0 ||
                row.utilization > 0 ||
                categories.length === 1,
        )
        .sort((a, b) => b.utilization - a.utilization)
}

export function getPartnerUsageRows(
    categories: readonly TicketCategoryKey[],
    partnerIds: readonly PartnerId[] = [],
    limit: number = TOP_PARTNERS_LIMIT,
): PartnerUsagePoint[] {
    const categorySet = new Set(categories)
    const partners =
        partnerIds.length === 0
            ? PARTNER_USAGE
            : PARTNER_USAGE.filter((partner) => partnerIds.includes(partner.id))

    return partners
        .map((partner) => {
            const row: PartnerUsagePoint = { label: partner.name }
            for (const category of TICKET_CATEGORIES) {
                const value = partner.byCategory[category.key] ?? 0
                row[category.key] = categorySet.has(category.key) ? value : 0
            }
            return row
        })
        .sort((a, b) => partnerTotal(b, categories) - partnerTotal(a, categories))
        .slice(0, partnerIds.length === 0 ? limit : undefined)
}

function partnerTotal(row: PartnerUsagePoint, categories: readonly TicketCategoryKey[]) {
    return categories.reduce((sum, key) => {
        const value = row[key]
        return sum + (typeof value === 'number' ? value : 0)
    }, 0)
}

export function computeKpis(
    events: PartnerEvent[],
    options?: {
        issued?: number
        used?: number
        partnersTotal?: number
        partnersActive?: number
    },
) {
    const visits = events.reduce((sum, event) => sum + event.visits, 0)
    const eventCount = events.length
    const issued = options?.issued ?? ISSUED_SEASON_TICKETS
    const availableSlots = issued * eventCount
    const averageUtilization = availableSlots > 0 ? (visits / availableSlots) * 100 : 0

    return {
        issued,
        used: options?.used ?? USED_SEASON_TICKETS,
        partnersTotal: options?.partnersTotal ?? PARTNERS_TOTAL,
        partnersActive: options?.partnersActive ?? PARTNERS_ACTIVE,
        visits,
        eventCount,
        averageUtilization,
    }
}

export const USAGE_TIMELINE_COLUMNS: SimpleTableColumn<UsageTimelinePoint>[] = [
    {
        id: 'date',
        header: 'Datum',
        cell: (row) => formatEventDateLong(row.date),
    },
    {
        id: 'event',
        header: 'Událost',
        cell: (row) => row.event,
    },
    {
        id: 'visits',
        header: 'Návštěvy',
        cell: (row) => formatCount(row.visits),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export const TOP_EVENT_COLUMNS: SimpleTableColumn<TopEventPoint>[] = [
    {
        id: 'event',
        header: 'Událost',
        cell: (row) => row.event,
    },
    {
        id: 'visits',
        header: 'Návštěvy',
        cell: (row) => formatCount(row.visits),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export const CATEGORY_UTILIZATION_COLUMNS: SimpleTableColumn<CategoryUtilizationPoint>[] =
    [
        {
            id: 'category',
            header: 'Kategorie',
            cell: (row) => row.label,
        },
        {
            id: 'utilization',
            header: 'Využití',
            cell: (row) => formatPercent(row.utilization),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
    ]

export function buildPartnerUsageColumns(
    categories: readonly TicketCategoryKey[],
): SimpleTableColumn<PartnerUsagePoint>[] {
    const categoryColumns: SimpleTableColumn<PartnerUsagePoint>[] =
        TICKET_CATEGORIES.filter((category) => categories.includes(category.key)).map(
            (category) => ({
                id: category.key,
                header: category.label,
                cell: (row) => {
                    const value = row[category.key]
                    return typeof value === 'number' ? formatPercent(value) : '—'
                },
                cellClassName: 'text-right',
                headerClassName: 'text-right',
            }),
        )

    return [
        {
            id: 'partner',
            header: 'Partner',
            cell: (row) => row.label,
            cellClassName: 'font-medium',
        },
        ...categoryColumns,
        {
            id: 'total',
            header: 'Celkem',
            cell: (row) => formatPercent(partnerTotal(row, categories)),
            cellClassName: 'text-right font-medium',
            headerClassName: 'text-right',
        },
    ]
}
