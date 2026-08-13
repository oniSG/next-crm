'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FACULTY_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_SCHOOL_OPTIONS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_STATUS_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
} from './data'

export const ALL_FILTER_VALUE = 'all'

type Option = { label: string; value: string }

export function withAllOption<T extends Option>(
    options: readonly T[],
): Option[] {
    return [{ label: 'Vše', value: ALL_FILTER_VALUE }, ...options]
}

const seasonValues = [
    ...ALUMNI_SEASON_OPTIONS.map((option) => option.value),
] as string[]

const teamValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_TEAM_OPTIONS.map((option) => option.value),
] as string[]

const schoolValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_SCHOOL_OPTIONS.map((option) => option.value),
] as string[]

const facultyValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_FACULTY_OPTIONS.map((option) => option.value),
] as string[]

const fieldValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_FIELD_OPTIONS.map((option) => option.value),
] as string[]

const degreeValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_DEGREE_OPTIONS.map((option) => option.value),
] as string[]

const statusValues = [
    ALL_FILTER_VALUE,
    ...ALUMNI_STATUS_OPTIONS.map((option) => option.value),
] as string[]

export const ALUMNI_FILTER_DEFAULTS = {
    seasonFrom: '2015/2016',
    seasonTo: '2025/2026',
    team: ALL_FILTER_VALUE,
    school: ALL_FILTER_VALUE,
    faculty: ALL_FILTER_VALUE,
    field: ALL_FILTER_VALUE,
    degree: ALL_FILTER_VALUE,
    status: ALL_FILTER_VALUE,
} as const

function optionLabel(
    options: readonly Option[],
    value: string,
): string | null {
    if (value === ALL_FILTER_VALUE) return null
    return options.find((option) => option.value === value)?.label ?? null
}

export function getTeamLabel(value: string) {
    return optionLabel(ALUMNI_TEAM_OPTIONS, value)
}

export function getFieldLabel(value: string) {
    return optionLabel(ALUMNI_FIELD_OPTIONS, value)
}

export function getDegreeLabel(value: string) {
    return optionLabel(ALUMNI_DEGREE_OPTIONS, value)
}

const SCHOOL_ALIASES: Record<string, string[]> = {
    uk: ['Univerzita Karlova'],
    muni: ['Masarykova univerzita'],
    zcu: ['Západočeská univerzita'],
    cvut: ['České vysoké učení technické', 'ČVUT'],
    vse: ['Vysoká škola ekonomická'],
    upol: ['Univerzita Palackého'],
}

export function getSchoolNames(value: string): string[] | null {
    if (value === ALL_FILTER_VALUE) return null
    return SCHOOL_ALIASES[value] ?? null
}

export function getFacultyName(value: string): string | null {
    if (value === ALL_FILTER_VALUE) return null
    const label = optionLabel(ALUMNI_FACULTY_OPTIONS, value)
    if (!label) return null
    const parts = label.split(' | ')
    return parts[parts.length - 1] ?? label
}

function seasonIndex(season: string) {
    return ALUMNI_SEASON_OPTIONS.findIndex((option) => option.value === season)
}

export function isSeasonInRange(
    seasonLabel: string,
    seasonFrom: string,
    seasonTo: string,
) {
    const index = seasonIndex(seasonLabel)
    if (index < 0) return true
    const from = seasonIndex(seasonFrom)
    const to = seasonIndex(seasonTo)
    if (from < 0 || to < 0) return true
    const min = Math.min(from, to)
    const max = Math.max(from, to)
    return index >= min && index <= max
}

export function filterBySeasonRange<T extends { label: string }>(
    data: T[],
    seasonFrom: string,
    seasonTo: string,
) {
    return data.filter((row) =>
        isSeasonInRange(row.label, seasonFrom, seasonTo),
    )
}

export function matchesTeam(teamName: string, teamValue: string) {
    const label = getTeamLabel(teamValue)
    if (!label) return true
    return teamName === label
}

export function matchesSchool(schoolName: string, schoolValue: string) {
    const names = getSchoolNames(schoolValue)
    if (!names) return true
    return names.some(
        (name) =>
            schoolName === name ||
            schoolName.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(schoolName.toLowerCase()),
    )
}

export function matchesFaculty(facultyName: string, facultyValue: string) {
    const name = getFacultyName(facultyValue)
    if (!name) return true
    if (facultyName === '-' || facultyName.trim() === '') return false
    return (
        facultyName === name ||
        facultyName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(facultyName.toLowerCase())
    )
}

export function matchesField(fieldName: string, fieldValue: string) {
    const label = getFieldLabel(fieldValue)
    if (!label) return true
    return fieldName === label
}

export function matchesDegree(degreeName: string, degreeValue: string) {
    const label = getDegreeLabel(degreeValue)
    if (!label) return true
    return degreeName === label
}

export function filterByTeamLabel<T extends { label: string }>(
    data: T[],
    teamValue: string,
) {
    return data.filter((row) => matchesTeam(row.label, teamValue))
}

export function filterByTeamField<T extends { team: string }>(
    data: T[],
    teamValue: string,
) {
    return data.filter((row) => matchesTeam(row.team, teamValue))
}

export function filterByFieldLabel<T extends { label: string }>(
    data: T[],
    fieldValue: string,
) {
    return data.filter((row) => matchesField(row.label, fieldValue))
}

export function filterBySchoolLabel<T extends { label: string }>(
    data: T[],
    schoolValue: string,
) {
    return data.filter((row) => matchesSchool(row.label, schoolValue))
}

export function useAlumniSeasonFrom() {
    return useQueryState(
        'seasonFrom',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonFrom,
        ),
    )
}

export function useAlumniSeasonTo() {
    return useQueryState(
        'seasonTo',
        parseAsStringLiteral(seasonValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.seasonTo,
        ),
    )
}

export function useAlumniTeamFilter() {
    return useQueryState(
        'team',
        parseAsStringLiteral(teamValues).withDefault(ALUMNI_FILTER_DEFAULTS.team),
    )
}

export function useAlumniSchoolFilter() {
    return useQueryState(
        'school',
        parseAsStringLiteral(schoolValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.school,
        ),
    )
}

export function useAlumniFacultyFilter() {
    return useQueryState(
        'faculty',
        parseAsStringLiteral(facultyValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.faculty,
        ),
    )
}

export function useAlumniFieldFilter() {
    return useQueryState(
        'field',
        parseAsStringLiteral(fieldValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.field,
        ),
    )
}

export function useAlumniDegreeFilter() {
    return useQueryState(
        'degree',
        parseAsStringLiteral(degreeValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.degree,
        ),
    )
}

export function useAlumniStatusFilter() {
    return useQueryState(
        'status',
        parseAsStringLiteral(statusValues).withDefault(
            ALUMNI_FILTER_DEFAULTS.status,
        ),
    )
}

export const TEAM_FILTER_OPTIONS = withAllOption(ALUMNI_TEAM_OPTIONS)
export const SCHOOL_FILTER_OPTIONS = withAllOption(ALUMNI_SCHOOL_OPTIONS)
export const FACULTY_FILTER_OPTIONS = withAllOption(ALUMNI_FACULTY_OPTIONS)
export const FIELD_FILTER_OPTIONS = withAllOption(ALUMNI_FIELD_OPTIONS)
export const DEGREE_FILTER_OPTIONS = withAllOption(ALUMNI_DEGREE_OPTIONS)
export const STATUS_FILTER_OPTIONS = withAllOption(ALUMNI_STATUS_OPTIONS)
