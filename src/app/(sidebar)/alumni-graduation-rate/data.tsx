import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'
import { ALUMNI_SEASON_OPTIONS } from '@/lib/alumni/filters'
import {
    formatGraduationPercent,
    formatPlayerCount,
    numberFormatter,
    percentFormatter,
} from '@/lib/alumni/metrics'
import {
    buildGraduationByTeamColumns,
    filterTeamSeasonRows,
    getAverageByTeam,
    getGraduationByTeamSeason,
    getGraduationByTeamSeries,
    GRADUATION_BY_TEAM_CONFIG,
    GRADUATION_BY_TEAM_SERIES,
    type AlumniTeamSeasonRow,
    type GraduationAverageByTeamRow,
    type GraduationByTeamSeasonPoint,
} from '@/lib/alumni/team-season'

import graduationBySeasonTeam from './data/graduation-by-season-team.json'

export type {
    AlumniTeamSeasonRow as GraduationSeasonTeamRow,
    GraduationAverageByTeamRow,
    GraduationByTeamSeasonPoint as GraduationRateByTeamSeasonPoint,
}

export {
    buildGraduationByTeamColumns,
    formatGraduationPercent,
    formatPlayerCount,
    getAverageByTeam,
    getGraduationByTeamSeason,
    getGraduationByTeamSeries,
    GRADUATION_BY_TEAM_CONFIG as GRADUATION_BY_TEAM_SEASON_CONFIG,
    GRADUATION_BY_TEAM_SERIES as GRADUATION_BY_TEAM_SEASON_SERIES,
}

export const GRADUATION_BY_SEASON_TEAM =
    graduationBySeasonTeam as AlumniTeamSeasonRow[]

const SEASON_VALUES = ALUMNI_SEASON_OPTIONS.map((option) => option.value)

export function filterGraduationRows(
    seasonFrom: string,
    seasonTo: string,
    teams: readonly string[],
    rows: AlumniTeamSeasonRow[] = GRADUATION_BY_SEASON_TEAM,
) {
    return filterTeamSeasonRows(seasonFrom, seasonTo, teams, rows)
}

export type GraduationCompletedVsNotPoint = {
    label: string
    completed: number
    incomplete: number
}

export function getCompletedVsNot(
    rows: AlumniTeamSeasonRow[],
): GraduationCompletedVsNotPoint[] {
    const bySeason = new Map<string, { completed: number; incomplete: number }>()
    for (const row of rows) {
        const current = bySeason.get(row.season) ?? { completed: 0, incomplete: 0 }
        current.completed += row.completed
        current.incomplete += row.incomplete
        bySeason.set(row.season, current)
    }

    return SEASON_VALUES.filter((season) => bySeason.has(season)).map((season) => {
        const totals = bySeason.get(season)!
        return {
            label: season,
            completed: totals.completed,
            incomplete: totals.incomplete,
        }
    })
}

export const COMPLETED_VS_NOT_SERIES = ['completed', 'incomplete'] as const

export const COMPLETED_VS_NOT_CONFIG = {
    completed: { label: 'Dokončili', color: 'var(--chart-1)' },
    incomplete: { label: 'Nedokončili', color: 'var(--chart-7)' },
} satisfies ChartConfig

export const COMPLETED_VS_NOT_COLUMNS: SimpleTableColumn<GraduationCompletedVsNotPoint>[] =
    [
        {
            id: 'label',
            header: 'Sezóna',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'completed',
            header: 'Dokončili',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.completed),
        },
        {
            id: 'incomplete',
            header: 'Nedokončili',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.incomplete),
        },
    ]

export const GRADUATION_AVERAGE_BY_TEAM_COLUMNS: SimpleTableColumn<GraduationAverageByTeamRow>[] =
    [
        {
            id: 'team',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.team,
        },
        {
            id: 'departures',
            header: 'Odchody',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.departures),
        },
        {
            id: 'rate',
            header: 'Graduation rate',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => `${percentFormatter.format(row.rate)} %`,
        },
    ]
