'use client'

import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    TEAM_FILTER_OPTIONS,
} from '../data'
import { useFilterParam } from '../use-filter-param'

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues = TEAM_FILTER_OPTIONS.map((option) => option.value)

export function PageActions() {
    const [seasonFrom, setSeasonFrom] = useFilterParam(
        'seasonFrom',
        seasonValues,
        ALUMNI_FILTER_DEFAULTS.seasonFrom,
    )
    const [seasonTo, setSeasonTo] = useFilterParam(
        'seasonTo',
        seasonValues,
        ALUMNI_FILTER_DEFAULTS.seasonTo,
    )
    const [team, setTeam] = useFilterParam(
        'team',
        teamValues,
        ALUMNI_FILTER_DEFAULTS.team,
    )

    return (
        <>
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonFrom}
                onChange={setSeasonFrom}
                placeholder="Sezóna od"
                className="w-36"
            />
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonTo}
                onChange={setSeasonTo}
                placeholder="Sezóna do"
                className="w-36"
            />
            <SelectFilter
                options={TEAM_FILTER_OPTIONS}
                value={team}
                onChange={setTeam}
                placeholder="Tým"
                className="w-44"
            />
            <ExportButton
                dashboard="alumni-dashboard"
                filename="alumni-dashboard-graduation-rate.pdf"
            />
        </>
    )
}
