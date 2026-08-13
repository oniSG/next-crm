import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import alumniByUniversity from './data/alumni-by-university.json'
import alumniByUniversityFaculty from './data/alumni-by-university-faculty.json'
import alumniDegreeStructure from './data/alumni-degree-structure.json'
import alumniHighestDegree from './data/alumni-highest-degree.json'
import alumniTopFields from './data/alumni-top-fields.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

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

export function formatGraduationPercent(value: number) {
    return `${percentFormatter.format(value)} %`
}

export function formatPlayerCount(value: number) {
    return numberFormatter.format(value)
}
