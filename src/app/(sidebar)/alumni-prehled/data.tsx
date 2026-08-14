import {
    formatGraduationPercent,
    getAlumniKpis,
} from '@/lib/alumni/metrics'
import {
    buildGraduationByTeamColumns,
    filterTeamSeasonRows,
    getGraduationByTeamSeason,
    getGraduationByTeamSeries,
    getTeamComparison,
    GRADUATION_BY_TEAM_CONFIG,
    GRADUATION_BY_TEAM_SERIES,
    TEAM_COMPARISON_COLUMNS,
    type AlumniTeamSeasonRow,
    type GraduationByTeamSeasonPoint,
    type TeamComparisonPoint,
} from '@/lib/alumni/team-season'

import graduationBySeasonTeam from '../alumni-graduation-rate/data/graduation-by-season-team.json'

export type {
    AlumniTeamSeasonRow as OverviewSeasonTeamRow,
    GraduationByTeamSeasonPoint as LeagueGraduationPoint,
    TeamComparisonPoint,
}

export {
    buildGraduationByTeamColumns,
    formatGraduationPercent,
    getGraduationByTeamSeason as getLeagueGraduationRate,
    getGraduationByTeamSeries,
    getTeamComparison,
    GRADUATION_BY_TEAM_CONFIG,
    GRADUATION_BY_TEAM_SERIES,
    TEAM_COMPARISON_COLUMNS,
}

export const OVERVIEW_BY_SEASON_TEAM =
    graduationBySeasonTeam as AlumniTeamSeasonRow[]

export function filterOverviewRows(
    seasonFrom: string,
    seasonTo: string,
    teams: readonly string[],
    rows: AlumniTeamSeasonRow[] = OVERVIEW_BY_SEASON_TEAM,
) {
    return filterTeamSeasonRows(seasonFrom, seasonTo, teams, rows)
}

export function getOverviewKpis(
    rows: AlumniTeamSeasonRow[],
    seasonFrom: string,
    seasonTo: string,
) {
    return getAlumniKpis(rows, seasonFrom, seasonTo)
}
