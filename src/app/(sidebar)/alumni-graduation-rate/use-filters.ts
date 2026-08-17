'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from '@/lib/alumni/filters'

const seasonValues: string[] = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues: string[] = ALUMNI_TEAM_OPTIONS.map((option) => option.value)

export function useFilters() {
    const [seasonFrom, setSeasonFrom] = useQueryState(
        'seasonFrom',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonFrom,
        ),
    )
    const [seasonTo, setSeasonTo] = useQueryState(
        'seasonTo',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonTo,
        ),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(teamValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )

    return {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
    }
}
