import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import ticketingReport from './data/ticketing-report.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')

export type SoldUsedPoint = {
    id: string
    label: string
    sold: number
    used: number
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
    used: { label: 'Použité', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const TICKETS_VS_SEASON_TICKETS_CONFIG = {
    tickets: { label: 'Vstupenky', color: 'var(--chart-1)' },
    seasonTickets: { label: 'Permanentky', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const SEASON_TICKETS_SOLD_USED_CONFIG = {
    sold: { label: 'Prodané', color: 'var(--chart-1)' },
    used: { label: 'Použité', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const TICKETS_SOLD_USED_CONFIG = {
    sold: { label: 'Prodané', color: 'var(--chart-4)' },
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

export const TICKETING_REPORT_DATA = ticketingReport as TicketingReportData

export function formatTicketingCount(value: number) {
    return numberFormatter.format(value)
}

export function topSoldUsedByTotal(
    points: SoldUsedPoint[],
    limit = 10,
): SoldUsedPoint[] {
    return [...points]
        .sort((a, b) => b.sold + b.used - (a.sold + a.used))
        .slice(0, limit)
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
