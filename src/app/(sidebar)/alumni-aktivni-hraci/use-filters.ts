'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    ALUMNI_DEGREE_VALUES,
    ALUMNI_FACULTY_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_VALUES,
    ALUMNI_TEAM_VALUES,
} from '@/lib/alumni/filters'

const facultyValues = ALUMNI_FACULTY_OPTIONS.map((option) => option.value) as [
    string,
    ...string[],
]
const fieldValues = ALUMNI_FIELD_OPTIONS.map((option) => option.value) as [
    string,
    ...string[],
]

export function useFilters() {
    const [seasonFrom, setSeasonFrom] = useQueryState(
        'seasonFrom',
        parseAsStringLiteral(ALUMNI_SEASON_VALUES).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonFrom,
        ),
    )
    const [seasonTo, setSeasonTo] = useQueryState(
        'seasonTo',
        parseAsStringLiteral(ALUMNI_SEASON_VALUES).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonTo,
        ),
    )
    const [teams, setTeams] = useQueryState(
        'team',
        parseAsArrayOf(parseAsStringLiteral(ALUMNI_TEAM_VALUES))
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
        parseAsArrayOf(parseAsStringLiteral(ALUMNI_DEGREE_VALUES))
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
