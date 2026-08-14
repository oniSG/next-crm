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
    { label: 'UK | Matematicko-fyzikální fakulta', value: 'uk-mff' },
    { label: 'UK | Fakulta sociálních věd', value: 'uk-fsv' },
    { label: 'MUNI | Fakulta sportovních studií', value: 'muni-fss' },
    { label: 'MUNI | Ekonomicko-správní fakulta', value: 'muni-esf' },
    { label: 'MUNI | Fakulta informatiky', value: 'muni-fi' },
    { label: 'MUNI | Lékařská fakulta', value: 'muni-med' },
    { label: 'MUNI | Právnická fakulta', value: 'muni-prf' },
    { label: 'ZČU | Fakulta aplikovaných věd', value: 'zcu-fav' },
    { label: 'ZČU | Fakulta pedagogická', value: 'zcu-fpe' },
    { label: 'ZČU | Strojní fakulta', value: 'zcu-zf' },
    { label: 'ZČU | Fakulta designu a umění', value: 'zcu-ffd' },
    { label: 'ČVUT | Fakulta elektrotechnická', value: 'cvut-fel' },
    { label: 'ČVUT | Fakulta jaderná a fyzikálně inženýrská', value: 'cvut-fjfi' },
    { label: 'ČVUT | Fakulta strojní', value: 'cvut-fs' },
    { label: 'ČVUT | Fakulta architektury', value: 'cvut-fak' },
    { label: 'ČVUT | Fakulta biomedicínského inženýrství', value: 'cvut-fbmi' },
    { label: 'VŠE | Fakulta informatiky a statistiky', value: 'vse-fis' },
    { label: 'VŠE | Fakulta financí a účetnictví', value: 'vse-fph' },
    { label: 'VŠE | Národohospodářská fakulta', value: 'vse-nhf' },
    { label: 'UPOL | Filozofická fakulta', value: 'upol-ff' },
    { label: 'UPOL | Právnická fakulta', value: 'upol-prf' },
    { label: 'UPOL | Pedagogická fakulta', value: 'upol-mef' },
    { label: 'UPOL | Fakulta tělesné kultury', value: 'upol-ftk' },
] as const

export const ALUMNI_FIELD_OPTIONS = [
    { label: 'Právo', value: 'pravo' },
    { label: 'Mezinárodní právo', value: 'mezinarodni-pravo' },
    { label: 'Obchodní právo', value: 'obchodni-pravo' },
    { label: 'Trestní právo', value: 'trestni-pravo' },
    { label: 'Správní právo', value: 'spravni-pravo' },
    { label: 'Ústavní právo', value: 'ustavni-pravo' },
    { label: 'Evropské právo', value: 'evropske-pravo' },
    { label: 'Tělesná výchova a sport', value: 'tvs' },
    { label: 'Management sportu', value: 'management-sportu' },
    { label: 'Fyzioterapie', value: 'fyzioterapie' },
    { label: 'Sportovní trénink', value: 'sportovni-trenink' },
    { label: 'Outdoor edukace', value: 'outdoor-edukace' },
    { label: 'Sportovní management', value: 'sportovni-management' },
    { label: 'Tělovýchova', value: 'telocvik' },
    { label: 'Filozofie', value: 'filozofie' },
    { label: 'Psychologie', value: 'psychologie' },
    { label: 'Sociologie', value: 'sociologie' },
    { label: 'Historie', value: 'historie' },
    { label: 'Politologie', value: 'politologie' },
    { label: 'Andragogika', value: 'andragogika' },
    { label: 'Matematika', value: 'matematika' },
    { label: 'Fyzika', value: 'fyzika' },
    { label: 'Informatika', value: 'informatika' },
    { label: 'Aplikovaná matematika', value: 'aplikovana-matematika' },
    { label: 'Bioinformatika', value: 'bioinformatika' },
    { label: 'Statistika', value: 'statistika' },
    { label: 'Sociální práce', value: 'socialni-prace' },
    { label: 'Sociální politika', value: 'socialni-politika' },
    { label: 'Humanitní studia', value: 'humanitni-studia' },
    { label: 'Gender studia', value: 'gender-studia' },
    { label: 'Mediální studia', value: 'media-studia' },
    { label: 'Veřejná politika', value: 'verejna-politika' },
    { label: 'Ekonomika a management', value: 'ekonomika' },
    { label: 'Management', value: 'management' },
    { label: 'Finanční řízení', value: 'financni-rizeni' },
    { label: 'Účetnictví', value: 'ucetnictvi' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Podnikání', value: 'podnikani' },
    { label: 'Aplikovaná informatika', value: 'aplikovana-informatika' },
    { label: 'Kybernetika', value: 'kybernetika' },
    { label: 'Datová analýza', value: 'datova-analyza' },
    { label: 'Umělá inteligence', value: 'umele-inteligence' },
    { label: 'Počítačové sítě', value: 'pocitacove-site' },
    { label: 'Všeobecné lékařství', value: 'vseobecne-lekarstvi' },
    { label: 'Zdravotnictví', value: 'zdravotnictvi' },
    { label: 'Ošetřovatelství', value: 'osetrovatelstvi' },
    { label: 'Veřejné zdraví', value: 'verejne-zdravi' },
    { label: 'Farmaceutika', value: 'farmaceutika' },
    { label: 'Strojírenství, materiály a výroba', value: 'strojirenstvi' },
    { label: 'Materiálové inženýrství', value: 'materialove-inzenyrstvi' },
    { label: 'Výroba', value: 'vyrba' },
    { label: 'Konstrukce', value: 'konstrukce' },
    { label: 'Mechatronika', value: 'mechatronika' },
    { label: 'Energetika', value: 'energetika' },
    { label: 'Design', value: 'design' },
    { label: 'Výtvarné umění', value: 'vytvarne-umeni' },
    { label: 'Architektura', value: 'architektura' },
    { label: 'Urbanismus', value: 'urbanismus' },
    { label: 'Interiérový design', value: 'interierovy-design' },
    { label: 'Grafický design', value: 'graficky-design' },
    { label: 'Elektrotechnika', value: 'elektrotechnika' },
    { label: 'Robotika', value: 'robotika' },
    { label: 'Telekomunikace', value: 'telekomunikace' },
    { label: 'Jaderná fyzika', value: 'jaderna-fyzika' },
    { label: 'Optika', value: 'optika' },
    { label: 'Stavebnictví', value: 'stavebnictvi' },
    { label: 'Pozemní stavby', value: 'pozemni-stavby' },
    { label: 'Biotechnologie', value: 'biotechnologie' },
    { label: 'Lékařská informatika', value: 'lekarska-informatika' },
    { label: 'Klinická bioinformatika', value: 'klinicka-bioinformatika' },
    { label: 'Biomedicína', value: 'biomedicina' },
    { label: 'Finanční trhy', value: 'financni-trhy' },
    { label: 'Bankovnictví', value: 'bankovnictvi' },
    { label: 'Pojistovnictví', value: 'pojistovnictvi' },
    { label: 'Investiční řízení', value: 'investicni-rizeni' },
    { label: 'Daňová správa', value: 'danova-sprava' },
    { label: 'Mezinárodní obchod', value: 'mezinarodni-obchod' },
    { label: 'Cestovní ruch', value: 'cestovni-ruch' },
    { label: 'Hotelnictví', value: 'hotelnictvi' },
    { label: 'Logistika', value: 'logistika' },
    { label: 'Dodavatelské řetězce', value: 'dodavatelske-retezce' },
    { label: 'Obchodní management', value: 'obchodni-management' },
] as const

export const ALUMNI_DEGREE_OPTIONS = [
    { label: 'Bakalářské', value: 'bakalarske' },
    { label: 'Magisterské', value: 'magisterske' },
    { label: 'Doktorské', value: 'doktorske' },
] as const

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
