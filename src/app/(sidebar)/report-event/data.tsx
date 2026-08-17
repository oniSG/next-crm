import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import events from './data/events.json'
import eventList from './data/event-list.json'

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

export type ReportEventListItem = ReportEventOption & {
    venue: string
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
    count: { label: 'Prodané vstupenky', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const EVENT_SALES_BY_PRICE_CONFIG = {
    count: { label: 'Prodané vstupenky', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const EVENT_SALES_BY_SECTOR_CONFIG = {
    count: { label: 'Prodané vstupenky', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const EVENT_SOLD_USED_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const EVENT_REPORT_CHART_SERIES = ['count'] as const

export type EventSalesByDayRow = EventReportData['salesByDay'][number]
export type EventSalesByPriceRow = EventReportData['salesByPrice'][number]
export type EventSalesBySectorRow = EventReportData['salesBySector'][number]

export type EventSoldUsedRow = {
    id: string
    label: string
    count: number
}

export function getEventSoldUsedRows(event: EventReportData): EventSoldUsedRow[] {
    return [
        {
            id: 'sold',
            label: 'Prodané',
            count: event.tickets.sold,
        },
        {
            id: 'used',
            label: 'Využité',
            count: event.entrances.tickets,
        },
    ]
}

export const SALES_BY_DAY_COLUMNS: SimpleTableColumn<EventSalesByDayRow>[] = [
    {
        id: 'day',
        header: 'Den',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'count',
        header: 'Prodané vstupenky',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.count),
    },
    {
        id: 'revenue',
        header: 'Tržba',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => currencyFormatter.format(row.revenue ?? 0),
    },
]

export const SALES_BY_PRICE_COLUMNS: SimpleTableColumn<EventSalesByPriceRow>[] = [
    {
        id: 'price',
        header: 'Cena',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'count',
        header: 'Prodané vstupenky',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.count),
    },
    {
        id: 'revenue',
        header: 'Tržba',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => currencyFormatter.format(row.revenue ?? 0),
    },
]

export const SALES_BY_SECTOR_COLUMNS: SimpleTableColumn<EventSalesBySectorRow>[] = [
    {
        id: 'sector',
        header: 'Sektor',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'count',
        header: 'Prodané vstupenky',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.count),
    },
]

export const SOLD_USED_COLUMNS: SimpleTableColumn<EventSoldUsedRow>[] = [
    {
        id: 'label',
        header: 'Kategorie',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'count',
        header: 'Počet',
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

const EVENT_REPORT_DETAIL = events as EventReportData

export const EVENT_LIST = eventList as ReportEventListItem[]

const dateFormatter = new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export const EVENT_LIST_COLUMNS: SimpleTableColumn<ReportEventListItem>[] = [
    {
        id: 'name',
        header: 'Událost',
        cellClassName: 'font-medium',
        cell: (row) => row.name,
    },
    {
        id: 'date',
        header: 'Datum',
        cell: (row) => dateFormatter.format(new Date(`${row.date}T00:00:00`)),
    },
    {
        id: 'venue',
        header: 'Místo',
        cell: (row) => row.venue,
    },
    {
        id: 'capacity',
        header: 'Kapacita',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.capacity),
    },
]

/** Dočasně používá stejná data reportu; metadata se přebírají ze seznamu událostí. */
export function getEventReportById(id: string): EventReportData | undefined {
    const summary = EVENT_LIST.find((item) => item.id === id)
    if (!summary) return undefined

    return {
        ...EVENT_REPORT_DETAIL,
        ...summary,
    }
}
