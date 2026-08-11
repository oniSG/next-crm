import { format } from 'date-fns'

import type { DateRange } from '@/components/custom/filters/date-presets'
import type { ChartConfig } from '@/components/ui/chart'

import managementReport from './data/management-report.json'

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

export const DELIVERED_COLUMNS: ReportTableColumn[] = [
    { key: 'delivered', label: 'Delivered', format: 'number', emphasize: true },
]

export const WON_BUSINESS_CASE_COLUMNS: ReportTableColumn[] = [
    { key: 'count', label: 'Won cases', format: 'number' },
    { key: 'value', label: 'Total volume', format: 'currency', emphasize: true },
]

export const WON_BUSINESS_CASE_SERIES: ReportChartSeries[] = [
    { key: 'value', label: 'Won business cases', color: 'var(--chart-1)' },
]

export const BUSINESS_CASE_STATUS_COLUMNS: ReportTableColumn[] = [
    { key: 'won', label: 'Won', format: 'number' },
    { key: 'open', label: 'Open', format: 'number' },
    { key: 'cancelled', label: 'Cancelled', format: 'number' },
    { key: 'total', label: 'Total', format: 'number', emphasize: true },
]

export const BUSINESS_CASE_STATUS_SERIES: ReportChartSeries[] = [
    { key: 'won', label: 'Won', color: 'var(--chart-1)' },
    { key: 'open', label: 'Open', color: 'var(--chart-2)' },
    { key: 'cancelled', label: 'Cancelled', color: 'var(--chart-3)' },
]

export const ADVERTISING_SPACES_CONFIG = {
    occupied: { label: 'Taken', color: 'var(--chart-1)' },
    free: { label: 'Available', color: 'var(--chart-8)' },
} satisfies ChartConfig

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

export function toBusinessCaseStatusRows(
    points: BusinessCasePoint[],
): ReportSectionRow[] {
    return points.map((point) => ({
        period: point.period,
        label: point.label,
        won: point.won.count,
        open: point.open.count,
        cancelled: point.cancelled.count,
        total: point.won.count + point.open.count + point.cancelled.count,
    }))
}
