import type { NavTabItem } from '@/components/custom/layout/nav-tabs'
import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import leagueGraduationRate from './data/league-graduation-rate.json'
import teamComparison from './data/team-comparison.json'
import activePlayersStudyLevel from './data/active-players-study-level.json'
import activePlayersByTeam from './data/active-players-by-team.json'
import activePlayersByYearDegree from './data/active-players-by-year-degree.json'
import activePlayersDetail from './data/active-players-detail.json'
import alumniByUniversity from './data/alumni-by-university.json'
import alumniByUniversityFaculty from './data/alumni-by-university-faculty.json'
import alumniDegreeStructure from './data/alumni-degree-structure.json'
import alumniHighestDegree from './data/alumni-highest-degree.json'
import alumniTopFields from './data/alumni-top-fields.json'
import graduationAverageByTeam from './data/graduation-average-by-team.json'
import graduationCompletedVsNot from './data/graduation-completed-vs-not.json'
import graduationRateByTeamSeason from './data/graduation-rate-by-team-season.json'
import graduationRateOverTime from './data/graduation-rate-over-time.json'

export const ALUMNI_DASHBOARD_TABS: NavTabItem[] = [
    { label: 'Přehled', href: '/alumni-dashboard' },
    { label: 'Graduation rate', href: '/alumni-dashboard/graduation-rate' },
    { label: 'Alumni', href: '/alumni-dashboard/alumni' },
    { label: 'Aktivní hráči', href: '/alumni-dashboard/aktivni-hraci' },
]

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

export type ActivePlayerByTeamPoint = {
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

export const PLAYERS_BY_TEAM_SERIES = ['count'] as const

export const PLAYERS_BY_TEAM_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const PLAYERS_BY_TEAM =
    activePlayersByTeam as ActivePlayerByTeamPoint[]

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

export type AlumniByUniversityPoint = {
    label: string
    count: number
}

export type AlumniTopFieldPoint = {
    label: string
    count: number
}

export type AlumniByUniversityFacultyRow = {
    id: string
    school: string
    faculty: string
    count: number
    share: number
}

export type AlumniDegreeStructurePoint = {
    label: string
    stredoskolske: number
}

export type AlumniHighestDegreePoint = {
    name: string
    value: number
    fill: string
}

export const ALUMNI_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Hráči ve výběru',
        value: numberFormatter.format(443),
        action: <InfoTooltip>Víceméně klesá</InfoTooltip>,
    },
    {
        label: 'Aktivní hráči',
        value: numberFormatter.format(419),
        action: <InfoTooltip>V období 2010/2012 – 2022/2023</InfoTooltip>,
    },
    {
        label: 'Alumni',
        value: numberFormatter.format(283),
        action: <InfoTooltip>Nemá klesající ani rostoucí trend</InfoTooltip>,
    },
    {
        label: 'Odchody',
        value: numberFormatter.format(0),
        action: <InfoTooltip>Ve srovnání s výběrem</InfoTooltip>,
    },
    {
        label: 'Graduation rate',
        value: `${percentFormatter.format(0)} %`,
        action: <InfoTooltip>0 z 0 studentů</InfoTooltip>,
    },
]

export const ALUMNI_HIGHEST_DEGREE_CONFIG = {
    stredoskolske: { label: 'Středoškolské', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const ALUMNI_HIGHEST_DEGREE =
    alumniHighestDegree as AlumniHighestDegreePoint[]

export const ALUMNI_DEGREE_STRUCTURE_SERIES = ['stredoskolske'] as const

export const ALUMNI_DEGREE_STRUCTURE_CONFIG = {
    stredoskolske: { label: 'Středoškolské', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const ALUMNI_DEGREE_STRUCTURE =
    alumniDegreeStructure as AlumniDegreeStructurePoint[]

export const ALUMNI_DEGREE_STRUCTURE_COLUMNS: SimpleTableColumn<AlumniDegreeStructurePoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'stredoskolske',
            header: 'Středoškolské (%)',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.stredoskolske),
        },
    ]

export const ALUMNI_BY_UNIVERSITY_SERIES = ['count'] as const

export const ALUMNI_BY_UNIVERSITY_CONFIG = {
    count: { label: 'Počet alumni', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const ALUMNI_BY_UNIVERSITY =
    alumniByUniversity as AlumniByUniversityPoint[]

export const ALUMNI_BY_UNIVERSITY_COLUMNS: SimpleTableColumn<AlumniByUniversityPoint>[] =
    [
        {
            id: 'label',
            header: 'Univerzita',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'count',
            header: 'Počet alumni',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
    ]

export const ALUMNI_TOP_FIELDS_SERIES = ['count'] as const

export const ALUMNI_TOP_FIELDS_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const ALUMNI_TOP_FIELDS = alumniTopFields as AlumniTopFieldPoint[]

export const ALUMNI_TOP_FIELDS_COLUMNS: SimpleTableColumn<AlumniTopFieldPoint>[] =
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

export const ALUMNI_BY_UNIVERSITY_FACULTY =
    alumniByUniversityFaculty as AlumniByUniversityFacultyRow[]

export const ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS: SimpleTableColumn<AlumniByUniversityFacultyRow>[] =
    [
        {
            id: 'school',
            header: 'Škola | Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.school,
        },
        {
            id: 'faculty',
            header: 'Fakulta',
            cell: (row) => row.faculty,
        },
        {
            id: 'count',
            header: 'Počet alumni',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
        {
            id: 'share',
            header: 'Podíl',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => `${percentFormatter.format(row.share)} %`,
        },
    ]

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
