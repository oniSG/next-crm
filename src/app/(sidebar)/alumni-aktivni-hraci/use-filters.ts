'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FACULTY_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from '@/lib/alumni/filters'

const seasonValues: string[] = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues: string[] = ALUMNI_TEAM_OPTIONS.map((option) => option.value)
const facultyValues: string[] = ALUMNI_FACULTY_OPTIONS.map((option) => option.value)
const fieldValues: string[] = ALUMNI_FIELD_OPTIONS.map((option) => option.value)
const degreeValues: string[] = ALUMNI_DEGREE_OPTIONS.map((option) => option.value)

export function useFilters() {
    const [seasonFrom, setSeasonFrom] = useQueryState(
        'seasonFrom',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonFrom,
        ),
    )
    const [seasonTo, setSeasonTo] = useQueryState(
        'seasonTo',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonTo,
        ),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(teamValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [faculties, setFaculties] = useQueryState(
        'faculty',
        parseAsArrayOf(parseAsStringLiteral(facultyValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [fields, setFields] = useQueryState(
        'field',
        parseAsArrayOf(parseAsStringLiteral(fieldValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )
    const [degrees, setDegrees] = useQueryState(
        'degree',
        parseAsArrayOf(parseAsStringLiteral(degreeValues))
            .withDefault([])
            .withOptions({ clearOnDefault: true }),
    )

    return {
        seasonFrom,
        setSeasonFrom,
        seasonTo,
        setSeasonTo,
        teams,
        setTeams,
        faculties,
        setFaculties,
        fields,
        setFields,
        degrees,
        setDegrees,
    }
}
