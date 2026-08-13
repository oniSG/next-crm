import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import graduationAverageByTeam from './data/graduation-average-by-team.json'
import graduationCompletedVsNot from './data/graduation-completed-vs-not.json'
import graduationRateByTeamSeason from './data/graduation-rate-by-team-season.json'
import graduationRateOverTime from './data/graduation-rate-over-time.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export type GraduationRatePoint = {
    label: string
    rate: number
}

export type GraduationCompletedVsNotPoint = {
    label: string
    dokoncili: number
    nedokoncili: number
}

export type GraduationAverageByTeamRow = {
    id: string
    team: string
    odchody: number
    rate: number
}

export type GraduationRateByTeamSeasonPoint = {
    label: string
    sparta: number
    kometa: number
    trinec: number
}

export const GRADUATION_RATE_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Hráči ve výběru',
        value: numberFormatter.format(443),
        action: <InfoTooltip>Unikátní hráči</InfoTooltip>,
    },
    {
        label: 'Aktivní hráči',
        value: numberFormatter.format(419),
        action: <InfoTooltip>V sezóně 2015/2016 – 2025/2026</InfoTooltip>,
    },
    {
        label: 'Alumni',
        value: numberFormatter.format(283),
        action: <InfoTooltip>Dokončili alespoň jeden stupeň</InfoTooltip>,
    },
    {
        label: 'Odchody',
        value: numberFormatter.format(0),
        action: <InfoTooltip>Ve zvoleném období</InfoTooltip>,
    },
    {
        label: 'Graduation rate',
        value: `${percentFormatter.format(0)} %`,
        action: <InfoTooltip>0 z 0 odchodů</InfoTooltip>,
    },
]

export const GRADUATION_RATE_OVER_TIME_SERIES = ['rate'] as const

export const GRADUATION_RATE_OVER_TIME_CONFIG = {
    rate: { label: 'Graduation rate (%)', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const GRADUATION_RATE_OVER_TIME =
    graduationRateOverTime as GraduationRatePoint[]

export const GRADUATION_RATE_OVER_TIME_COLUMNS: SimpleTableColumn<GraduationRatePoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'rate',
            header: 'Graduation rate (%)',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.rate),
        },
    ]

export const COMPLETED_VS_NOT_SERIES = ['dokoncili', 'nedokoncili'] as const

export const COMPLETED_VS_NOT_CONFIG = {
    dokoncili: { label: 'Dokončili', color: 'var(--chart-1)' },
    nedokoncili: { label: 'Nedokončili', color: 'var(--chart-7)' },
} satisfies ChartConfig

export const COMPLETED_VS_NOT =
    graduationCompletedVsNot as GraduationCompletedVsNotPoint[]

export const COMPLETED_VS_NOT_COLUMNS: SimpleTableColumn<GraduationCompletedVsNotPoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'dokoncili',
            header: 'Dokončili',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.dokoncili),
        },
        {
            id: 'nedokoncili',
            header: 'Nedokončili',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.nedokoncili),
        },
    ]

export const GRADUATION_AVERAGE_BY_TEAM =
    graduationAverageByTeam as GraduationAverageByTeamRow[]

export const GRADUATION_AVERAGE_BY_TEAM_COLUMNS: SimpleTableColumn<GraduationAverageByTeamRow>[] =
    [
        {
            id: 'team',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.team,
        },
        {
            id: 'odchody',
            header: 'Odchody',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.odchody),
        },
        {
            id: 'rate',
            header: 'Graduation rate',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => `${percentFormatter.format(row.rate)} %`,
        },
    ]

export const GRADUATION_BY_TEAM_SEASON_SERIES = [
    'sparta',
    'kometa',
    'trinec',
] as const

export const GRADUATION_BY_TEAM_SEASON_CONFIG = {
    sparta: { label: 'HC Sparta Praha', color: 'var(--chart-1)' },
    kometa: { label: 'HC Kometa Brno', color: 'var(--chart-2)' },
    trinec: { label: 'HC Oceláři Třinec', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const GRADUATION_BY_TEAM_SEASON =
    graduationRateByTeamSeason as GraduationRateByTeamSeasonPoint[]

export const GRADUATION_BY_TEAM_SEASON_COLUMNS: SimpleTableColumn<GraduationRateByTeamSeasonPoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'sparta',
            header: 'HC Sparta Praha',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.sparta),
        },
        {
            id: 'kometa',
            header: 'HC Kometa Brno',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.kometa),
        },
        {
            id: 'trinec',
            header: 'HC Oceláři Třinec',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.trinec),
        },
    ]

export function formatGraduationPercent(value: number) {
    return `${percentFormatter.format(value)} %`
}

export function formatPlayerCount(value: number) {
    return numberFormatter.format(value)
}
