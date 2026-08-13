'use client'

import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { SelectFilter } from '@/components/custom/filters/select-filter'
import { ExportButton } from '@/components/custom/statistics/export-button'

import {
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    DEGREE_FILTER_OPTIONS,
    FACULTY_FILTER_OPTIONS,
    FIELD_FILTER_OPTIONS,
    SCHOOL_FILTER_OPTIONS,
} from '../data'
import { useFilterParam } from '../use-filter-param'

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const schoolValues = SCHOOL_FILTER_OPTIONS.map((option) => option.value)
const facultyValues = FACULTY_FILTER_OPTIONS.map((option) => option.value)
const fieldValues = FIELD_FILTER_OPTIONS.map((option) => option.value)
const degreeValues = DEGREE_FILTER_OPTIONS.map((option) => option.value)

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
    const [school, setSchool] = useFilterParam(
        'school',
        schoolValues,
        ALUMNI_FILTER_DEFAULTS.school,
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
        seasonFrom !== ALUMNI_FILTER_DEFAULTS.seasonFrom,
        seasonTo !== ALUMNI_FILTER_DEFAULTS.seasonTo,
        school !== ALUMNI_FILTER_DEFAULTS.school,
        faculty !== ALUMNI_FILTER_DEFAULTS.faculty,
        field !== ALUMNI_FILTER_DEFAULTS.field,
        degree !== ALUMNI_FILTER_DEFAULTS.degree,
    ].filter(Boolean).length

    return (
        <>
            <FiltersPopover activeCount={activeCount}>
                <SelectFilter
                    label="Sezóna od"
                    options={ALUMNI_SEASON_OPTIONS}
                    value={seasonFrom}
                    onChange={setSeasonFrom}
                />
                <SelectFilter
                    label="Sezóna do"
                    options={ALUMNI_SEASON_OPTIONS}
                    value={seasonTo}
                    onChange={setSeasonTo}
                />
                <SelectFilter
                    label="Škola"
                    options={SCHOOL_FILTER_OPTIONS}
                    value={school}
                    onChange={setSchool}
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
                filename="alumni-dashboard-alumni.pdf"
            />
        </>
    )
}
