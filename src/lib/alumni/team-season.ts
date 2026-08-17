import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import { ALUMNI_SEASON_OPTIONS, ALUMNI_TEAM_OPTIONS } from './filters'
import {
    inSeasonRange,
    percentFormatter,
    rateFromDepartures,
    sumAlumniMetrics,
} from './metrics'

export type AlumniTeamSeasonRow = {
    season: string
    team: string
    playersInSelection: number
    activePlayers: number
    alumni: number
    completed: number
    incomplete: number
}

export type GraduationByTeamSeasonPoint = {
    label: string
    average?: number
} & Partial<Record<(typeof GRADUATION_BY_TEAM_SERIES)[number], number>>

export type TeamComparisonPoint = {
    label: string
    rate: number
}

export type GraduationAverageByTeamRow = {
    id: string
    team: string
    departures: number
    rate: number
}

export const GRADUATION_BY_TEAM_SERIES = [
    'black-dogs-budweis',
    'sparta',
    'kometa',
    'dynamo',
    'mountfield',
    'trinec',
] as const

export type GraduationByTeamSeriesKey =
    (typeof GRADUATION_BY_TEAM_SERIES)[number]

export const GRADUATION_BY_TEAM_CONFIG = {
    'black-dogs-budweis': {
        label: 'Black Dogs Budweis',
        color: 'var(--chart-1)',
    },
    sparta: { label: 'HC Sparta Praha', color: 'var(--chart-2)' },
    kometa: { label: 'HC Kometa Brno', color: 'var(--chart-3)' },
    dynamo: { label: 'HC Dynamo Pardubice', color: 'var(--chart-4)' },
    mountfield: { label: 'Mountfield HK', color: 'var(--chart-5)' },
    trinec: { label: 'HC Oceláři Třinec', color: 'var(--chart-6)' },
} satisfies ChartConfig

const SEASON_VALUES = ALUMNI_SEASON_OPTIONS.map((option) => option.value)

export function filterTeamSeasonRows(
    seasonFrom: string,
    seasonTo: string,
    teams: readonly string[],
    rows: readonly AlumniTeamSeasonRow[],
) {
    return rows.filter((row) => {
        if (!inSeasonRange(row.season, seasonFrom, seasonTo)) return false
        if (teams.length > 0 && !teams.includes(row.team)) return false
        return true
    })
}

export function getGraduationByTeamSeason(
    rows: readonly AlumniTeamSeasonRow[],
): GraduationByTeamSeasonPoint[] {
    const bySeason = new Map<
        string,
        {
            teams: Partial<Record<GraduationByTeamSeriesKey, number>>
            completed: number
            incomplete: number
        }
    >()

    for (const row of rows) {
        const current = bySeason.get(row.season) ?? {
            teams: {},
            completed: 0,
            incomplete: 0,
        }
        current.completed += row.completed
        current.incomplete += row.incomplete
        const departures = row.completed + row.incomplete
        if (
            departures > 0 &&
            row.team in GRADUATION_BY_TEAM_CONFIG
        ) {
            current.teams[row.team as GraduationByTeamSeriesKey] =
                rateFromDepartures(row.completed, row.incomplete)
        }
        bySeason.set(row.season, current)
    }

    return SEASON_VALUES.filter((season) => bySeason.has(season)).map(
        (season) => {
            const current = bySeason.get(season)!
            const leagueDepartures = current.completed + current.incomplete
            return {
                label: season,
                ...current.teams,
                ...(leagueDepartures > 0
                    ? {
                          average: rateFromDepartures(
                              current.completed,
                              current.incomplete,
                          ),
                      }
                    : {}),
            }
        },
    )
}

export function getGraduationByTeamSeries(
    rows: readonly AlumniTeamSeasonRow[],
): GraduationByTeamSeriesKey[] {
    const present = new Set(rows.map((row) => row.team))
    return GRADUATION_BY_TEAM_SERIES.filter((team) => present.has(team))
}

export function getTeamComparison(
    rows: readonly AlumniTeamSeasonRow[],
): TeamComparisonPoint[] {
    const byTeam = new Map<string, { completed: number; incomplete: number }>()
    for (const row of rows) {
        const current = byTeam.get(row.team) ?? { completed: 0, incomplete: 0 }
        current.completed += row.completed
        current.incomplete += row.incomplete
        byTeam.set(row.team, current)
    }

    return ALUMNI_TEAM_OPTIONS.filter((option) => byTeam.has(option.value))
        .map((option) => {
            const totals = byTeam.get(option.value)!
            return {
                label: option.label,
                rate: rateFromDepartures(totals.completed, totals.incomplete),
            }
        })
        .sort((a, b) => b.rate - a.rate)
}

export function getAverageByTeam(
    rows: readonly AlumniTeamSeasonRow[],
): GraduationAverageByTeamRow[] {
    const byTeam = new Map<string, { completed: number; incomplete: number }>()
    for (const row of rows) {
        const current = byTeam.get(row.team) ?? { completed: 0, incomplete: 0 }
        current.completed += row.completed
        current.incomplete += row.incomplete
        byTeam.set(row.team, current)
    }

    const teamRows = ALUMNI_TEAM_OPTIONS.filter((option) => byTeam.has(option.value)).map(
        (option) => {
            const totals = byTeam.get(option.value)!
            const departures = totals.completed + totals.incomplete
            return {
                id: option.value,
                team: option.label,
                departures,
                rate: rateFromDepartures(totals.completed, totals.incomplete),
            }
        },
    )

    if (rows.length === 0) return teamRows

    const presentTeams = new Set(rows.map((row) => row.team))
    if (presentTeams.size <= 1) return teamRows

    const league = sumAlumniMetrics(rows)
    return [
        {
            id: 'league',
            team: 'Celá liga',
            departures: league.completed + league.incomplete,
            rate: rateFromDepartures(league.completed, league.incomplete),
        },
        ...teamRows,
    ]
}

export function buildGraduationByTeamColumns(
    series: readonly GraduationByTeamSeriesKey[],
): SimpleTableColumn<GraduationByTeamSeasonPoint>[] {
    return [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: GRADUATION_BY_TEAM_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: GraduationByTeamSeasonPoint) =>
                row[key] == null ? '–' : percentFormatter.format(row[key]),
        })),
    ]
}

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
