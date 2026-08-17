import hierarchyData from './hierarchy.json'

export type AlumniHierarchyField = {
    value: string
    label: string
}

export type AlumniHierarchyFaculty = {
    label: string
    fields: AlumniHierarchyField[]
}

export type AlumniHierarchySchool = {
    label: string
    faculties: Record<string, AlumniHierarchyFaculty>
}

export type AlumniHierarchy = {
    schools: Record<string, AlumniHierarchySchool>
}

export const ALUMNI_HIERARCHY = hierarchyData as AlumniHierarchy

function buildSchoolOptions() {
    return Object.entries(ALUMNI_HIERARCHY.schools).map(([value, school]) => ({
        label: school.label,
        value,
    }))
}

function buildFacultyOptions() {
    return Object.values(ALUMNI_HIERARCHY.schools).flatMap((school) =>
        Object.entries(school.faculties).map(([value, faculty]) => ({
            label: faculty.label,
            value,
        })),
    )
}

function buildFieldOptions() {
    const byValue = new Map<string, string>()
    for (const school of Object.values(ALUMNI_HIERARCHY.schools)) {
        for (const faculty of Object.values(school.faculties)) {
            for (const field of faculty.fields) {
                if (!byValue.has(field.value)) {
                    byValue.set(field.value, field.label)
                }
            }
        }
    }
    return [...byValue.entries()].map(([value, label]) => ({ label, value }))
}

export const ALUMNI_SEASON_OPTIONS = [
    { label: '2015/2016', value: '2015/2016' },
    { label: '2016/2017', value: '2016/2017' },
    { label: '2017/2018', value: '2017/2018' },
    { label: '2018/2019', value: '2018/2019' },
    { label: '2019/2020', value: '2019/2020' },
    { label: '2020/2021', value: '2020/2021' },
    { label: '2021/2022', value: '2021/2022' },
    { label: '2022/2023', value: '2022/2023' },
    { label: '2023/2024', value: '2023/2024' },
    { label: '2024/2025', value: '2024/2025' },
    { label: '2025/2026', value: '2025/2026' },
] as const

export const ALUMNI_TEAM_OPTIONS = [
    { label: 'Black Dogs Budweis', value: 'black-dogs-budweis' },
    { label: 'HC Sparta Praha', value: 'sparta' },
    { label: 'HC Kometa Brno', value: 'kometa' },
    { label: 'HC Dynamo Pardubice', value: 'dynamo' },
    { label: 'Mountfield HK', value: 'mountfield' },
    { label: 'HC Oceláři Třinec', value: 'trinec' },
] as const

export const ALUMNI_SCHOOL_OPTIONS = buildSchoolOptions()

export const ALUMNI_FACULTY_OPTIONS = buildFacultyOptions()

export const ALUMNI_FIELD_OPTIONS = buildFieldOptions()

export const ALUMNI_DEGREE_OPTIONS = [
    { label: 'Bakalářské', value: 'bakalarske' },
    { label: 'Magisterské', value: 'magisterske' },
    { label: 'Doktorské', value: 'doktorske' },
] as const

const ALUMNI_DEGREE_ORDER = new Map<string, number>(
    ALUMNI_DEGREE_OPTIONS.map((option, index) => [option.value, index]),
)

export function sortByAlumniDegree<T>(
    items: readonly T[],
    getDegree: (item: T) => string,
): T[] {
    return [...items].sort(
        (a, b) =>
            (ALUMNI_DEGREE_ORDER.get(getDegree(a)) ?? Number.MAX_SAFE_INTEGER) -
            (ALUMNI_DEGREE_ORDER.get(getDegree(b)) ?? Number.MAX_SAFE_INTEGER),
    )
}

export const ALUMNI_FILTER_DEFAULTS = {
    seasonFrom: '2015/2016',
    seasonTo: '2025/2026',
} as const

export function schoolLabel(value: string) {
    return ALUMNI_SCHOOL_OPTIONS.find((option) => option.value === value)?.label ?? value
}

export function fieldLabel(value: string) {
    return ALUMNI_FIELD_OPTIONS.find((option) => option.value === value)?.label ?? value
}

export function facultyLabel(value: string) {
    if (!value) return '-'
    const label =
        ALUMNI_FACULTY_OPTIONS.find((option) => option.value === value)?.label ?? value
    return label.split(' | ').at(-1) ?? label
}

export function hockeyTeamLabel(value: string) {
    return ALUMNI_TEAM_OPTIONS.find((option) => option.value === value)?.label ?? value
}

export function degreeLabel(value: string) {
    return ALUMNI_DEGREE_OPTIONS.find((option) => option.value === value)?.label ?? value
}
