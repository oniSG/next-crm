export const ALL_FILTER_VALUE = 'all'

type FilterOption = { label: string; value: string }

function withAll(options: readonly FilterOption[]): FilterOption[] {
    return [{ label: 'Vše', value: ALL_FILTER_VALUE }, ...options]
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

export const ALUMNI_SCHOOL_OPTIONS = [
    { label: 'Univerzita Karlova', value: 'uk' },
    { label: 'Masarykova univerzita', value: 'muni' },
    { label: 'Západočeská univerzita', value: 'zcu' },
    { label: 'České vysoké učení technické', value: 'cvut' },
    { label: 'Vysoká škola ekonomická', value: 'vse' },
    { label: 'Univerzita Palackého', value: 'upol' },
] as const

export const ALUMNI_FACULTY_OPTIONS = [
    { label: 'UK | Právnická fakulta', value: 'uk-prf' },
    { label: 'UK | Fakulta tělesné výchovy a sportu', value: 'uk-ftvs' },
    { label: 'UK | Filozofická fakulta', value: 'uk-ff' },
    { label: 'MUNI | Fakulta sportovních studií', value: 'muni-fss' },
    { label: 'MUNI | Ekonomicko-správní fakulta', value: 'muni-esf' },
    { label: 'ZČU | Fakulta aplikovaných věd', value: 'zcu-fav' },
] as const

export const ALUMNI_FIELD_OPTIONS = [
    { label: 'Strojírenství, materiály a výroba', value: 'strojirenstvi' },
    { label: 'Management sportu', value: 'management-sportu' },
    { label: 'Tělesná výchova a sport', value: 'tvs' },
    { label: 'Ekonomika a management', value: 'ekonomika' },
    { label: 'Právo', value: 'pravo' },
    { label: 'Informatika', value: 'informatika' },
    { label: 'Fyzioterapie', value: 'fyzioterapie' },
] as const

export const ALUMNI_DEGREE_OPTIONS = [
    { label: 'Bakalářské', value: 'bakalarske' },
    { label: 'Magisterské', value: 'magisterske' },
    { label: 'Doktorské', value: 'doktorske' },
] as const

export const TEAM_FILTER_OPTIONS = withAll(ALUMNI_TEAM_OPTIONS)
export const SCHOOL_FILTER_OPTIONS = withAll(ALUMNI_SCHOOL_OPTIONS)
export const FACULTY_FILTER_OPTIONS = withAll(ALUMNI_FACULTY_OPTIONS)
export const FIELD_FILTER_OPTIONS = withAll(ALUMNI_FIELD_OPTIONS)
export const DEGREE_FILTER_OPTIONS = withAll(ALUMNI_DEGREE_OPTIONS)

export const ALUMNI_FILTER_DEFAULTS = {
    seasonFrom: '2015/2016',
    seasonTo: '2025/2026',
    team: ALL_FILTER_VALUE,
    school: ALL_FILTER_VALUE,
    faculty: ALL_FILTER_VALUE,
    field: ALL_FILTER_VALUE,
    degree: ALL_FILTER_VALUE,
} as const

export function isAllFilter(value: string) {
    return value === ALL_FILTER_VALUE
}

function optionLabel(
    options: readonly FilterOption[],
    value: string,
): string | null {
    if (isAllFilter(value)) return null
    return options.find((option) => option.value === value)?.label ?? null
}

const SCHOOL_ALIASES: Record<string, string[]> = {
    uk: ['Univerzita Karlova'],
    muni: ['Masarykova univerzita'],
    zcu: ['Západočeská univerzita'],
    cvut: ['České vysoké učení technické', 'ČVUT'],
    vse: ['Vysoká škola ekonomická'],
    upol: ['Univerzita Palackého'],
}

function seasonIndex(season: string) {
    return ALUMNI_SEASON_OPTIONS.findIndex((option) => option.value === season)
}

export function filterBySeasonRange<T extends { label: string }>(
    data: T[],
    seasonFrom: string,
    seasonTo: string,
) {
    const from = seasonIndex(seasonFrom)
    const to = seasonIndex(seasonTo)
    if (from < 0 || to < 0) return data
    const min = Math.min(from, to)
    const max = Math.max(from, to)
    return data.filter((row) => {
        const index = seasonIndex(row.label)
        return index < 0 || (index >= min && index <= max)
    })
}

export function filterByOptionLabel<T>(
    data: T[],
    getText: (row: T) => string,
    filterValue: string,
    options: readonly FilterOption[],
) {
    const label = optionLabel(options, filterValue)
    if (!label) return data
    return data.filter((row) => getText(row) === label)
}

export function matchesSchool(schoolName: string, schoolValue: string) {
    if (isAllFilter(schoolValue)) return true
    const names = SCHOOL_ALIASES[schoolValue]
    if (!names) return true
    return names.some(
        (name) =>
            schoolName === name ||
            schoolName.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(schoolName.toLowerCase()),
    )
}

export function matchesFaculty(facultyName: string, facultyValue: string) {
    const label = optionLabel(ALUMNI_FACULTY_OPTIONS, facultyValue)
    if (!label) return true
    if (facultyName === '-' || facultyName.trim() === '') return false
    const name = label.split(' | ').at(-1) ?? label
    return (
        facultyName === name ||
        facultyName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(facultyName.toLowerCase())
    )
}

export function matchesDegree(degreeName: string, degreeValue: string) {
    const label = optionLabel(ALUMNI_DEGREE_OPTIONS, degreeValue)
    if (!label) return true
    return degreeName === label
}

export function matchesTeam(teamName: string, teamValue: string) {
    const label = optionLabel(ALUMNI_TEAM_OPTIONS, teamValue)
    if (!label) return true
    return teamName === label
}
