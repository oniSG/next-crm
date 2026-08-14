'use client'

import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from '@/lib/alumni/filters'
import { useAlumniFilters } from '@/lib/alumni/use-alumni-filters'

export function PageActions() {
    const {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
        fields,
        setFields,
        degrees,
        setDegrees,
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
                className="w-48"
            />
            <MultiSelectFilter
                options={ALUMNI_FIELD_OPTIONS}
                value={fields}
                onChange={(next) => {
                    void setFields(next)
                }}
                leadingLabel="Obor"
                placeholder="Vše"
                className="w-52"
            />
            <MultiSelectFilter
                options={ALUMNI_DEGREE_OPTIONS}
                value={degrees}
                onChange={(next) => {
                    void setDegrees(next)
                }}
                leadingLabel="Stupeň"
                placeholder="Vše"
                searchable={false}
                className="w-44"
            />
            <ExportButton
                dashboard="alumni-aktivni-hraci"
                filename="alumni-aktivni-hraci.pdf"
            />
        </>
    )
}
