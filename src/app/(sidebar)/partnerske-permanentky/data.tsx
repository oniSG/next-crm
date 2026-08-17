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

export const TICKET_CATEGORY_SERIES = TICKET_CATEGORIES.map(
    (category) => category.key,
)

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
]

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
    name: string
    byCategory: Partial<Record<TicketCategoryKey, number>>
}

export const PARTNER_USAGE: PartnerUsage[] = [
    {
        name: 'RICOH Czech Republic',
        byCategory: { vipGold: 41.2, sezonniMmhk: 33.8 },
    },
    {
        name: 'MSV výtahy, a.s.',
        byCategory: { vipGold: 28.4, sezonniMmhk: 24.1, sezonniVerni: 19.6 },
    },
    {
        name: 'LogEx Logistics s.r.o.',
        byCategory: { vipGold: 70.2 },
    },
    {
        name: 'GASTRO-HK s.r.o.',
        byCategory: {
            partneri: 18.4,
            sezonni: 16.1,
            sezonniVerni: 15.8,
            sezonniMmhk: 17.2,
        },
    },
    {
        name: 'ČEZ ESCO',
        byCategory: { vipSilver: 32.6, skybox: 28.4 },
    },
    {
        name: 'Petrof, spol. s r.o.',
        byCategory: { vipGold: 22.8, vipSilver: 21.4, sezonniMmhk: 14.9 },
    },
    {
        name: 'Trelleborg Bohemia',
        byCategory: { sezonniVerni: 26.3, sezonni: 18.7, klub: 12.4 },
    },
    {
        name: 'AutoCont a.s.',
        byCategory: { vipSilver: 29.1, partneri: 16.8, skybox: 11.2 },
    },
    {
        name: 'Kiekert-CS s.r.o.',
        byCategory: { sezonniMmhk: 27.5, sezonniVerni: 18.6 },
    },
    {
        name: 'Continental Barum',
        byCategory: { skybox: 24.8, klub: 13.1, partneri: 9.4 },
    },
    {
        name: 'Synot Tip',
        byCategory: { vipGold: 21.7, partneri: 14.6, sezonni: 8.9 },
    },
    {
        name: 'Premedis s.r.o.',
        byCategory: { sezonniVerni: 19.4, sezonni: 12.8, klub: 8.2 },
    },
]

export type UsageTimelinePoint = {
    date: string
    label: string
    event: string
    visits: number
}

export type TopEventPoint = {
    label: string
    visits: number
}

export type CategoryUtilizationPoint = {
    label: string
    key: TicketCategoryKey
    utilization: number
}

export type PartnerUsagePoint = {
    label: string
} & Record<string, string | number>

export function filterEventsByDate(
    events: PartnerEvent[],
    from: Date,
    to: Date,
) {
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
        label: formatEventDate(event.date),
        event: `Mountfield HK – ${event.opponent}`,
        visits: event.visits,
    }))
}

export function getTopEvents(
    events: PartnerEvent[],
    limit = 3,
): TopEventPoint[] {
    return [...events]
        .sort((a, b) => b.visits - a.visits || a.date.localeCompare(b.date))
        .slice(0, limit)
        .map((event) => ({
            label: `${formatEventDate(event.date)} – Mountfield HK – ${event.opponent}`,
            visits: event.visits,
        }))
}

export function getCategoryUtilization(
    categories: readonly TicketCategoryKey[],
): CategoryUtilizationPoint[] {
    return TICKET_CATEGORIES.filter((category) =>
        categories.includes(category.key),
    )
        .map((category) => ({
            label: category.label,
            key: category.key,
            utilization: CATEGORY_UTILIZATION[category.key],
        }))
        .sort((a, b) => b.utilization - a.utilization)
}

export function getPartnerUsageRows(
    categories: readonly TicketCategoryKey[],
): PartnerUsagePoint[] {
    const categorySet = new Set(categories)

    return PARTNER_USAGE.map((partner) => {
        const row: PartnerUsagePoint = { label: partner.name }
        for (const category of TICKET_CATEGORIES) {
            const value = partner.byCategory[category.key] ?? 0
            row[category.key] = categorySet.has(category.key) ? value : 0
        }
        return row
    }).sort((a, b) => partnerTotal(b, categories) - partnerTotal(a, categories))
}

function partnerTotal(
    row: PartnerUsagePoint,
    categories: readonly TicketCategoryKey[],
) {
    return categories.reduce((sum, key) => {
        const value = row[key]
        return sum + (typeof value === 'number' ? value : 0)
    }, 0)
}

export function computeKpis(events: PartnerEvent[]) {
    const visits = events.reduce((sum, event) => sum + event.visits, 0)
    const eventCount = events.length
    const availableSlots = ISSUED_SEASON_TICKETS * eventCount
    const averageUtilization =
        availableSlots > 0 ? (visits / availableSlots) * 100 : 0

    return {
        issued: ISSUED_SEASON_TICKETS,
        used: USED_SEASON_TICKETS,
        partnersTotal: PARTNERS_TOTAL,
        partnersActive: PARTNERS_ACTIVE,
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
        cell: (row) => row.label,
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
        TICKET_CATEGORIES.filter((category) =>
            categories.includes(category.key),
        ).map((category) => ({
            id: category.key,
            header: category.label,
            cell: (row) => {
                const value = row[category.key]
                return typeof value === 'number' ? formatPercent(value) : '—'
            },
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        }))

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
