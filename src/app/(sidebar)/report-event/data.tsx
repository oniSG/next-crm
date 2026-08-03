import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import events from './data/events.json'

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

export const SALES_BY_PRICE_COLUMNS: SimpleTableColumn<EventSalesByPriceRow>[] = [
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

export const SALES_BY_SECTOR_COLUMNS: SimpleTableColumn<EventSalesBySectorRow>[] = [
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

export const REPORT_EVENT_DATA = events as EventReportData[]

export const REPORT_EVENT_OPTIONS: ReportEventOption[] = REPORT_EVENT_DATA.map(
    ({ id, name, date, capacity }) => ({ id, name, date, capacity }),
)

export function getReportEvent(eventId: string | null | undefined) {
    return REPORT_EVENT_DATA.find((event) => event.id === eventId)
}
