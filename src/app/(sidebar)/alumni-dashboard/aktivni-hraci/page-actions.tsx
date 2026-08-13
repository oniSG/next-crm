'use client'

import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_FILTER_DEFAULTS,
    DEGREE_FILTER_OPTIONS,
    FACULTY_FILTER_OPTIONS,
    FIELD_FILTER_OPTIONS,
    TEAM_FILTER_OPTIONS,
} from '../data'
import { useFilterParam } from '../use-filter-param'

const teamValues = TEAM_FILTER_OPTIONS.map((option) => option.value)
const facultyValues = FACULTY_FILTER_OPTIONS.map((option) => option.value)
const fieldValues = FIELD_FILTER_OPTIONS.map((option) => option.value)
const degreeValues = DEGREE_FILTER_OPTIONS.map((option) => option.value)

export function PageActions() {
    const [team, setTeam] = useFilterParam(
        'team',
        teamValues,
        ALUMNI_FILTER_DEFAULTS.team,
    )
    const [faculty, setFaculty] = useFilterParam(
        'faculty',
        facultyValues,
        ALUMNI_FILTER_DEFAULTS.faculty,
    )
    const [field, setField] = useFilterParam(
        'field',
        fieldValues,
        ALUMNI_FILTER_DEFAULTS.field,
    )
    const [degree, setDegree] = useFilterParam(
        'degree',
        degreeValues,
        ALUMNI_FILTER_DEFAULTS.degree,
    )

    const activeCount = [
        team !== ALUMNI_FILTER_DEFAULTS.team,
        faculty !== ALUMNI_FILTER_DEFAULTS.faculty,
        field !== ALUMNI_FILTER_DEFAULTS.field,
        degree !== ALUMNI_FILTER_DEFAULTS.degree,
    ].filter(Boolean).length

    return (
        <>
            <FiltersPopover activeCount={activeCount}>
                <SelectFilter
                    label="Tým"
                    options={TEAM_FILTER_OPTIONS}
                    value={team}
                    onChange={setTeam}
                />
                <SelectFilter
                    label="Fakulta"
                    options={FACULTY_FILTER_OPTIONS}
                    value={faculty}
                    onChange={setFaculty}
                />
                <SelectFilter
                    label="Obor"
                    options={FIELD_FILTER_OPTIONS}
                    value={field}
                    onChange={setField}
                />
                <SelectFilter
                    label="Stupeň"
                    options={DEGREE_FILTER_OPTIONS}
                    value={degree}
                    onChange={setDegree}
                />
            </FiltersPopover>
            <ExportButton
                dashboard="alumni-dashboard"
                filename="alumni-dashboard-aktivni-hraci.pdf"
            />
        </>
    )
}
