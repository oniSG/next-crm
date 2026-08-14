'use client'

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FACULTY_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SCHOOL_OPTIONS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from './filters'
import { useFilterParam, useMultiFilterParam } from './use-filter-param'

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues = ALUMNI_TEAM_OPTIONS.map((option) => option.value)
const schoolValues = ALUMNI_SCHOOL_OPTIONS.map((option) => option.value)
const facultyValues = ALUMNI_FACULTY_OPTIONS.map((option) => option.value)
const fieldValues = ALUMNI_FIELD_OPTIONS.map((option) => option.value)
const degreeValues = ALUMNI_DEGREE_OPTIONS.map((option) => option.value)

/** Shared alumni URL filters — empty multi-select means “all”. */
export function useAlumniFilters() {
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
    const [teams, setTeams] = useMultiFilterParam('team', teamValues)
    const [schools, setSchools] = useMultiFilterParam('school', schoolValues)
    const [faculties, setFaculties] = useMultiFilterParam('faculty', facultyValues)
    const [fields, setFields] = useMultiFilterParam('field', fieldValues)
    const [degrees, setDegrees] = useMultiFilterParam('degree', degreeValues)

    return {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
        schools,
        setSchools,
        faculties,
        setFaculties,
        fields,
        setFields,
        degrees,
        setDegrees,
    }
}
