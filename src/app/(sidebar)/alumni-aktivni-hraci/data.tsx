import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'
import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
    degreeLabel,
    facultyLabel,
    hockeyTeamLabel,
} from '@/lib/alumni/filters'
import {
    formatPlayerCount,
    getAlumniKpis,
    inSeasonRange,
    numberFormatter,
} from '@/lib/alumni/metrics'
import { buildCategoryConfig } from '@/lib/alumni/sparse-category-chart'

import alumniBySeasonDetail from '../alumni/data/alumni-by-season-detail.json'
import type { AlumniSeasonDetailRow } from '../alumni/data'

export { toSparseCategoryChart } from '@/lib/alumni/sparse-category-chart'
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

function toMetricRows(rows: AlumniSeasonDetailRow[]) {
    return rows.map((row) => ({
        playersInSelection: row.playersInSlice,
        activePlayers: row.activeInSlice,
        alumni: row.alumni,
        completed: row.completed,
        incomplete: row.incomplete,
    }))
}

export function getActivePlayersKpis(
    rows: AlumniSeasonDetailRow[],
    seasonFrom: string,
    seasonTo: string,
) {
    return getAlumniKpis(toMetricRows(rows), seasonFrom, seasonTo)
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

    return ALUMNI_DEGREE_OPTIONS.map((option) => ({
        name: option.value,
        value: byDegree.get(option.value) ?? 0,
        fill: `var(--color-${option.value})`,
    })).filter((point) => point.value > 0)
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
    const byDegree = new Map<string, number>()
    for (const row of rows) {
        byDegree.set(
            row.degree,
            (byDegree.get(row.degree) ?? 0) + row.activeInSlice,
        )
    }

    const bakalarske = byDegree.get('bakalarske') ?? 0
    const magisterske = byDegree.get('magisterske') ?? 0
    const doktorske = byDegree.get('doktorske') ?? 0
    const total = bakalarske + magisterske + doktorske
    if (total === 0) return []

    const yearShares = [0.28, 0.26, 0.24, 0.22]

    return yearShares.map((share, index) => ({
        label: `${index + 1}. ročník`,
        bakalarske: Math.round(bakalarske * share),
        magisterske: Math.round(magisterske * share),
        doktorske: Math.round(doktorske * share),
    }))
}

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

export function getActivePlayersDetail(
    rows: AlumniSeasonDetailRow[],
): ActivePlayerDetailRow[] {
    const byKey = new Map<
        string,
        { team: string; faculty: string; degree: string; count: number }
    >()

    for (const row of rows) {
        if (row.activeInSlice <= 0) continue
        const key = `${row.team}|${row.faculty}|${row.degree}`
        const existing = byKey.get(key) ?? {
            team: hockeyTeamLabel(row.team),
            faculty: facultyLabel(row.faculty),
            degree: degreeLabel(row.degree),
            count: 0,
        }
        existing.count += row.activeInSlice
        byKey.set(key, existing)
    }

    return [...byKey.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, 50)
        .map((entry, index) => ({
            id: `AP-${String(index + 1).padStart(3, '0')}`,
            team: entry.team,
            faculty: entry.faculty,
            degree: entry.degree,
            year: (index % 4) + 1,
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
    ]
