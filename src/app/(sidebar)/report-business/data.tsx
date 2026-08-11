import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import businessReport from './data/business-report.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export type BusinessCaseStatusPoint = {
    id: string
    label: string
    count: number
    potentialIncome: number
}

export type AdvertisingSpaceSeasonPoint = {
    id: string
    label: string
    occupied: number
    occupiedMultiple: number
    free: number
}

export type TradeTypePoint = {
    id: string
    label: string
    value: number
}

export type WeeklyRevenuePoint = {
    week: string
    totalRevenue: number
}

export type WeeklyRevenueChartRow = WeeklyRevenuePoint & {
    label: string
}

export type BusinessReportData = {
    meta: {
        organizationName: string
        generatedAt: string
        currency: 'CZK'
    }
    weeklyRevenue: WeeklyRevenuePoint[]
    businessCasesByStatus: BusinessCaseStatusPoint[]
    advertisingSpacesBySeason: AdvertisingSpaceSeasonPoint[]
    tradeTypeRatio: TradeTypePoint[]
}

export const WEEKLY_REVENUE_CONFIG = {
    totalRevenue: { label: 'Příjem', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const WEEKLY_REVENUE_SERIES = ['totalRevenue'] as const

export const BUSINESS_CASE_STATUS_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
    potentialIncome: {
        label: 'Potenciální příjem',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig

export const BUSINESS_CASE_STATUS_SERIES = ['count', 'potentialIncome'] as const
export const BUSINESS_CASE_STATUS_SECONDARY_SERIES = ['potentialIncome'] as const

export const ADVERTISING_SPACES_CONFIG = {
    occupied: { label: 'Obsazeno', color: 'var(--chart-1)' },
    occupiedMultiple: { label: 'Obsazeno vícekrát', color: 'var(--chart-2)' },
    free: { label: 'Volno', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const ADVERTISING_SPACES_SERIES = [
    'occupied',
    'occupiedMultiple',
    'free',
] as const

export const TRADE_TYPE_CONFIG = {
    empty: { label: 'Prázdný', color: 'var(--chart-5)' },
    finance: { label: 'Finance', color: 'var(--chart-1)' },
    combined: { label: 'Kombinovaný', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const WEEKLY_REVENUE_COLUMNS: SimpleTableColumn<WeeklyRevenueChartRow>[] =
    [
        {
            id: 'week',
            header: 'Týden',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'totalRevenue',
            header: 'Příjem',
            headerClassName: 'text-right',
            cellClassName: 'text-right font-medium tabular-nums',
            cell: (row) => currencyFormatter.format(row.totalRevenue),
        },
    ]

export const BUSINESS_CASE_STATUS_COLUMNS: SimpleTableColumn<BusinessCaseStatusPoint>[] =
    [
        {
            id: 'status',
            header: 'Stav',
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
        {
            id: 'potentialIncome',
            header: 'Potenciální příjem [Kč]',
            headerClassName: 'text-right',
            cellClassName: 'text-right font-medium tabular-nums',
            cell: (row) => currencyFormatter.format(row.potentialIncome),
        },
    ]

export const ADVERTISING_SPACES_COLUMNS: SimpleTableColumn<AdvertisingSpaceSeasonPoint>[] =
    [
        {
            id: 'season',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'occupied',
            header: ADVERTISING_SPACES_CONFIG.occupied.label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.occupied),
        },
        {
            id: 'occupiedMultiple',
            header: ADVERTISING_SPACES_CONFIG.occupiedMultiple.label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.occupiedMultiple),
        },
        {
            id: 'free',
            header: ADVERTISING_SPACES_CONFIG.free.label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.free),
        },
    ]

export const TRADE_TYPE_COLUMNS: SimpleTableColumn<TradeTypePoint>[] = [
    {
        id: 'type',
        header: 'Typ obchodu',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'value',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.value),
    },
]

export const BUSINESS_REPORT_DATA = businessReport as BusinessReportData

export function formatBusinessCurrency(value: number) {
    return currencyFormatter.format(value)
}

export function formatBusinessCount(value: number) {
    return numberFormatter.format(value)
}

export function formatWeekLabel(week: string) {
    const [year, month, day] = week.split('-')
    return `${Number(day)}.${Number(month)}.${year}`
}

export function toWeeklyRevenueChartRows(
    points: WeeklyRevenuePoint[],
): WeeklyRevenueChartRow[] {
    return points.map((point) => ({
        ...point,
        label: formatWeekLabel(point.week),
    }))
}

export function sumWeeklyRevenue(points: Array<{ totalRevenue: number }>) {
    return points.reduce((sum, point) => sum + point.totalRevenue, 0)
}

export function sumBusinessCaseCounts(points: BusinessCaseStatusPoint[]) {
    return points.reduce((sum, point) => sum + point.count, 0)
}

export function sumBusinessCaseIncome(points: BusinessCaseStatusPoint[]) {
    return points.reduce((sum, point) => sum + point.potentialIncome, 0)
}

export function sumAdvertisingSpacesBySeason(
    points: AdvertisingSpaceSeasonPoint[],
) {
    return points.reduce(
        (totals, point) => ({
            occupied: totals.occupied + point.occupied,
            occupiedMultiple: totals.occupiedMultiple + point.occupiedMultiple,
            free: totals.free + point.free,
        }),
        { occupied: 0, occupiedMultiple: 0, free: 0 },
    )
}

export function sumTradeTypeValues(points: TradeTypePoint[]) {
    return points.reduce((sum, point) => sum + point.value, 0)
}

export function toTradeTypePieData(points: TradeTypePoint[]) {
    return points.map((point) => ({
        name: point.id,
        value: point.value,
        fill: `var(--color-${point.id})`,
    }))
}
