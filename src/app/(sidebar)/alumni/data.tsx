import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'
import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_SEASON_OPTIONS,
    facultyLabel,
    fieldLabel,
    hockeyTeamLabel,
    schoolLabel,
} from '@/lib/alumni/filters'
import {
    formatGraduationPercent,
    formatPlayerCount,
    inSeasonRange,
    numberFormatter,
    percentFormatter,
    sumAlumniMetrics,
    type AlumniMetricTotals,
} from '@/lib/alumni/metrics'
import { buildCategoryConfig } from '@/lib/alumni/sparse-category-chart'

import alumniBySeasonDetail from './data/alumni-by-season-detail.json'

export { formatGraduationPercent, formatPlayerCount }

export type AlumniSeasonDetailRow = {
    season: string
    team: string
    school: string
    faculty: string
    field: string
    degree: string
    playersInSelection: number
    activePlayers: number
    /** Share of team roster in this study slice (for filtered KPIs). */
    activeInSlice: number
    /** Share of team selection in this study slice (for filtered KPIs). */
    playersInSlice: number
    /**
     * Active players in this slice by year within the degree
     * (index 0 = 1st year). Length 4; unused years are 0.
     * Sum equals `activeInSlice`.
     */
    activeByYear: number[]
    /** Total alumni for team in season — same on all breakdown rows. */
    teamSeasonAlumni: number
    /** Total departures for team in season — same on all breakdown rows. */
    teamSeasonDepartures: number
    alumni: number
    completed: number
    incomplete: number
    /** Custom display name; when omitted, the hockey team label is used. */
    teamLabel?: string
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
    team: string
    faculty: string
    count: number
    share: number
}

export type AlumniDegreeStructurePoint = {
    label: string
    bakalarske: number
    magisterske: number
    doktorske: number
}

export type AlumniHighestDegreePoint = {
    name: string
    value: number
    fill: string
}

export const ALUMNI_BY_SEASON_DETAIL =
    alumniBySeasonDetail as AlumniSeasonDetailRow[]

function alumniTeamDisplayName(row: Pick<AlumniSeasonDetailRow, 'team' | 'teamLabel'>) {
    if (row.teamLabel) return row.teamLabel
    return hockeyTeamLabel(row.team)
}

export function filterAlumniRows(
    seasonFrom: string,
    seasonTo: string,
    teams: readonly string[],
    schools: readonly string[],
    faculties: readonly string[],
    fields: readonly string[],
    degrees: readonly string[],
    rows: AlumniSeasonDetailRow[] = ALUMNI_BY_SEASON_DETAIL,
) {
    return rows.filter((row) => {
        if (!inSeasonRange(row.season, seasonFrom, seasonTo)) return false
        if (teams.length > 0 && !teams.includes(row.team)) return false
        if (schools.length > 0 && !schools.includes(row.school)) return false
        if (faculties.length > 0 && !faculties.includes(row.faculty)) return false
        if (fields.length > 0 && !fields.includes(row.field)) return false
        if (degrees.length > 0 && !degrees.includes(row.degree)) return false
        return true
    })
}

function toMetricRows(rows: AlumniSeasonDetailRow[]): AlumniMetricTotals[] {
    return rows.map((row) => ({
        playersInSelection: row.playersInSlice,
        activePlayers: row.activeInSlice,
        alumni: row.alumni,
        completed: row.completed,
        incomplete: row.incomplete,
    }))
}

export function getAlumniTotals(rows: AlumniSeasonDetailRow[]) {
    return sumAlumniMetrics(toMetricRows(rows))
}

export function getAlumniTopFields(
    rows: AlumniSeasonDetailRow[],
): AlumniTopFieldPoint[] {
    const byField = new Map<string, number>()
    for (const row of rows) {
        const label = fieldLabel(row.field)
        byField.set(label, (byField.get(label) ?? 0) + row.alumni)
    }
    return [...byField.entries()]
        .map(([label, count]) => ({ label, count: Math.round(count) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
}

export function getAlumniByUniversity(
    rows: AlumniSeasonDetailRow[],
): AlumniByUniversityPoint[] {
    const bySchool = new Map<string, number>()
    for (const row of rows) {
        const label = schoolLabel(row.school)
        bySchool.set(label, (bySchool.get(label) ?? 0) + row.alumni)
    }
    return [...bySchool.entries()]
        .map(([label, count]) => ({ label, count: Math.round(count) }))
        .sort((a, b) => b.count - a.count)
}

export function getAlumniByUniversityFaculty(
    rows: AlumniSeasonDetailRow[],
): AlumniByUniversityFacultyRow[] {
    const byKey = new Map<
        string,
        { school: string; team: string; faculty: string; count: number }
    >()
    let total = 0

    for (const row of rows) {
        const school = schoolLabel(row.school)
        const team = alumniTeamDisplayName(row)
        const faculty = facultyLabel(row.faculty)
        const key = `${school}|${row.team}|${faculty}`
        const existing = byKey.get(key) ?? { school, team, faculty, count: 0 }
        existing.count += row.alumni
        byKey.set(key, existing)
        total += row.alumni
    }

    return [...byKey.values()]
        .map((entry, index) => ({
            id: `AU-${String(index + 1).padStart(3, '0')}`,
            school: entry.school,
            team: entry.team,
            faculty: entry.faculty,
            count: Math.round(entry.count),
            share: total > 0 ? (entry.count / total) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count)
}

export function getAlumniHighestDegree(
    rows: AlumniSeasonDetailRow[],
): AlumniHighestDegreePoint[] {
    const byDegree = new Map<string, number>()
    for (const row of rows) {
        byDegree.set(row.degree, (byDegree.get(row.degree) ?? 0) + row.alumni)
    }

    return ALUMNI_DEGREE_OPTIONS.map((option) => ({
        name: option.value,
        value: Math.round(byDegree.get(option.value) ?? 0),
        fill: `var(--color-${option.value})`,
    })).filter((point) => point.value > 0)
}

export function getAlumniDegreeStructure(
    rows: AlumniSeasonDetailRow[],
): AlumniDegreeStructurePoint[] {
    const bySeason = new Map<
        string,
        { bakalarske: number; magisterske: number; doktorske: number }
    >()

    for (const row of rows) {
        const counts = bySeason.get(row.season) ?? {
            bakalarske: 0,
            magisterske: 0,
            doktorske: 0,
        }
        counts[row.degree as keyof typeof counts] += row.alumni
        bySeason.set(row.season, counts)
    }

    return ALUMNI_SEASON_OPTIONS.map((option) => option.value)
        .filter((season) => bySeason.has(season))
        .map((season) => {
        const counts = bySeason.get(season)!
        const total = counts.bakalarske + counts.magisterske + counts.doktorske
        return {
            label: season,
            bakalarske: total > 0 ? (counts.bakalarske / total) * 100 : 0,
            magisterske: total > 0 ? (counts.magisterske / total) * 100 : 0,
            doktorske: total > 0 ? (counts.doktorske / total) * 100 : 0,
        }
    })
}

export const ALUMNI_HIGHEST_DEGREE_CONFIG = {
    bakalarske: { label: 'Bakalářské', color: 'var(--chart-1)' },
    magisterske: { label: 'Magisterské', color: 'var(--chart-2)' },
    doktorske: { label: 'Doktorské', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const ALUMNI_DEGREE_STRUCTURE_SERIES = [
    'bakalarske',
    'magisterske',
    'doktorske',
] as const

export type AlumniDegreeStructureSeriesKey =
    (typeof ALUMNI_DEGREE_STRUCTURE_SERIES)[number]

export function getAlumniDegreeStructureSeries(
    rows: AlumniSeasonDetailRow[],
): AlumniDegreeStructureSeriesKey[] {
    const present = new Set(rows.map((row) => row.degree))
    return ALUMNI_DEGREE_STRUCTURE_SERIES.filter((series) => present.has(series))
}

export function buildAlumniDegreeStructureConfig(
    series: readonly AlumniDegreeStructureSeriesKey[],
): ChartConfig {
    return Object.fromEntries(
        series.map((key) => [key, ALUMNI_DEGREE_STRUCTURE_CONFIG[key]]),
    )
}

export function buildAlumniDegreeStructureColumns(
    series: readonly AlumniDegreeStructureSeriesKey[],
): SimpleTableColumn<AlumniDegreeStructurePoint>[] {
    const byId = Object.fromEntries(
        ALUMNI_DEGREE_STRUCTURE_COLUMNS.map((column) => [column.id, column]),
    ) as Record<string, SimpleTableColumn<AlumniDegreeStructurePoint>>

    return [
        byId.label,
        ...series.map((key) => byId[key]).filter(Boolean),
    ]
}

export function buildAlumniHighestDegreeConfig(
    points: AlumniHighestDegreePoint[],
): ChartConfig {
    return Object.fromEntries(
        points.map((point) => [
            point.name,
            ALUMNI_HIGHEST_DEGREE_CONFIG[
                point.name as keyof typeof ALUMNI_HIGHEST_DEGREE_CONFIG
            ],
        ]),
    )
}

export const ALUMNI_DEGREE_STRUCTURE_CONFIG = {
    bakalarske: { label: 'Bakalářské', color: 'var(--chart-1)' },
    magisterske: { label: 'Magisterské', color: 'var(--chart-2)' },
    doktorske: { label: 'Doktorské', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const ALUMNI_DEGREE_STRUCTURE_COLUMNS: SimpleTableColumn<AlumniDegreeStructurePoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'bakalarske',
            header: 'Bakalářské (%)',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.bakalarske),
        },
        {
            id: 'magisterske',
            header: 'Magisterské (%)',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.magisterske),
        },
        {
            id: 'doktorske',
            header: 'Doktorské (%)',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => percentFormatter.format(row.doktorske),
        },
    ]

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

export const ALUMNI_TOP_FIELDS_COLUMNS: SimpleTableColumn<AlumniTopFieldPoint>[] = [
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

export const ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS: SimpleTableColumn<AlumniByUniversityFacultyRow>[] =
    [
        {
            id: 'school',
            header: 'Škola',
            cellClassName: 'font-medium',
            cell: (row) => row.school,
        },
        {
            id: 'team',
            header: 'Tým',
            cell: (row) => row.team,
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

export function buildAlumniByUniversityConfig(rows: AlumniByUniversityPoint[]) {
    return buildCategoryConfig(rows)
}

export function buildAlumniTopFieldsConfig(rows: AlumniTopFieldPoint[]) {
    return buildCategoryConfig(rows)
}

