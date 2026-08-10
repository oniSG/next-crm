import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import salesReport from './data/sales-report.json'

const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export type Period = 'day' | 'month' | 'year'

export const PERIOD_OPTIONS = [
    { label: 'Den', value: 'day' },
    { label: 'Měsíc', value: 'month' },
    { label: 'Rok', value: 'year' },
] as const

export type RevenuePoint = {
    id: string
    label: string
    revenue: number
}

export type RevenueByDatePoint = RevenuePoint & {
    period: string
}

export type SalesReportData = {
    meta: {
        organizationName: string
        generatedAt: string
        currency: 'CZK'
    }
    revenueByChannel: RevenuePoint[]
    revenueByDate: RevenueByDatePoint[]
}

export const REVENUE_BY_CHANNEL_CONFIG = {
    revenue: { label: 'Příjem', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const REVENUE_BY_DATE_CONFIG = {
    revenue: { label: 'Příjem', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const REVENUE_CHART_SERIES = ['revenue'] as const

export const REVENUE_BY_CHANNEL_COLUMNS: SimpleTableColumn<RevenuePoint>[] = [
    {
        id: 'channel',
        header: 'Prodejní kanál',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'revenue',
        header: 'Příjem',
        headerClassName: 'text-right',
        cellClassName: 'text-right font-medium tabular-nums',
        cell: (row) => currencyFormatter.format(row.revenue),
    },
]

export function revenueByDateColumns(
    period: Period,
): SimpleTableColumn<RevenueByDatePoint>[] {
    return [
        {
            id: 'date',
            header: periodColumnLabel(period),
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'revenue',
            header: 'Příjem',
            headerClassName: 'text-right',
            cellClassName: 'text-right font-medium tabular-nums',
            cell: (row) => currencyFormatter.format(row.revenue),
        },
    ]
}

export function periodColumnLabel(period: Period) {
    if (period === 'day') return 'Datum'
    if (period === 'month') return 'Měsíc'
    return 'Rok'
}

export const SALES_REPORT_DATA = salesReport as SalesReportData

export function formatSalesCurrency(value: number) {
    return currencyFormatter.format(value)
}

export function sumRevenue(points: Array<{ revenue: number }>) {
    return points.reduce((sum, point) => sum + point.revenue, 0)
}
