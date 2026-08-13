import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import leagueGraduationRate from './data/league-graduation-rate.json'
import teamComparison from './data/team-comparison.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export type LeagueGraduationPoint = {
    label: string
    rate: number
}

export type TeamComparisonPoint = {
    label: string
    rate: number
}

export const OVERVIEW_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Hráči ve výběru',
        value: numberFormatter.format(443),
        action: <InfoTooltip>Unikátní hráči</InfoTooltip>,
    },
    {
        label: 'Aktivní hráči',
        value: numberFormatter.format(419),
        action: <InfoTooltip>V sezóně 2015/2016 - 2025/2026</InfoTooltip>,
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

export const LEAGUE_GRADUATION_SERIES = ['rate'] as const

export const LEAGUE_GRADUATION_CONFIG = {
    rate: { label: 'Graduation rate (%)', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const LEAGUE_GRADUATION_RATE =
    leagueGraduationRate as LeagueGraduationPoint[]

export const LEAGUE_GRADUATION_COLUMNS: SimpleTableColumn<LeagueGraduationPoint>[] =
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

export const TEAM_COMPARISON_SERIES = ['rate'] as const

export const TEAM_COMPARISON_CONFIG = {
    rate: { label: 'Graduation rate (%)', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const TEAM_COMPARISON = teamComparison as TeamComparisonPoint[]

export const TEAM_COMPARISON_COLUMNS: SimpleTableColumn<TeamComparisonPoint>[] =
    [
        {
            id: 'label',
            header: 'Tým',
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

export function formatGraduationPercent(value: number) {
    return `${percentFormatter.format(value)} %`
}
