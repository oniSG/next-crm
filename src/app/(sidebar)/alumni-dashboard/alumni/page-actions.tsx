'use client'

import { FiltersPopover } from '@/components/custom/filters/filters-popover'
import { ExportButton } from '@/components/custom/statistics/export-button'

import { AlumniFilterSelect } from '../alumni-filter-select'
import {
    ALUMNI_FILTER_DEFAULTS,
    DEGREE_FILTER_OPTIONS,
    FACULTY_FILTER_OPTIONS,
    FIELD_FILTER_OPTIONS,
    SCHOOL_FILTER_OPTIONS,
    useAlumniDegreeFilter,
    useAlumniFacultyFilter,
    useAlumniFieldFilter,
    useAlumniSchoolFilter,
    useAlumniSeasonFrom,
    useAlumniSeasonTo,
} from '../alumni-filters'
import { ALUMNI_SEASON_OPTIONS } from '../data'

export function PageActions() {
    const [seasonFrom, setSeasonFrom] = useAlumniSeasonFrom()
    const [seasonTo, setSeasonTo] = useAlumniSeasonTo()
    const [school, setSchool] = useAlumniSchoolFilter()
    const [faculty, setFaculty] = useAlumniFacultyFilter()
    const [field, setField] = useAlumniFieldFilter()
    const [degree, setDegree] = useAlumniDegreeFilter()

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
                <AlumniFilterSelect
                    label="Sezóna od"
                    options={ALUMNI_SEASON_OPTIONS}
                    value={seasonFrom}
                    onChange={(value) => void setSeasonFrom(value as typeof seasonFrom)}
                    placeholder="Sezóna od"
                />
                <AlumniFilterSelect
                    label="Sezóna do"
                    options={ALUMNI_SEASON_OPTIONS}
                    value={seasonTo}
                    onChange={(value) => void setSeasonTo(value as typeof seasonTo)}
                    placeholder="Sezóna do"
                />
                <AlumniFilterSelect
                    label="Škola"
                    options={SCHOOL_FILTER_OPTIONS}
                    value={school}
                    onChange={(value) => void setSchool(value as typeof school)}
                    placeholder="Škola"
                />
                <AlumniFilterSelect
                    label="Fakulta"
                    options={FACULTY_FILTER_OPTIONS}
                    value={faculty}
                    onChange={(value) => void setFaculty(value as typeof faculty)}
                    placeholder="Fakulta"
                />
                <AlumniFilterSelect
                    label="Obor"
                    options={FIELD_FILTER_OPTIONS}
                    value={field}
                    onChange={(value) => void setField(value as typeof field)}
                    placeholder="Obor"
                />
                <AlumniFilterSelect
                    label="Stupeň"
                    options={DEGREE_FILTER_OPTIONS}
                    value={degree}
                    onChange={(value) => void setDegree(value as typeof degree)}
                    placeholder="Stupeň"
                />
            </FiltersPopover>
            <ExportButton
                dashboard="alumni-dashboard"
                filename="alumni-dashboard-alumni.pdf"
            />
        </>
    )
}
