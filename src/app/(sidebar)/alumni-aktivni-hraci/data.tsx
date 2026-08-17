import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'
import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
    degreeLabel,
    facultyLabel,
    hockeyTeamLabel,
    sortByAlumniDegree,
} from '@/lib/alumni/filters'
import {
    formatPlayerCount,
    inSeasonRange,
    numberFormatter,
    sumAlumniMetrics,
    type AlumniMetricTotals,
} from '@/lib/alumni/metrics'
import { buildCategoryConfig } from '@/lib/statistics/sparse-category-chart'

import alumniBySeasonDetail from '@/lib/alumni/data/alumni-by-season-detail.json'
import type { AlumniSeasonDetailRow } from '../alumni/data'

export { toSparseCategoryChart } from '@/lib/statistics/sparse-category-chart'
export { formatPlayerCount }

const ALUMNI_BY_SEASON_DETAIL = alumniBySeasonDetail as AlumniSeasonDetailRow[]

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
    count: number
}

export type ActivePlayerStudyLevelPoint = {
    name: string
    value: number
    fill: string
}

export function filterActivePlayerRows(
    seasonFrom: string,
    seasonTo: string,
    teams: readonly string[],
    faculties: readonly string[],
    fields: readonly string[],
    degrees: readonly string[],
    rows: AlumniSeasonDetailRow[] = ALUMNI_BY_SEASON_DETAIL,
) {
    return rows.filter((row) => {
        if (!inSeasonRange(row.season, seasonFrom, seasonTo)) return false
        if (teams.length > 0 && !teams.includes(row.team)) return false
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

export function getActivePlayerTotals(rows: AlumniSeasonDetailRow[]) {
    return sumAlumniMetrics(toMetricRows(rows))
}

export function getPlayersByTeam(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerByTeamPoint[] {
    const byTeam = new Map<string, number>()
    for (const row of rows) {
        byTeam.set(row.team, (byTeam.get(row.team) ?? 0) + row.activeInSlice)
    }

    return ALUMNI_TEAM_OPTIONS.filter((option) => byTeam.has(option.value))
        .map((option) => ({
            label: option.label,
            count: byTeam.get(option.value) ?? 0,
        }))
        .filter((row) => row.count > 0)
        .sort((a, b) => b.count - a.count)
}

export function getPlayersByField(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerByFieldPoint[] {
    const byField = new Map<string, number>()
    for (const row of rows) {
        byField.set(row.field, (byField.get(row.field) ?? 0) + row.activeInSlice)
    }

    return ALUMNI_FIELD_OPTIONS.filter((option) => byField.has(option.value))
        .map((option) => ({
            label: option.label,
            count: byField.get(option.value) ?? 0,
        }))
        .filter((row) => row.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 12)
}

export function getStudyLevel(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerStudyLevelPoint[] {
    const byDegree = new Map<string, number>()
    for (const row of rows) {
        byDegree.set(
            row.degree,
            (byDegree.get(row.degree) ?? 0) + row.activeInSlice,
        )
    }

    return sortByAlumniDegree(
        ALUMNI_DEGREE_OPTIONS.map((option) => ({
            name: option.value,
            value: byDegree.get(option.value) ?? 0,
            fill: `var(--color-${option.value})`,
        })).filter((point) => point.value > 0),
        (point) => point.name,
    )
}

export const STUDY_LEVEL_CONFIG = {
    bakalarske: { label: 'Bakalářské', color: 'var(--chart-1)' },
    magisterske: { label: 'Magisterské', color: 'var(--chart-2)' },
    doktorske: { label: 'Doktorské', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function buildPlayersByTeamConfig(rows: ActivePlayerByTeamPoint[]) {
    return buildCategoryConfig(rows)
}

export function buildPlayersByFieldConfig(rows: ActivePlayerByFieldPoint[]) {
    return buildCategoryConfig(rows)
}

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

export function getPlayersByYearDegree(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerByYearDegreePoint[] {
    const byYear = new Map<
        number,
        { bakalarske: number; magisterske: number; doktorske: number }
    >()

    for (const row of rows) {
        const years = row.activeByYear ?? []
        for (let index = 0; index < years.length; index += 1) {
            const count = years[index] ?? 0
            if (count <= 0) continue
            const year = index + 1
            const counts = byYear.get(year) ?? {
                bakalarske: 0,
                magisterske: 0,
                doktorske: 0,
            }
            counts[row.degree as keyof typeof counts] += count
            byYear.set(year, counts)
        }
    }

    return [...byYear.entries()]
        .sort(([a], [b]) => a - b)
        .map(([year, counts]) => ({
            label: `${year}. ročník`,
            bakalarske: counts.bakalarske,
            magisterske: counts.magisterske,
            doktorske: counts.doktorske,
        }))
        .filter(
            (row) => row.bakalarske + row.magisterske + row.doktorske > 0,
        )
}

export function buildYearDegreeColumns(
    series: readonly (typeof YEAR_DEGREE_SERIES)[number][],
): SimpleTableColumn<ActivePlayerByYearDegreePoint>[] {
    return [
        {
            id: 'label',
            header: 'Ročník',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: YEAR_DEGREE_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: ActivePlayerByYearDegreePoint) =>
                numberFormatter.format(row[key]),
        })),
    ]
}

export function getActivePlayersDetail(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerDetailRow[] {
    const byKey = new Map<
        string,
        {
            team: string
            faculty: string
            degree: string
            year: number
            count: number
        }
    >()

    for (const row of rows) {
        const years = row.activeByYear ?? []
        for (let index = 0; index < years.length; index += 1) {
            const count = years[index] ?? 0
            if (count <= 0) continue
            const year = index + 1
            const key = `${row.team}|${row.faculty}|${row.degree}|${year}`
            const existing = byKey.get(key) ?? {
                team: hockeyTeamLabel(row.team),
                faculty: facultyLabel(row.faculty),
                degree: degreeLabel(row.degree),
                year,
                count: 0,
            }
            existing.count += count
            byKey.set(key, existing)
        }
    }

    return [...byKey.values()]
        .sort((a, b) => b.count - a.count || a.year - b.year)
        .map((entry, index) => ({
            id: `AP-${String(index + 1).padStart(3, '0')}`,
            team: entry.team,
            faculty: entry.faculty,
            degree: entry.degree,
            year: entry.year,
            count: entry.count,
        }))
}

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
        {
            id: 'count',
            header: 'Počet',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
    ]
