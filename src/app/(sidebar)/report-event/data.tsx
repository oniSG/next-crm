import { format, parseISO, subDays } from 'date-fns'

import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export type ReportEventOption = {
    id: string
    name: string
    date: string
    capacity: number
}

export type EventReportChartPoint = {
    label: string
    count: number
    revenue?: number
}

export type EventReportData = ReportEventOption & {
    startOfSale: string
    venue: string
    currency: 'CZK'
    tickets: {
        sold: number
        paid: number
        free: number
        capacity: number
    }
    entrances: {
        total: number
        tickets: number
        seasonTickets: number
        unassigned: number
    }
    revenue: {
        tickets: number
        forwardedSeasonTickets: number
        total: number
    }
    salesByDay: Array<EventReportChartPoint & { date: string }>
    salesByPrice: Array<EventReportChartPoint & { price: number }>
    salesBySector: Array<EventReportChartPoint & { sector: string }>
    seasonTicketFlow: SankeyChartData
    ticketSalesFlow: SankeyChartData
}

export const EVENT_SALES_BY_DAY_CONFIG = {
    count: { label: 'Tickets sold', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const EVENT_SALES_BY_PRICE_CONFIG = {
    count: { label: 'Tickets sold', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const EVENT_SALES_BY_SECTOR_CONFIG = {
    count: { label: 'Tickets sold', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const EVENT_REPORT_CHART_SERIES = ['count'] as const

export type EventSalesByDayRow = EventReportData['salesByDay'][number]
export type EventSalesByPriceRow = EventReportData['salesByPrice'][number]
export type EventSalesBySectorRow = EventReportData['salesBySector'][number]

export const SALES_BY_DAY_COLUMNS: SimpleTableColumn<EventSalesByDayRow>[] = [
    {
        id: 'day',
        header: 'Day',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'count',
        header: 'Tickets sold',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.count),
    },
    {
        id: 'revenue',
        header: 'Revenue',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => currencyFormatter.format(row.revenue ?? 0),
    },
]

export const SALES_BY_PRICE_COLUMNS: SimpleTableColumn<EventSalesByPriceRow>[] =
    [
        {
            id: 'price',
            header: 'Price',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'count',
            header: 'Tickets sold',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
        {
            id: 'revenue',
            header: 'Revenue',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => currencyFormatter.format(row.revenue ?? 0),
        },
    ]

export const SALES_BY_SECTOR_COLUMNS: SimpleTableColumn<EventSalesBySectorRow>[] =
    [
        {
            id: 'sector',
            header: 'Sector',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'count',
            header: 'Tickets sold',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
    ]

export function formatEventCount(value: number) {
    return numberFormatter.format(value)
}

export function formatEventCurrency(value: number) {
    return currencyFormatter.format(value)
}

const EVENT_META: ReportEventOption[] = [
    {
        id: 'EVT-2026-001',
        name: 'HC Relatoo Praha – Brno',
        date: '2026-01-17',
        capacity: 13_150,
    },
    {
        id: 'EVT-2026-002',
        name: 'HC Relatoo Praha – Liberec',
        date: '2026-02-08',
        capacity: 13_150,
    },
    {
        id: 'EVT-2026-003',
        name: 'HC Relatoo Praha – Pardubice',
        date: '2026-03-21',
        capacity: 13_150,
    },
    {
        id: 'EVT-2026-004',
        name: 'HC Relatoo Praha – Třinec',
        date: '2026-04-11',
        capacity: 13_150,
    },
    {
        id: 'EVT-2026-005',
        name: 'Relatoo Fan Day',
        date: '2026-05-23',
        capacity: 8_500,
    },
    {
        id: 'EVT-2026-006',
        name: 'HC Relatoo Praha – Opening Game',
        date: '2026-07-29',
        capacity: 13_150,
    },
]

function allocate(total: number, shares: number[]) {
    const values = shares.map((share) => Math.round(total * share))
    values[values.length - 1] += total - values.reduce((sum, value) => sum + value, 0)
    return values
}

function buildSeasonTicketFlow(capacity: number): {
    data: SankeyChartData
    entered: number
    bought: number
} {
    const seasonTickets = Math.round(capacity * 0.18)
    const entered = Math.round(seasonTickets * 0.42)
    const notEntered = seasonTickets - entered
    const notForwarded = Math.round(notEntered * 0.64)
    const redistributed = notEntered - notForwarded
    const gifted = Math.round(redistributed * 0.38)
    const forwardedForSale = redistributed - gifted
    const giftedEntered = Math.round(gifted * 0.78)
    const giftedNotEntered = gifted - giftedEntered
    const bought = Math.round(forwardedForSale * 0.44)
    const notBought = forwardedForSale - bought
    const boughtEntered = Math.round(bought * 0.84)
    const boughtNotEntered = bought - boughtEntered

    return {
        entered,
        bought,
        data: {
            // Continuing branches above terminals so flows don't cross upward.
            nodes: [
                { name: 'Season tickets', fill: 'var(--chart-4)' },
                { name: 'Absent', fill: 'var(--destructive)' },
                { name: 'Entered', fill: 'var(--chart-1)' },
                { name: 'Redistributed', fill: 'var(--chart-2)' },
                { name: 'Kept', fill: 'var(--muted-foreground)' },
                { name: 'Gifted', fill: 'var(--chart-3)' },
                { name: 'For resale', fill: 'var(--chart-4)' },
                { name: 'Gift: entered', fill: 'var(--chart-1)' },
                { name: 'Gift: absent', fill: 'var(--destructive)' },
                { name: 'Bought', fill: 'var(--chart-1)' },
                { name: 'Unsold', fill: 'var(--destructive)' },
                { name: 'Buyer: entered', fill: 'var(--chart-1)' },
                { name: 'Buyer: absent', fill: 'var(--destructive)' },
            ],
            links: [
                { source: 0, target: 1, value: notEntered },
                { source: 0, target: 2, value: entered },
                { source: 1, target: 3, value: redistributed },
                { source: 1, target: 4, value: notForwarded },
                { source: 3, target: 5, value: gifted },
                { source: 3, target: 6, value: forwardedForSale },
                { source: 5, target: 7, value: giftedEntered },
                { source: 5, target: 8, value: giftedNotEntered },
                { source: 6, target: 9, value: bought },
                { source: 6, target: 10, value: notBought },
                { source: 9, target: 11, value: boughtEntered },
                { source: 9, target: 12, value: boughtNotEntered },
            ],
        },
    }
}

function buildTicketSalesFlow(paid: number, free: number): SankeyChartData {
    const paidChannels = allocate(paid, [0.56, 0.14, 0.09, 0.14, 0.07])
    const freeChannels = allocate(free, [0.35, 0.2, 0.18, 0.17, 0.1])

    return {
        nodes: [
            { name: 'All tickets', fill: 'var(--chart-1)' },
            { name: 'Paid', fill: 'var(--chart-1)' },
            { name: 'Free', fill: 'var(--chart-2)' },
            { name: 'Online — paid', fill: 'var(--chart-1)' },
            { name: 'Box office — paid', fill: 'var(--chart-2)' },
            { name: 'Administration — paid', fill: 'var(--chart-3)' },
            { name: 'Mobile app — paid', fill: 'var(--chart-4)' },
            { name: 'Partner — paid', fill: 'oklch(0.65 0.2 35)' },
            { name: 'Online — free', fill: 'var(--chart-1)' },
            { name: 'Box office — free', fill: 'var(--chart-2)' },
            { name: 'Administration — free', fill: 'var(--chart-3)' },
            { name: 'Mobile app — free', fill: 'var(--chart-4)' },
            { name: 'Partner — free', fill: 'oklch(0.65 0.2 35)' },
        ],
        links: [
            { source: 0, target: 1, value: paid },
            { source: 0, target: 2, value: free },
            ...paidChannels.map((value, index) => ({
                source: 1,
                target: index + 3,
                value,
            })),
            ...freeChannels.map((value, index) => ({
                source: 2,
                target: index + 8,
                value,
            })),
        ],
    }
}

function buildEventReport(event: ReportEventOption, index: number): EventReportData {
    const attendanceRate = 0.68 + index * 0.025
    const sold = Math.round(event.capacity * Math.min(attendanceRate, 0.82))
    const paid = Math.round(sold * 0.91)
    const free = sold - paid
    const eventDate = parseISO(event.date)
    const dailyCounts = allocate(sold, [0.08, 0.11, 0.14, 0.18, 0.22, 0.27])
    const prices = [0, 150, 220, 290, 350, 450]
    const priceCounts = allocate(sold, [0.09, 0.2, 0.27, 0.24, 0.14, 0.06])
    const sectorCounts = allocate(sold, [0.18, 0.16, 0.14, 0.2, 0.17, 0.15])
    const seasonFlow = buildSeasonTicketFlow(event.capacity)
    const ticketEntrances = Math.round(sold * 0.81)
    const unassignedEntrances = index % 2 === 0 ? 24 + index * 3 : 0
    const ticketRevenue = priceCounts.reduce(
        (sum, count, priceIndex) => sum + count * prices[priceIndex],
        0,
    )
    const dailyRevenue = allocate(
        ticketRevenue,
        dailyCounts.map((count) => count / sold),
    )
    const forwardedRevenue = seasonFlow.bought * (780 + index * 25)

    return {
        ...event,
        startOfSale: format(subDays(eventDate, 120), 'yyyy-MM-dd'),
        venue: index === 4 ? 'Relatoo Training Center' : 'Relatoo Arena',
        currency: 'CZK',
        tickets: {
            sold,
            paid,
            free,
            capacity: event.capacity,
        },
        entrances: {
            total: ticketEntrances + seasonFlow.entered + unassignedEntrances,
            tickets: ticketEntrances,
            seasonTickets: seasonFlow.entered,
            unassigned: unassignedEntrances,
        },
        revenue: {
            tickets: ticketRevenue,
            forwardedSeasonTickets: forwardedRevenue,
            total: ticketRevenue + forwardedRevenue,
        },
        salesByDay: dailyCounts.map((count, dayIndex) => {
            const date = subDays(eventDate, (dailyCounts.length - dayIndex - 1) * 2)
            return {
                date: format(date, 'yyyy-MM-dd'),
                label: format(date, 'd MMM'),
                count,
                revenue: dailyRevenue[dayIndex],
            }
        }),
        salesByPrice: prices.map((price, priceIndex) => ({
            price,
            label: price === 0 ? 'Free' : `${price} Kč`,
            count: priceCounts[priceIndex],
            revenue: price * priceCounts[priceIndex],
        })),
        salesBySector: ['A', 'B', 'C', 'D', 'E', 'VIP'].map((sector, sectorIndex) => ({
            sector,
            label: `Sector ${sector}`,
            count: sectorCounts[sectorIndex],
        })),
        seasonTicketFlow: seasonFlow.data,
        ticketSalesFlow: buildTicketSalesFlow(paid, free),
    }
}

export const REPORT_EVENT_DATA = EVENT_META.map(buildEventReport)

export const REPORT_EVENT_OPTIONS: ReportEventOption[] = REPORT_EVENT_DATA.map(
    ({ id, name, date, capacity }) => ({ id, name, date, capacity }),
)

export function getReportEvent(eventId: string | null | undefined) {
    return (
        REPORT_EVENT_DATA.find((event) => event.id === eventId) ??
        REPORT_EVENT_DATA[0]
    )
}
