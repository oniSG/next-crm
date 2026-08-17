import {
    ALUMNI_FACULTY_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_SCHOOL_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from './filters'

import alumniBySeasonDetail from './data/alumni-by-season-detail.json'

type AlumniDetailRow = {
    team: string
    school: string
    faculty: string
    field: string
}

const rows = alumniBySeasonDetail as AlumniDetailRow[]

function matchingRows(
    teams: readonly string[],
    schools: readonly string[],
    faculties: readonly string[] = [],
) {
    return rows.filter((row) => {
        if (teams.length > 0 && !teams.includes(row.team)) return false
        if (schools.length > 0 && !schools.includes(row.school)) return false
        if (faculties.length > 0 && !faculties.includes(row.faculty)) return false
        return true
    })
}

function valuesFromRows<T extends keyof AlumniDetailRow>(
    matched: AlumniDetailRow[],
    key: T,
) {
    return new Set(matched.map((row) => row[key]))
}

export function getAlumniTeamOptionsForSchools(schools: readonly string[]) {
    if (schools.length === 0) return ALUMNI_TEAM_OPTIONS

    const allowed = valuesFromRows(matchingRows([], schools), 'team')
    return ALUMNI_TEAM_OPTIONS.filter((option) => allowed.has(option.value))
}

export function getAlumniSchoolOptionsForTeams(teams: readonly string[]) {
    if (teams.length === 0) return ALUMNI_SCHOOL_OPTIONS

    const allowed = valuesFromRows(matchingRows(teams, []), 'school')
    return ALUMNI_SCHOOL_OPTIONS.filter((option) => allowed.has(option.value))
}

export function getAlumniFacultyOptionsForSelection(
    teams: readonly string[],
    schools: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows(teams, schools), 'faculty')
    if (allowed.size === 0) return ALUMNI_FACULTY_OPTIONS
    return ALUMNI_FACULTY_OPTIONS.filter((option) => allowed.has(option.value))
}

export function getAlumniFieldOptionsForSelection(
    teams: readonly string[],
    schools: readonly string[],
    faculties: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows(teams, schools, faculties), 'field')
    if (allowed.size === 0) return ALUMNI_FIELD_OPTIONS
    return ALUMNI_FIELD_OPTIONS.filter((option) => allowed.has(option.value))
}

export function pruneAlumniTeamSelection(
    teams: readonly string[],
    schools: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows([], schools), 'team')
    if (schools.length === 0) return [...teams]
    return teams.filter((team) => allowed.has(team))
}

export function pruneAlumniSchoolSelection(
    schools: readonly string[],
    teams: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows(teams, []), 'school')
    if (teams.length === 0) return [...schools]
    return schools.filter((school) => allowed.has(school))
}

export function pruneAlumniFacultySelection(
    faculties: readonly string[],
    teams: readonly string[],
    schools: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows(teams, schools), 'faculty')
    return faculties.filter((faculty) => allowed.has(faculty))
}

export function pruneAlumniFieldSelection(
    fields: readonly string[],
    teams: readonly string[],
    schools: readonly string[],
    faculties: readonly string[],
) {
    const allowed = valuesFromRows(matchingRows(teams, schools, faculties), 'field')
    return fields.filter((field) => allowed.has(field))
}
