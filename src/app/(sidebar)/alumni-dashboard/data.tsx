import type { NavTabItem } from '@/components/custom/layout/nav-tabs'

export const ALUMNI_DASHBOARD_TABS: NavTabItem[] = [
    { label: 'Přehled', href: '/alumni-dashboard/prehled' },
    { label: 'Graduation rate', href: '/alumni-dashboard/graduation-rate' },
    { label: 'Alumni', href: '/alumni-dashboard/alumni' },
    { label: 'Aktivní hráči', href: '/alumni-dashboard/aktivni-hraci' },
]

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

export const ALUMNI_STATUS_OPTIONS = [
    { label: 'Dokončil', value: 'dokoncil' },
    { label: 'Nedokončil', value: 'nedokoncil' },
    { label: 'Studuje', value: 'studuje' },
] as const
