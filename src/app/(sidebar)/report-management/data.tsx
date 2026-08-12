import { format } from 'date-fns'

import type { DateRange } from '@/components/custom/filters/date-presets'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import managementReport from './data/management-report.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export type ManagementReportPeriod = {
    from: string
    to: string
    granularity: 'day' | 'month'
}

export type ManagementReportDataPoint = {
    period: string
    label: string
}

export type TicketSalesPoint = ManagementReportDataPoint & {
    online: { count: number; revenue: number }
    boxOffice: { count: number; revenue: number }
    administration: { count: number; revenue: number }
    mobileApp: { count: number; revenue: number }
    partner: { count: number; revenue: number }
    total: { count: number; revenue: number }
    eventCount: number
}

export type FanGrowthPoint = ManagementReportDataPoint & {
    added: number
    removed: number
    netChange: number
    total: number
    blocked: number
}

export type CommunicationPoint = ManagementReportDataPoint & {
    delivered: number
    failed: number
    openedUnique?: number
    clickedUnique?: number
}

export type BusinessCasePoint = ManagementReportDataPoint & {
    won: { count: number; value: number }
    open: { count: number; value: number }
    cancelled: { count: number; value: number }
}

export type ManagementReportData = {
    meta: {
        organizationName: string
        generatedAt: string
        currency: 'CZK'
        period: ManagementReportPeriod
    }
    fans: {
        current: number
        blocked: number
        initial: number
        added: number
        removed: number
        netGrowth: number
        development: FanGrowthPoint[]
    }
    seasonTickets: {
        sold: number
        revenue: number
        development: (ManagementReportDataPoint & {
            sold: number
            revenue: number
        })[]
    }
    tickets: {
        sold: number
        revenue: number
        eventCount: number
        development: TicketSalesPoint[]
    }
    communication: {
        email: {
            delivered: number
            failed: number
            openedUnique: number
            clickedUnique: number
            openRate: number
            clickRate: number
            development: CommunicationPoint[]
        }
        push: {
            delivered: number
            failed: number
            failureRate: number
            development: CommunicationPoint[]
        }
        sms: {
            delivered: number
            failed: number
            failureRate: number
            development: CommunicationPoint[]
        }
    }
    business: {
        advertisingSpaces: {
            occupied: number
            free: number
            development: (ManagementReportDataPoint & {
                occupied: number
                free: number
            })[]
        }
        plans: {
            id: string
            from: string
            to: string
            planned: number
            actual: number
            difference: number
            currency: 'CZK'
        }[]
        planDevelopment: (ManagementReportDataPoint & {
            planned: number
            actual: number
        })[]
        wonCases: {
            count: number
            value: number
            development: (ManagementReportDataPoint & {
                count: number
                value: number
            })[]
        }
        caseDevelopment: BusinessCasePoint[]
    }
}

export type ReportSectionRow = {
    period: string
    label: string
    [key: string]: string | number
}

export type ReportTableColumn = {
    key: string
    label: string
    format?: 'number' | 'currency' | 'signed'
    emphasize?: boolean
}

export type ReportChartSeries = {
    key: string
    label: string
    color: string
}

export function formatReportValue(
    value: number,
    format?: ReportTableColumn['format'],
) {
    if (format === 'currency') return currencyFormatter.format(value)
    const formatted = numberFormatter.format(value)
    if (format === 'signed' && value >= 0) return `+${formatted}`
    return formatted
}

export function toChartConfig(series: ReportChartSeries[]) {
    return Object.fromEntries(
        series.map((item) => [item.key, { label: item.label, color: item.color }]),
    ) satisfies ChartConfig
}

export function toSectionTableColumns(
    columns: ReportTableColumn[],
): SimpleTableColumn<ReportSectionRow>[] {
    return [
        {
            id: 'label',
            header: 'Month',
            cell: (row) => row.label,
            cellClassName: 'font-medium',
        },
        ...columns.map((column) => ({
            id: column.key,
            header: column.label,
            headerClassName: 'text-right',
            cellClassName: column.emphasize
                ? 'text-right font-medium tabular-nums'
                : 'text-right tabular-nums',
            cell: (row: ReportSectionRow) =>
                formatReportValue(Number(row[column.key] ?? 0), column.format),
        })),
    ]
}

export function sumBy<T>(rows: T[], pick: (row: T) => number) {
    return rows.reduce((sum, row) => sum + pick(row), 0)
}

export function toSectionFooter(
    rows: ReportSectionRow[],
    columns: ReportTableColumn[],
) {
    const totals = columns.reduce<Record<string, number>>((result, column) => {
        result[column.key] = sumBy(rows, (row) => Number(row[column.key] ?? 0))
        return result
    }, {})

    return [
        'Total',
        ...columns.map((column) =>
            formatReportValue(totals[column.key], column.format),
        ),
    ]
}

export const TICKET_CHANNEL_SERIES: ReportChartSeries[] = [
    { key: 'online', label: 'Online', color: 'var(--chart-1)' },
    { key: 'boxOffice', label: 'Box office', color: 'var(--chart-2)' },
    { key: 'administration', label: 'Administration', color: 'var(--chart-3)' },
    { key: 'mobileApp', label: 'Mobile app', color: 'var(--chart-4)' },
    { key: 'partner', label: 'Partner', color: 'var(--chart-6)' },
]

export const TICKET_REVENUE_COLUMNS: ReportTableColumn[] = [
    { key: 'online', label: 'Online', format: 'currency' },
    { key: 'boxOffice', label: 'Box office', format: 'currency' },
    { key: 'administration', label: 'Administration', format: 'currency' },
    { key: 'mobileApp', label: 'Mobile app', format: 'currency' },
    { key: 'partner', label: 'Partner', format: 'currency' },
    { key: 'total', label: 'Total', format: 'currency', emphasize: true },
]

export const TICKET_COUNT_COLUMNS: ReportTableColumn[] = [
    { key: 'online', label: 'Online', format: 'number' },
    { key: 'boxOffice', label: 'Box office', format: 'number' },
    { key: 'administration', label: 'Administration', format: 'number' },
    { key: 'mobileApp', label: 'Mobile app', format: 'number' },
    { key: 'partner', label: 'Partner', format: 'number' },
    { key: 'total', label: 'Total', format: 'number', emphasize: true },
]

export const VISITOR_TOTAL_COLUMNS: ReportTableColumn[] = [
    { key: 'total', label: 'Total visitors', format: 'number', emphasize: true },
]

export const VISITOR_TOTAL_SERIES: ReportChartSeries[] = [
    { key: 'total', label: 'Visitors', color: 'var(--chart-1)' },
]

export const VISITOR_GROWTH_COLUMNS: ReportTableColumn[] = [
    { key: 'added', label: 'Added', format: 'number' },
    { key: 'removed', label: 'Removed', format: 'number' },
    { key: 'netChange', label: 'Net growth', format: 'signed', emphasize: true },
]

export const VISITOR_GROWTH_SERIES: ReportChartSeries[] = [
    { key: 'netChange', label: 'Net growth', color: 'var(--chart-1)' },
]

export const MANAGEMENT_REPORT_DATA = managementReport as ManagementReportData

export function filterByPeriodRange<T extends { period: string }>(
    data: T[],
    range: DateRange,
): T[] {
    const from = format(range.from, 'yyyy-MM')
    const to = format(range.to, 'yyyy-MM')
    return data.filter((row) => row.period >= from && row.period <= to)
}

export function toTicketRevenueRows(
    points: TicketSalesPoint[],
): ReportSectionRow[] {
    return points.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.revenue,
        boxOffice: point.boxOffice.revenue,
        administration: point.administration.revenue,
        mobileApp: point.mobileApp.revenue,
        partner: point.partner.revenue,
        total: point.total.revenue,
    }))
}

export function toTicketCountRows(points: TicketSalesPoint[]): ReportSectionRow[] {
    return points.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.count,
        boxOffice: point.boxOffice.count,
        administration: point.administration.count,
        mobileApp: point.mobileApp.count,
        partner: point.partner.count,
        total: point.total.count,
    }))
}

export function getManagementReportPeriodView(
    report: ManagementReportData,
    range: DateRange,
) {
    const fanDevelopment = filterByPeriodRange(report.fans.development, range)
    const seasonTicketDevelopment = filterByPeriodRange(
        report.seasonTickets.development,
        range,
    )
    const ticketDevelopment = filterByPeriodRange(
        report.tickets.development,
        range,
    )

    const lastFanPoint = fanDevelopment.at(-1)
    const fanNetGrowth = sumBy(fanDevelopment, (point) => point.netChange)
    const seasonTicketsSold = sumBy(seasonTicketDevelopment, (point) => point.sold)
    const seasonTicketsRevenue = sumBy(
        seasonTicketDevelopment,
        (point) => point.revenue,
    )
    const ticketsSold = sumBy(ticketDevelopment, (point) => point.total.count)
    const ticketsRevenue = sumBy(
        ticketDevelopment,
        (point) => point.total.revenue,
    )
    const ticketsEventCount = sumBy(
        ticketDevelopment,
        (point) => point.eventCount,
    )

    return {
        fanDevelopment,
        seasonTicketDevelopment,
        ticketDevelopment,
        lastFanPoint,
        fanNetGrowth,
        seasonTicketsSold,
        seasonTicketsRevenue,
        ticketsSold,
        ticketsRevenue,
        ticketsEventCount,
    }
}
