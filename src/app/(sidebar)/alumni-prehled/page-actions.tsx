'use client'

import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { ALUMNI_SEASON_OPTIONS, ALUMNI_TEAM_OPTIONS } from '@/lib/alumni/filters'
import { useAlumniFilters } from '@/lib/alumni/use-alumni-filters'

export function PageActions() {
    const {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
    } = useAlumniFilters()

    return (
        <>
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonFrom}
                onChange={setSeasonFrom}
                leadingLabel="Sezóna od"
            />
            <SelectFilter
                options={ALUMNI_SEASON_OPTIONS}
                value={seasonTo}
                onChange={setSeasonTo}
                leadingLabel="Sezóna do"
            />
            <MultiSelectFilter
                options={ALUMNI_TEAM_OPTIONS}
                value={teams}
                onChange={(next) => {
                    void setTeams(next)
                }}
                leadingLabel="Tým"
                placeholder="Vše"
                className="w-52"
            />
            <ExportButton
                dashboard="alumni-prehled"
                filename="alumni-prehled.pdf"
            />
        </>
    )
}
