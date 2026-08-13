'use client'

import { MultiSelectFilter } from '@/components/custom/filters/multi-select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from '@/lib/alumni/filters'
import { useMultiFilterParam } from '@/lib/alumni/use-filter-param'

const teamValues = ALUMNI_TEAM_OPTIONS.map((option) => option.value)
const fieldValues = ALUMNI_FIELD_OPTIONS.map((option) => option.value)
const degreeValues = ALUMNI_DEGREE_OPTIONS.map((option) => option.value)

export function PageActions() {
    const [teams, setTeams] = useMultiFilterParam('team', teamValues)
    const [fields, setFields] = useMultiFilterParam('field', fieldValues)
    const [degrees, setDegrees] = useMultiFilterParam('degree', degreeValues)

    return (
        <>
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
                className="w-44"
            />
            <ExportButton
                dashboard="alumni-aktivni-hraci"
                filename="alumni-aktivni-hraci.pdf"
            />
        </>
    )
}
