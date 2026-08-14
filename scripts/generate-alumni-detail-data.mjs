import fs from 'node:fs'
import path from 'node:path'

/** school -> faculty value -> { label, fields: [{ value, label }] } */
const HIERARCHY = {
    uk: {
        'uk-prf': {
            label: 'UK | Právnická fakulta',
            fields: [
                { value: 'pravo', label: 'Právo' },
                { value: 'mezinarodni-pravo', label: 'Mezinárodní právo' },
                { value: 'obchodni-pravo', label: 'Obchodní právo' },
                { value: 'trestni-pravo', label: 'Trestní právo' },
                { value: 'spravni-pravo', label: 'Správní právo' },
                { value: 'ustavni-pravo', label: 'Ústavní právo' },
            ],
        },
        'uk-ftvs': {
            label: 'UK | Fakulta tělesné výchovy a sportu',
            fields: [
                { value: 'tvs', label: 'Tělesná výchova a sport' },
                { value: 'management-sportu', label: 'Management sportu' },
                { value: 'fyzioterapie', label: 'Fyzioterapie' },
                { value: 'sportovni-trenink', label: 'Sportovní trénink' },
                { value: 'outdoor-edukace', label: 'Outdoor edukace' },
                { value: 'sportovni-management', label: 'Sportovní management' },
            ],
        },
        'uk-ff': {
            label: 'UK | Filozofická fakulta',
            fields: [
                { value: 'filozofie', label: 'Filozofie' },
                { value: 'psychologie', label: 'Psychologie' },
                { value: 'sociologie', label: 'Sociologie' },
                { value: 'historie', label: 'Historie' },
                { value: 'politologie', label: 'Politologie' },
                { value: 'andragogika', label: 'Andragogika' },
            ],
        },
        'uk-mff': {
            label: 'UK | Matematicko-fyzikální fakulta',
            fields: [
                { value: 'matematika', label: 'Matematika' },
                { value: 'fyzika', label: 'Fyzika' },
                { value: 'informatika', label: 'Informatika' },
                { value: 'aplikovana-matematika', label: 'Aplikovaná matematika' },
                { value: 'bioinformatika', label: 'Bioinformatika' },
                { value: 'statistika', label: 'Statistika' },
            ],
        },
        'uk-fsv': {
            label: 'UK | Fakulta sociálních věd',
            fields: [
                { value: 'socialni-prace', label: 'Sociální práce' },
                { value: 'socialni-politika', label: 'Sociální politika' },
                { value: 'humanitni-studia', label: 'Humanitní studia' },
                { value: 'gender-studia', label: 'Gender studia' },
                { value: 'media-studia', label: 'Mediální studia' },
                { value: 'verejna-politika', label: 'Veřejná politika' },
            ],
        },
    },
    muni: {
        'muni-fss': {
            label: 'MUNI | Fakulta sportovních studií',
            fields: [
                { value: 'tvs', label: 'Tělesná výchova a sport' },
                { value: 'management-sportu', label: 'Management sportu' },
                { value: 'socialni-prace', label: 'Sociální práce' },
                { value: 'sociologie', label: 'Sociologie' },
                { value: 'gender-studia', label: 'Gender studia' },
                { value: 'andragogika', label: 'Andragogika' },
            ],
        },
        'muni-esf': {
            label: 'MUNI | Ekonomicko-správní fakulta',
            fields: [
                { value: 'ekonomika', label: 'Ekonomika a management' },
                { value: 'management', label: 'Management' },
                { value: 'financni-rizeni', label: 'Finanční řízení' },
                { value: 'ucetnictvi', label: 'Účetnictví' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'podnikani', label: 'Podnikání' },
            ],
        },
        'muni-fi': {
            label: 'MUNI | Fakulta informatiky',
            fields: [
                { value: 'informatika', label: 'Informatika' },
                { value: 'aplikovana-informatika', label: 'Aplikovaná informatika' },
                { value: 'kybernetika', label: 'Kybernetika' },
                { value: 'bioinformatika', label: 'Bioinformatika' },
                { value: 'datova-analyza', label: 'Datová analýza' },
                { value: 'umele-inteligence', label: 'Umělá inteligence' },
            ],
        },
        'muni-med': {
            label: 'MUNI | Lékařská fakulta',
            fields: [
                { value: 'vseobecne-lekarstvi', label: 'Všeobecné lékařství' },
                { value: 'zdravotnictvi', label: 'Zdravotnictví' },
                { value: 'osetrovatelstvi', label: 'Ošetřovatelství' },
                { value: 'fyzioterapie', label: 'Fyzioterapie' },
                { value: 'verejne-zdravi', label: 'Veřejné zdraví' },
                { value: 'farmaceutika', label: 'Farmaceutika' },
            ],
        },
        'muni-prf': {
            label: 'MUNI | Právnická fakulta',
            fields: [
                { value: 'pravo', label: 'Právo' },
                { value: 'mezinarodni-pravo', label: 'Mezinárodní právo' },
                { value: 'obchodni-pravo', label: 'Obchodní právo' },
                { value: 'trestni-pravo', label: 'Trestní právo' },
                { value: 'evropske-pravo', label: 'Evropské právo' },
                { value: 'spravni-pravo', label: 'Správní právo' },
            ],
        },
    },
    zcu: {
        'zcu-fav': {
            label: 'ZČU | Fakulta aplikovaných věd',
            fields: [
                { value: 'informatika', label: 'Informatika' },
                { value: 'kybernetika', label: 'Kybernetika' },
                { value: 'aplikovana-informatika', label: 'Aplikovaná informatika' },
                { value: 'datova-analyza', label: 'Datová analýza' },
                { value: 'pocitacove-site', label: 'Počítačové sítě' },
                { value: 'umele-inteligence', label: 'Umělá inteligence' },
            ],
        },
        'zcu-fpe': {
            label: 'ZČU | Fakulta pedagogická',
            fields: [
                { value: 'tvs', label: 'Tělesná výchova a sport' },
                { value: 'management-sportu', label: 'Management sportu' },
                { value: 'fyzioterapie', label: 'Fyzioterapie' },
                { value: 'outdoor-edukace', label: 'Outdoor edukace' },
                { value: 'telocvik', label: 'Tělovýchova' },
                { value: 'sportovni-trenink', label: 'Sportovní trénink' },
            ],
        },
        'zcu-zf': {
            label: 'ZČU | Strojní fakulta',
            fields: [
                { value: 'strojirenstvi', label: 'Strojírenství, materiály a výroba' },
                { value: 'materialove-inzenyrstvi', label: 'Materiálové inženýrství' },
                { value: 'vyrba', label: 'Výroba' },
                { value: 'konstrukce', label: 'Konstrukce' },
                { value: 'mechatronika', label: 'Mechatronika' },
                { value: 'energetika', label: 'Energetika' },
            ],
        },
        'zcu-ffd': {
            label: 'ZČU | Fakulta designu a umění',
            fields: [
                { value: 'design', label: 'Design' },
                { value: 'vytvarne-umeni', label: 'Výtvarné umění' },
                { value: 'architektura', label: 'Architektura' },
                { value: 'urbanismus', label: 'Urbanismus' },
                { value: 'interierovy-design', label: 'Interiérový design' },
                { value: 'graficky-design', label: 'Grafický design' },
            ],
        },
    },
    cvut: {
        'cvut-fel': {
            label: 'ČVUT | Fakulta elektrotechnická',
            fields: [
                { value: 'elektrotechnika', label: 'Elektrotechnika' },
                { value: 'kybernetika', label: 'Kybernetika' },
                { value: 'informatika', label: 'Informatika' },
                { value: 'pocitacove-site', label: 'Počítačové sítě' },
                { value: 'robotika', label: 'Robotika' },
                { value: 'telekomunikace', label: 'Telekomunikace' },
            ],
        },
        'cvut-fjfi': {
            label: 'ČVUT | Fakulta jaderná a fyzikálně inženýrská',
            fields: [
                { value: 'fyzika', label: 'Fyzika' },
                { value: 'matematika', label: 'Matematika' },
                { value: 'aplikovana-matematika', label: 'Aplikovaná matematika' },
                { value: 'jaderna-fyzika', label: 'Jaderná fyzika' },
                { value: 'optika', label: 'Optika' },
                { value: 'statistika', label: 'Statistika' },
            ],
        },
        'cvut-fs': {
            label: 'ČVUT | Fakulta strojní',
            fields: [
                { value: 'strojirenstvi', label: 'Strojírenství, materiály a výroba' },
                { value: 'materialove-inzenyrstvi', label: 'Materiálové inženýrství' },
                { value: 'konstrukce', label: 'Konstrukce' },
                { value: 'mechatronika', label: 'Mechatronika' },
                { value: 'vyrba', label: 'Výroba' },
                { value: 'energetika', label: 'Energetika' },
            ],
        },
        'cvut-fak': {
            label: 'ČVUT | Fakulta architektury',
            fields: [
                { value: 'architektura', label: 'Architektura' },
                { value: 'urbanismus', label: 'Urbanismus' },
                { value: 'stavebnictvi', label: 'Stavebnictví' },
                { value: 'pozemni-stavby', label: 'Pozemní stavby' },
                { value: 'interierovy-design', label: 'Interiérový design' },
                { value: 'design', label: 'Design' },
            ],
        },
        'cvut-fbmi': {
            label: 'ČVUT | Fakulta biomedicínského inženýrství',
            fields: [
                { value: 'bioinformatika', label: 'Bioinformatika' },
                { value: 'biotechnologie', label: 'Biotechnologie' },
                { value: 'lekarska-informatika', label: 'Lékařská informatika' },
                { value: 'klinicka-bioinformatika', label: 'Klinická bioinformatika' },
                { value: 'biomedicina', label: 'Biomedicína' },
                { value: 'zdravotnictvi', label: 'Zdravotnictví' },
            ],
        },
    },
    vse: {
        'vse-fis': {
            label: 'VŠE | Fakulta informatiky a statistiky',
            fields: [
                { value: 'ekonomika', label: 'Ekonomika a management' },
                { value: 'management', label: 'Management' },
                { value: 'financni-rizeni', label: 'Finanční řízení' },
                { value: 'ucetnictvi', label: 'Účetnictví' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'podnikani', label: 'Podnikání' },
            ],
        },
        'vse-fph': {
            label: 'VŠE | Fakulta financí a účetnictví',
            fields: [
                { value: 'financni-trhy', label: 'Finanční trhy' },
                { value: 'bankovnictvi', label: 'Bankovnictví' },
                { value: 'pojistovnictvi', label: 'Pojistovnictví' },
                { value: 'investicni-rizeni', label: 'Investiční řízení' },
                { value: 'danova-sprava', label: 'Daňová správa' },
                { value: 'ucetnictvi', label: 'Účetnictví' },
            ],
        },
        'vse-nhf': {
            label: 'VŠE | Národohospodářská fakulta',
            fields: [
                { value: 'mezinarodni-obchod', label: 'Mezinárodní obchod' },
                { value: 'cestovni-ruch', label: 'Cestovní ruch' },
                { value: 'hotelnictvi', label: 'Hotelnictví' },
                { value: 'logistika', label: 'Logistika' },
                { value: 'dodavatelske-retezce', label: 'Dodavatelské řetězce' },
                { value: 'obchodni-management', label: 'Obchodní management' },
            ],
        },
    },
    upol: {
        'upol-ff': {
            label: 'UPOL | Filozofická fakulta',
            fields: [
                { value: 'filozofie', label: 'Filozofie' },
                { value: 'historie', label: 'Historie' },
                { value: 'psychologie', label: 'Psychologie' },
                { value: 'sociologie', label: 'Sociologie' },
                { value: 'politologie', label: 'Politologie' },
                { value: 'andragogika', label: 'Andragogika' },
            ],
        },
        'upol-prf': {
            label: 'UPOL | Právnická fakulta',
            fields: [
                { value: 'pravo', label: 'Právo' },
                { value: 'mezinarodni-pravo', label: 'Mezinárodní právo' },
                { value: 'obchodni-pravo', label: 'Obchodní právo' },
                { value: 'evropske-pravo', label: 'Evropské právo' },
                { value: 'trestni-pravo', label: 'Trestní právo' },
                { value: 'spravni-pravo', label: 'Správní právo' },
            ],
        },
        'upol-mef': {
            label: 'UPOL | Pedagogická fakulta',
            fields: [
                { value: 'ekonomika', label: 'Ekonomika a management' },
                { value: 'management', label: 'Management' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'financni-rizeni', label: 'Finanční řízení' },
                { value: 'ucetnictvi', label: 'Účetnictví' },
                { value: 'podnikani', label: 'Podnikání' },
            ],
        },
        'upol-ftk': {
            label: 'UPOL | Fakulta tělesné kultury',
            fields: [
                { value: 'tvs', label: 'Tělesná výchova a sport' },
                { value: 'management-sportu', label: 'Management sportu' },
                { value: 'fyzioterapie', label: 'Fyzioterapie' },
                { value: 'sportovni-trenink', label: 'Sportovní trénink' },
                { value: 'outdoor-edukace', label: 'Outdoor edukace' },
                { value: 'telocvik', label: 'Tělovýchova' },
            ],
        },
    },
}

const seasons = [
    '2015/2016', '2016/2017', '2017/2018', '2018/2019', '2019/2020',
    '2020/2021', '2021/2022', '2022/2023', '2023/2024', '2024/2025', '2025/2026',
]

const degrees = ['bakalarske', 'magisterske', 'doktorske']

const teams = [
    'black-dogs-budweis',
    'sparta',
    'kometa',
    'dynamo',
    'mountfield',
    'trinec',
]

const schoolIntensity = {
    uk: 1.15,
    muni: 1.05,
    zcu: 1.25,
    cvut: 1.0,
    vse: 0.9,
    upol: 0.8,
}

const teamIntensity = {
    'black-dogs-budweis': 0.85,
    sparta: 1.15,
    kometa: 1.05,
    dynamo: 1.0,
    mountfield: 0.95,
    trinec: 1.1,
}

const teamDisplayNames = {
    'black-dogs-budweis': 'Black Dogs Budweis',
    sparta: 'HC Sparta Praha',
    kometa: 'HC Kometa Brno',
    dynamo: 'HC Dynamo Pardubice',
    mountfield: 'Mountfield HK',
    trinec: 'HC Oceláři Třinec',
}

let seed = 42
function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 0xffffffff
}
function randInt(min, max) {
    return Math.floor(rand() * (max - min + 1)) + min
}

const rows = []
for (const season of seasons) {
    const seasonIndex = seasons.indexOf(season)
    const growth = 1 + seasonIndex * 0.02
    const quiet = season === '2019/2020' || season === '2025/2026'

    for (const team of teams) {
        const teamSeasonRows = []

        for (const [school, faculties] of Object.entries(HIERARCHY)) {
            const schoolScale = schoolIntensity[school] * growth

            for (const [faculty, { fields }] of Object.entries(faculties)) {
                for (const field of fields) {
                    for (const degree of degrees) {
                        const degreeScale =
                            degree === 'doktorske'
                                ? 0.3
                                : degree === 'magisterske'
                                  ? 0.65
                                  : 1
                        const sliceBase = quiet ? randInt(1, 4) : randInt(2, 9)
                        const alumni = Math.max(
                            1,
                            Math.round(
                                sliceBase *
                                    schoolScale *
                                    teamIntensity[team] *
                                    degreeScale *
                                    (0.85 + rand() * 0.3),
                            ),
                        )
                        const completed = Math.round(alumni * (0.42 + rand() * 0.38))
                        const incomplete = Math.max(
                            0,
                            Math.round(alumni * (0.08 + rand() * 0.22)),
                        )
                        const extraActive = Math.max(
                            1,
                            Math.round(alumni * (0.35 + rand() * 0.25)),
                        )
                        const playersInSlice = alumni + extraActive

                        const row = {
                            season,
                            team,
                            school,
                            faculty,
                            field: field.value,
                            degree,
                            playersInSelection: 0,
                            activePlayers: 0,
                            activeInSlice: extraActive,
                            playersInSlice,
                            teamSeasonAlumni: 0,
                            teamSeasonDepartures: 0,
                            alumni,
                            completed,
                            incomplete,
                        }

                        if (rand() < 0.08) {
                            row.teamLabel = teamDisplayNames[team]
                        }

                        teamSeasonRows.push(row)
                    }
                }
            }
        }

        const teamSeasonAlumni = teamSeasonRows.reduce(
            (total, row) => total + row.alumni,
            0,
        )
        const teamSeasonDepartures = teamSeasonRows.reduce(
            (total, row) => total + row.completed + row.incomplete,
            0,
        )
        const playersInSelection = teamSeasonRows.reduce(
            (total, row) => total + row.playersInSlice,
            0,
        )
        const activePlayers = teamSeasonRows.reduce(
            (total, row) => total + row.activeInSlice,
            0,
        )

        for (const row of teamSeasonRows) {
            row.teamSeasonAlumni = teamSeasonAlumni
            row.teamSeasonDepartures = teamSeasonDepartures
            row.playersInSelection = playersInSelection
            row.activePlayers = activePlayers
            rows.push(row)
        }
    }
}

const outPath = path.join(
    process.cwd(),
    'src/app/(sidebar)/alumni/data/alumni-by-season-detail.json',
)
fs.writeFileSync(outPath, JSON.stringify(rows, null, 2) + '\n')

const graduationByTeamSeason = new Map()
for (const row of rows) {
    const key = `${row.season}|${row.team}`
    const existing = graduationByTeamSeason.get(key) ?? {
        season: row.season,
        team: row.team,
        playersInSelection: 0,
        activePlayers: 0,
        alumni: 0,
        completed: 0,
        incomplete: 0,
    }
    existing.playersInSelection += row.playersInSlice
    existing.activePlayers += row.activeInSlice
    existing.alumni += row.alumni
    existing.completed += row.completed
    existing.incomplete += row.incomplete
    graduationByTeamSeason.set(key, existing)
}

const graduationRows = [...graduationByTeamSeason.values()].sort((a, b) => {
    const seasonDiff = seasons.indexOf(a.season) - seasons.indexOf(b.season)
    if (seasonDiff !== 0) return seasonDiff
    return teams.indexOf(a.team) - teams.indexOf(b.team)
})

const graduationOutPath = path.join(
    process.cwd(),
    'src/app/(sidebar)/alumni-graduation-rate/data/graduation-by-season-team.json',
)
fs.writeFileSync(graduationOutPath, JSON.stringify(graduationRows, null, 2) + '\n')

const facultyCount = Object.values(HIERARCHY).reduce(
    (n, f) => n + Object.keys(f).length,
    0,
)
const fieldCount = new Set(rows.map((r) => r.field)).size
const totals = rows.reduce(
    (a, r) => {
        a.alumni += r.alumni
        a.players += r.playersInSlice
        a.active += r.activeInSlice
        a.departures += r.completed + r.incomplete
        return a
    },
    { alumni: 0, players: 0, active: 0, departures: 0 },
)

console.log(`Generated ${rows.length} detail rows`)
console.log(`Generated ${graduationRows.length} graduation team-season rows`)
console.log(`Schools: ${Object.keys(HIERARCHY).length}, faculties: ${facultyCount}, unique fields: ${fieldCount}`)
console.log(
    `Players in selection: ${totals.players}, Active: ${totals.active}, Alumni: ${totals.alumni}, Departures: ${totals.departures}`,
)
