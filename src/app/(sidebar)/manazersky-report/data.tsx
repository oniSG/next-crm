import {
    filterByPeriodRange,
    MANAGEMENT_REPORT_DATA,
    toTicketCountRows,
    toTicketRevenueRows,
    type ReportChartSeries,
    type ReportSectionRow,
    type ReportTableColumn,
} from '@/app/(sidebar)/report-management/data'

export {
    filterByPeriodRange,
    MANAGEMENT_REPORT_DATA,
    toTicketCountRows,
    toTicketRevenueRows,
}
export type { ReportChartSeries, ReportSectionRow, ReportTableColumn }

export const numberFormatter = new Intl.NumberFormat('cs-CZ')
export const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export const DEFAULT_FROM = new Date(2026, 0, 1)
export const DEFAULT_TO = new Date(2026, 5, 30)

export const TICKET_CHANNEL_SERIES: ReportChartSeries[] = [
    { key: 'online', label: 'Online', color: 'var(--chart-1)' },
    { key: 'boxOffice', label: 'Pokladna', color: 'var(--chart-2)' },
    { key: 'administration', label: 'Administrace', color: 'var(--chart-3)' },
    { key: 'mobileApp', label: 'Mobilní aplikace', color: 'var(--chart-4)' },
    { key: 'partner', label: 'Partner', color: 'var(--chart-6)' },
]

export const TICKET_REVENUE_COLUMNS: ReportTableColumn[] = [
    { key: 'online', label: 'Online', format: 'currency' },
    { key: 'boxOffice', label: 'Pokladna', format: 'currency' },
    { key: 'administration', label: 'Administrace', format: 'currency' },
    { key: 'mobileApp', label: 'Mobilní aplikace', format: 'currency' },
    { key: 'partner', label: 'Partner', format: 'currency' },
    { key: 'total', label: 'Celkem', format: 'currency', emphasize: true },
]

export const TICKET_COUNT_COLUMNS: ReportTableColumn[] = [
    { key: 'online', label: 'Online', format: 'number' },
    { key: 'boxOffice', label: 'Pokladna', format: 'number' },
    { key: 'administration', label: 'Administrace', format: 'number' },
    { key: 'mobileApp', label: 'Mobilní aplikace', format: 'number' },
    { key: 'partner', label: 'Partner', format: 'number' },
    { key: 'total', label: 'Celkem', format: 'number', emphasize: true },
]

export const VISITOR_TOTAL_COLUMNS: ReportTableColumn[] = [
    {
        key: 'total',
        label: 'Celkem návštěvníků',
        format: 'number',
        emphasize: true,
    },
]

export const VISITOR_TOTAL_SERIES: ReportChartSeries[] = [
    { key: 'total', label: 'Návštěvníci', color: 'var(--chart-1)' },
]

export const VISITOR_GROWTH_COLUMNS: ReportTableColumn[] = [
    { key: 'added', label: 'Přidaní', format: 'number' },
    { key: 'removed', label: 'Odebraní', format: 'number' },
    {
        key: 'netChange',
        label: 'Čistý přírůstek',
        format: 'signed',
        emphasize: true,
    },
]

export const VISITOR_GROWTH_SERIES: ReportChartSeries[] = [
    { key: 'added', label: 'Přidaní', color: 'var(--chart-1)' },
    { key: 'removed', label: 'Odebraní', color: 'var(--chart-2)' },
]

export function formatValue(
    value: number,
    format: ReportTableColumn['format'],
) {
    if (format === 'currency') return currencyFormatter.format(value)
    const formatted = numberFormatter.format(value)
    if (format === 'signed' && value >= 0) return `+${formatted}`
    return formatted
}

export function sumBy<T>(rows: T[], pick: (row: T) => number) {
    return rows.reduce((sum, row) => sum + pick(row), 0)
}

export function formatCurrency(value: number) {
    return currencyFormatter.format(value)
}
