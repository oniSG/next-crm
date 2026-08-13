'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

import { AlumniFilterSelect } from '../alumni-filter-select'
import {
    TEAM_FILTER_OPTIONS,
    useAlumniSeasonFrom,
    useAlumniSeasonTo,
    useAlumniTeamFilter,
} from '../alumni-filters'
import { ALUMNI_SEASON_OPTIONS } from '../data'

export function PageActions() {
    const [seasonFrom, setSeasonFrom] = useAlumniSeasonFrom()
    const [seasonTo, setSeasonTo] = useAlumniSeasonTo()
    const [team, setTeam] = useAlumniTeamFilter()

    return (
        <>
            <AlumniFilterSelect
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonFrom}
                onChange={(value) => void setSeasonFrom(value as typeof seasonFrom)}
                placeholder="Sezóna od"
                className="w-36 min-w-0 overflow-hidden"
            />
            <AlumniFilterSelect
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonTo}
                onChange={(value) => void setSeasonTo(value as typeof seasonTo)}
                placeholder="Sezóna do"
                className="w-36 min-w-0 overflow-hidden"
            />
            <AlumniFilterSelect
                options={TEAM_FILTER_OPTIONS}
                value={team}
                onChange={(value) => void setTeam(value as typeof team)}
                placeholder="Tým"
                className="w-44 min-w-0 overflow-hidden"
            />
            <ExportButton
                dashboard="alumni-dashboard"
                filename="alumni-dashboard-prehled.pdf"
            />
        </>
    )
}
