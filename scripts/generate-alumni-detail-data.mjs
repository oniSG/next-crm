import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const hierarchyJson = require('../src/lib/alumni/hierarchy.json')

/** school -> faculty value -> { label, fields: [{ value, label }] } */
const HIERARCHY = Object.fromEntries(
    Object.entries(hierarchyJson.schools).map(([school, data]) => [
        school,
        data.faculties,
    ]),
)

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

let seed = 42
function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 0xffffffff
}
function randInt(min, max) {
    return Math.floor(rand() * (max - min + 1)) + min
}

function yearCountForDegree(degree) {
    if (degree === 'magisterske') return 2
    if (degree === 'doktorske') return 4
    return 3
}

/** Split `total` into `parts` non-negative integers that sum to `total`. */
function distributeAcrossYears(total, parts) {
    if (parts <= 0) return []
    if (total <= 0) return Array.from({ length: parts }, () => 0)

    const counts = Array.from({ length: parts }, () => 0)
    for (let i = 0; i < total; i += 1) {
        counts[Math.floor(rand() * parts)] += 1
    }
    return counts
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
                        const yearParts = yearCountForDegree(degree)
                        const activeByYear = distributeAcrossYears(
                            extraActive,
                            yearParts,
                        )
                        while (activeByYear.length < 4) activeByYear.push(0)

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
                            activeByYear,
                            teamSeasonAlumni: 0,
                            teamSeasonDepartures: 0,
                            alumni,
                            completed,
                            incomplete,
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
