import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'
import { buildCategoryConfig } from '@/lib/alumni/sparse-category-chart'

import activePlayersByField from './data/active-players-by-field.json'
import activePlayersByTeam from './data/active-players-by-team.json'
import activePlayersByYearDegree from './data/active-players-by-year-degree.json'
import activePlayersDetail from './data/active-players-detail.json'
import activePlayersStudyLevel from './data/active-players-study-level.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export type ActivePlayerByTeamPoint = {
    label: string
    count: number
}

export type ActivePlayerByFieldPoint = {
    label: string
    count: number
}

export type ActivePlayerByYearDegreePoint = {
    label: string
    bakalarske: number
    magisterske: number
    doktorske: number
}

export type ActivePlayerDetailRow = {
    id: string
    team: string
    faculty: string
    degree: string
    year: number
}

export type ActivePlayerStudyLevelPoint = {
    name: string
    value: number
    fill: string
}

export { toSparseCategoryChart } from '@/lib/alumni/sparse-category-chart'

export const ACTIVE_PLAYERS_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Hráči ve výběru',
        value: numberFormatter.format(443),
        action: <InfoTooltip>Posledních 3 měsíců</InfoTooltip>,
    },
    {
        label: 'Aktivní hráči',
        value: numberFormatter.format(419),
        action: <InfoTooltip>V období 01/10/2023 – 31/12/2023</InfoTooltip>,
    },
    {
        label: 'Alumni',
        value: numberFormatter.format(283),
        action: <InfoTooltip>Celkový počet bývalých hráčů</InfoTooltip>,
    },
    {
        label: 'Odchody',
        value: numberFormatter.format(0),
        action: <InfoTooltip>Ve vybraném období</InfoTooltip>,
    },
    {
        label: 'Graduation rate',
        value: `${percentFormatter.format(0)} %`,
        action: <InfoTooltip>Za 3 měsíce</InfoTooltip>,
    },
]

export const STUDY_LEVEL_CONFIG = {
    bakalarske: { label: 'Bakalářské', color: 'var(--chart-1)' },
    magisterske: { label: 'Magisterské', color: 'var(--chart-2)' },
    doktorske: { label: 'Doktorské', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const STUDY_LEVEL =
    activePlayersStudyLevel as ActivePlayerStudyLevelPoint[]

export const PLAYERS_BY_TEAM = activePlayersByTeam as ActivePlayerByTeamPoint[]

export const PLAYERS_BY_TEAM_CONFIG = buildCategoryConfig(PLAYERS_BY_TEAM)

export const PLAYERS_BY_TEAM_COLUMNS: SimpleTableColumn<ActivePlayerByTeamPoint>[] =
    [
        {
            id: 'label',
            header: 'Tým',
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
    ]

export const PLAYERS_BY_FIELD =
    activePlayersByField as ActivePlayerByFieldPoint[]

export const PLAYERS_BY_FIELD_CONFIG = buildCategoryConfig(PLAYERS_BY_FIELD)

export const PLAYERS_BY_FIELD_COLUMNS: SimpleTableColumn<ActivePlayerByFieldPoint>[] =
    [
        {
            id: 'label',
            header: 'Obor',
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
    ]

export const YEAR_DEGREE_SERIES = [
    'bakalarske',
    'magisterske',
    'doktorske',
] as const

export const YEAR_DEGREE_CONFIG = STUDY_LEVEL_CONFIG

export const PLAYERS_BY_YEAR_DEGREE =
    activePlayersByYearDegree as ActivePlayerByYearDegreePoint[]

export const YEAR_DEGREE_COLUMNS: SimpleTableColumn<ActivePlayerByYearDegreePoint>[] =
    [
        {
            id: 'label',
            header: 'Ročník',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'bakalarske',
            header: 'Bakalářské',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.bakalarske),
        },
        {
            id: 'magisterske',
            header: 'Magisterské',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.magisterske),
        },
        {
            id: 'doktorske',
            header: 'Doktorské',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.doktorske),
        },
    ]

export const ACTIVE_PLAYERS_DETAIL =
    activePlayersDetail as ActivePlayerDetailRow[]

export const ACTIVE_PLAYERS_DETAIL_COLUMNS: SimpleTableColumn<ActivePlayerDetailRow>[] =
    [
        {
            id: 'team',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.team,
        },
        {
            id: 'faculty',
            header: 'Fakulta',
            cell: (row) => row.faculty,
        },
        {
            id: 'degree',
            header: 'Stupeň',
            cell: (row) => row.degree,
        },
        {
            id: 'year',
            header: 'Ročník',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.year),
        },
    ]

export function formatPlayerCount(value: number) {
    return numberFormatter.format(value)
}
