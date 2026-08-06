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

export type BusinessReportData = {
    meta: {
        organizationName: string
        generatedAt: string
        currency: 'CZK'
    }
    businessCasesByStatus: BusinessCaseStatusPoint[]
    advertisingSpacesBySeason: AdvertisingSpaceSeasonPoint[]
    tradeTypeRatio: TradeTypePoint[]
}

export const BUSINESS_CASE_STATUS_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
    potentialIncome: {
        label: 'Potenciální příjem [mil. Kč]',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig

export const BUSINESS_CASE_STATUS_SERIES = [
    'count',
    'potentialIncome',
] as const

/** Chart-friendly income (mil. Kč) so count + income can share a stacked axis. */
export function toBusinessCaseChartRows(points: BusinessCaseStatusPoint[]) {
    return points.map((point) => ({
        ...point,
        potentialIncome: point.potentialIncome / 1_000_000,
    }))
}

export const ADVERTISING_SPACES_CONFIG = {
    occupied: { label: 'Obsazeno', color: 'var(--chart-2)' },
    occupiedMultiple: { label: 'Obsazeno vícekrát', color: 'var(--chart-1)' },
    free: { label: 'Volno', color: 'var(--chart-3)' },
} satisfies ChartConfig

export type AdvertisingSpaceSlice = {
    id: keyof typeof ADVERTISING_SPACES_CONFIG
    label: string
    value: number
}

export const TRADE_TYPE_CONFIG = {
    empty: { label: 'Prázdný', color: 'var(--destructive)' },
    finance: { label: 'Finance', color: 'var(--chart-1)' },
    combined: { label: 'Kombinovaný', color: 'var(--chart-3)' },
} satisfies ChartConfig

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

export const ADVERTISING_SPACES_COLUMNS: SimpleTableColumn<AdvertisingSpaceSlice>[] =
    [
        {
            id: 'status',
            header: 'Stav',
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

export function sumBusinessCaseCounts(points: BusinessCaseStatusPoint[]) {
    return points.reduce((sum, point) => sum + point.count, 0)
}

export function sumBusinessCaseIncome(points: BusinessCaseStatusPoint[]) {
    return points.reduce((sum, point) => sum + point.potentialIncome, 0)
}

export function toAdvertisingSpaceSlices(
    point: AdvertisingSpaceSeasonPoint,
): AdvertisingSpaceSlice[] {
    return [
        {
            id: 'occupied',
            label: ADVERTISING_SPACES_CONFIG.occupied.label,
            value: point.occupied,
        },
        {
            id: 'occupiedMultiple',
            label: ADVERTISING_SPACES_CONFIG.occupiedMultiple.label,
            value: point.occupiedMultiple,
        },
        {
            id: 'free',
            label: ADVERTISING_SPACES_CONFIG.free.label,
            value: point.free,
        },
    ]
}

export function sumAdvertisingSpaceSlices(slices: AdvertisingSpaceSlice[]) {
    return slices.reduce((sum, slice) => sum + slice.value, 0)
}

export function toAdvertisingSpacesPieData(slices: AdvertisingSpaceSlice[]) {
    return slices.map((slice) => ({
        name: slice.id,
        value: slice.value,
        fill: `var(--color-${slice.id})`,
    }))
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
