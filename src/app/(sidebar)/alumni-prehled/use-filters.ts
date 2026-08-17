'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_VALUES,
    ALUMNI_TEAM_VALUES,
} from '@/lib/alumni/filters'
import { setLiteralParam, setLiteralParams } from '@/lib/query-state'

export function useFilters() {
    const [seasonFrom, setSeasonFrom] = useQueryState(
        'seasonFrom',
        parseAsStringLiteral(ALUMNI_SEASON_VALUES).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonFrom,
        ),
    )
    const [seasonTo, setSeasonTo] = useQueryState(
        'seasonTo',
        parseAsStringLiteral(ALUMNI_SEASON_VALUES).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonTo,
        ),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(ALUMNI_TEAM_VALUES))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )

    return {
        seasonFrom,
        setSeasonFrom: setLiteralParam(setSeasonFrom),
        seasonTo,
        setSeasonTo: setLiteralParam(setSeasonTo),
        teams,
        setTeams: setLiteralParams(setTeams),
    }
}
