import ticketingReport from './data/ticketing-report.json'

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

export type ReportChartSeries = {
    key: string
    label: string
    color: string
}

export type ReportTableColumn = {
    key: string
    label: string
    format?: 'number'
    emphasize?: boolean
}

export type ReportSectionRow = {
    period: string
    label: string
    [key: string]: string | number
}

export const SOLD_USED_COLUMNS: ReportTableColumn[] = [
    { key: 'sold', label: 'Prodané', format: 'number' },
    { key: 'used', label: 'Použité', format: 'number', emphasize: true },
]

export const TICKETS_BY_EVENT_SERIES: ReportChartSeries[] = [
    { key: 'sold', label: 'Prodané', color: 'var(--chart-1)' },
    { key: 'used', label: 'Použité', color: 'var(--chart-4)' },
]

export const SEASON_TICKETS_SOLD_USED_SERIES: ReportChartSeries[] = [
    { key: 'sold', label: 'Prodané', color: 'var(--chart-1)' },
    { key: 'used', label: 'Použité', color: 'var(--chart-3)' },
]

export const TICKETS_SOLD_USED_SERIES: ReportChartSeries[] = [
    { key: 'sold', label: 'Prodané', color: 'var(--chart-4)' },
    { key: 'used', label: 'Použité', color: 'var(--chart-2)' },
]

export const TICKETS_VS_SEASON_TICKETS_COLUMNS: ReportTableColumn[] = [
    { key: 'tickets', label: 'Vstupenky', format: 'number' },
    {
        key: 'seasonTickets',
        label: 'Permanentky',
        format: 'number',
        emphasize: true,
    },
]

export const TICKETS_VS_SEASON_TICKETS_SERIES: ReportChartSeries[] = [
    { key: 'tickets', label: 'Vstupenky', color: 'var(--chart-1)' },
    { key: 'seasonTickets', label: 'Permanentky', color: 'var(--chart-2)' },
]

export const TICKETING_REPORT_DATA = ticketingReport as TicketingReportData

export function toSoldUsedRows(points: SoldUsedPoint[]): ReportSectionRow[] {
    return points.map((point) => ({
        period: point.id,
        label: point.label,
        sold: point.sold,
        used: point.used,
    }))
}

/** Top N events by total (sold + used), highest first. */
export function toTopSoldUsedRows(
    points: SoldUsedPoint[],
    limit = 10,
): ReportSectionRow[] {
    return [...points]
        .sort((a, b) => b.sold + b.used - (a.sold + a.used))
        .slice(0, limit)
        .map((point) => ({
            period: point.id,
            label: point.label,
            sold: point.sold,
            used: point.used,
        }))
}

export function toTicketsVsSeasonTicketsRows(
    points: TicketsVsSeasonTicketsPoint[],
): ReportSectionRow[] {
    return points.map((point) => ({
        period: point.id,
        label: point.label,
        tickets: point.tickets,
        seasonTickets: point.seasonTickets,
    }))
}
