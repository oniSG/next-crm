import { format } from 'date-fns'

import type { DateRange } from '@/components/custom/filters/date-presets'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import ticketingReport from './data/ticketing-report.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')

export type SoldUsedPoint = {
    id: string
    label: string
    sold: number
    used: number
    date?: string
}

export type TicketsVsSeasonTicketsPoint = {
    id: string
    label: string
    tickets: number
    seasonTickets: number
}

export type TicketingReportData = {
    meta: {
        organizationName: string
        generatedAt: string
    }
    ticketsSoldUsedByEvent: SoldUsedPoint[]
    ticketsVsSeasonTicketsBySeason: TicketsVsSeasonTicketsPoint[]
    seasonTicketsSoldUsedBySeason: SoldUsedPoint[]
    ticketsSoldUsedBySeason: SoldUsedPoint[]
}

export const TICKETS_BY_EVENT_CONFIG = {
    sold: { label: 'Prodané', color: 'var(--chart-1)' },
    used: { label: 'Použité', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const TICKETS_VS_SEASON_TICKETS_CONFIG = {
    tickets: { label: 'Vstupenky', color: 'var(--chart-1)' },
    seasonTickets: { label: 'Permanentky', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const SEASON_TICKETS_SOLD_USED_CONFIG = {
    sold: { label: 'Prodané', color: 'var(--chart-1)' },
    used: { label: 'Použité', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const TICKETS_SOLD_USED_CONFIG = {
    sold: { label: 'Prodané', color: 'var(--chart-1)' },
    used: { label: 'Použité', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const SOLD_USED_SERIES = ['sold', 'used'] as const
export const TICKETS_VS_SEASON_TICKETS_SERIES = [
    'tickets',
    'seasonTickets',
] as const

export const SOLD_USED_COLUMNS: SimpleTableColumn<SoldUsedPoint>[] = [
    {
        id: 'label',
        header: 'Název',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'sold',
        header: 'Prodané',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.sold),
    },
    {
        id: 'used',
        header: 'Použité',
        headerClassName: 'text-right',
        cellClassName: 'text-right font-medium tabular-nums',
        cell: (row) => numberFormatter.format(row.used),
    },
]

export const TICKETS_VS_SEASON_TICKETS_COLUMNS: SimpleTableColumn<TicketsVsSeasonTicketsPoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'tickets',
            header: 'Vstupenky',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.tickets),
        },
        {
            id: 'seasonTickets',
            header: 'Permanentky',
            headerClassName: 'text-right',
            cellClassName: 'text-right font-medium tabular-nums',
            cell: (row) => numberFormatter.format(row.seasonTickets),
        },
    ]

function withEventDates(
    points: Omit<SoldUsedPoint, 'date'>[],
): SoldUsedPoint[] {
    const start = new Date(2025, 0, 15)
    return points.map((point, index) => {
        const date = new Date(start)
        date.setDate(date.getDate() + index * 10)
        return {
            ...point,
            date: format(date, 'yyyy-MM-dd'),
        }
    })
}

const rawReport = ticketingReport as TicketingReportData

export const TICKETING_REPORT_DATA: TicketingReportData = {
    ...rawReport,
    ticketsSoldUsedByEvent: withEventDates(rawReport.ticketsSoldUsedByEvent),
}

/** Default range covering most mock events (Jan 2025 – Jul 2026). */
export const TICKETS_BY_EVENT_DEFAULT_FROM = new Date(2025, 0, 1)
export const TICKETS_BY_EVENT_DEFAULT_TO = new Date(2026, 6, 31)

export function formatTicketingCount(value: number) {
    return numberFormatter.format(value)
}

export function filterSoldUsedByDateRange(
    points: SoldUsedPoint[],
    range: DateRange,
): SoldUsedPoint[] {
    const from = format(range.from, 'yyyy-MM-dd')
    const to = format(range.to, 'yyyy-MM-dd')
    return points.filter((point) => {
        if (!point.date) return true
        return point.date >= from && point.date <= to
    })
}

export function topSoldUsedByTotal(
    points: SoldUsedPoint[],
    limit?: number,
): SoldUsedPoint[] {
    const sorted = [...points].sort(
        (a, b) => b.sold + b.used - (a.sold + a.used),
    )
    return limit == null ? sorted : sorted.slice(0, limit)
}

export function sumSoldUsed(points: SoldUsedPoint[]) {
    return points.reduce(
        (result, point) => ({
            sold: result.sold + point.sold,
            used: result.used + point.used,
        }),
        { sold: 0, used: 0 },
    )
}

export function sumTicketsVsSeasonTickets(
    points: TicketsVsSeasonTicketsPoint[],
) {
    return points.reduce(
        (result, point) => ({
            tickets: result.tickets + point.tickets,
            seasonTickets: result.seasonTickets + point.seasonTickets,
        }),
        { tickets: 0, seasonTickets: 0 },
    )
}
