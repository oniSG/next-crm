import { ALUMNI_SEASON_OPTIONS } from './filters'

/** Czech locale integer formatting (e.g. 58 426). */
export const numberFormatter = new Intl.NumberFormat('cs-CZ')

/** Czech locale percent with one decimal (e.g. 78,1). */
export const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

/**
 * Normalized metric row used for KPI aggregation.
 * Detail fact rows map `playersInSlice` / `activeInSlice` into these fields;
 * team-season rollup rows already match this shape.
 */
export type AlumniMetricTotals = {
    playersInSelection: number
    activePlayers: number
    alumni: number
    completed: number
    incomplete: number
}

/** Index of a season label in `ALUMNI_SEASON_OPTIONS` (−1 if unknown). */
export function seasonIndex(season: string) {
    return ALUMNI_SEASON_OPTIONS.findIndex((option) => option.value === season)
}

/**
 * Whether `season` lies inclusively between `seasonFrom` and `seasonTo`.
 * If `seasonFrom` is after `seasonTo`, the range is empty (no matches).
 * Unknown seasons / bounds are treated as in-range (no accidental filtering).
 */
export function inSeasonRange(season: string, seasonFrom: string, seasonTo: string) {
    const index = seasonIndex(season)
    const from = seasonIndex(seasonFrom)
    const to = seasonIndex(seasonTo)
    if (index < 0 || from < 0 || to < 0) return true
    if (from > to) return false
    return index >= from && index <= to
}

/**
 * Graduation rate as a percentage: completed / (completed + incomplete) × 100.
 * Returns 0 when there are no departures.
 */
export function rateFromDepartures(completed: number, incomplete: number) {
    const departures = completed + incomplete
    if (departures === 0) return 0
    return (completed / departures) * 100
}

/** Chart/table value formatter for graduation rate (includes ` %`). */
export function formatGraduationPercent(value: number) {
    return `${percentFormatter.format(value)} %`
}

/** Chart/table value formatter for player / alumni counts. */
export function formatPlayerCount(value: number) {
    return numberFormatter.format(value)
}

/** Sum metric fields across filtered rows (global aggregation). */
export function sumAlumniMetrics(
    rows: readonly AlumniMetricTotals[],
): AlumniMetricTotals {
    return rows.reduce(
        (totals, row) => ({
            playersInSelection: totals.playersInSelection + row.playersInSelection,
            activePlayers: totals.activePlayers + row.activePlayers,
            alumni: totals.alumni + row.alumni,
            completed: totals.completed + row.completed,
            incomplete: totals.incomplete + row.incomplete,
        }),
        {
            playersInSelection: 0,
            activePlayers: 0,
            alumni: 0,
            completed: 0,
            incomplete: 0,
        },
    )
}
