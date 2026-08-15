/**
 * Generates daily sales-report fact rows for filterable charts.
 * Output: src/app/(sidebar)/sales-report/data/sales-facts.json
 */
import fs from 'node:fs'
import path from 'node:path'

const teams = [
    'akademiciplzen',
    'blackdogsbudweis',
    'boostrava',
    'czufarmers',
    'engineersprague',
    'finalfour',
    'hcmuni',
    'hcnorthwings',
    'ridersup',
    'ukhockeyprague',
    'unitedhk',
    'vsefalcons',
    'vutcavaliers',
]

const discountKeys = [
    'happyMonday',
    'hraciPromo',
    'hraciPromo1',
    'promoKod',
    'zdarma',
    'derbyFomo',
    'ostravar',
    'slevovyKod',
    'student',
    'duchodce',
    'erasmus',
    'zapas',
    'zapasSkoly',
    'zapasAfter',
    'sleva20',
    'sleva50',
]

/** Coarse filter category → fine discount keys (for category filter). */
export const CATEGORY_DISCOUNT_KEYS = {
    zdarma: ['zdarma'],
    csob: ['ostravar', 'slevovyKod'],
    studentska: ['student', 'erasmus', 'zapasSkoly'],
    detska: ['happyMonday', 'zapas', 'zapasAfter'],
    seniori: ['duchodce'],
}

const teamIntensity = Object.fromEntries(
    teams.map((team, index) => [team, 0.55 + (index % 5) * 0.12]),
)

function mulberry32(seed) {
    let t = seed >>> 0
    return () => {
        t += 0x6d2b79f5
        let r = Math.imul(t ^ (t >>> 15), 1 | t)
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
}

const rand = mulberry32(42)

function randInt(min, max) {
    return min + Math.floor(rand() * (max - min + 1))
}

function pickN(items, n) {
    const copy = [...items]
    const picked = []
    while (picked.length < n && copy.length > 0) {
        const index = Math.floor(rand() * copy.length)
        picked.push(copy.splice(index, 1)[0])
    }
    return picked
}

function formatDate(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

function eachDay(from, to, fn) {
    const cursor = new Date(from)
    while (cursor <= to) {
        fn(new Date(cursor))
        cursor.setDate(cursor.getDate() + 1)
    }
}

const from = new Date(2024, 4, 1) // 2024-05-01
const to = new Date(2026, 7, 15) // 2026-08-15

const rows = []

eachDay(from, to, (date) => {
    const iso = formatDate(date)
    const month = date.getMonth() // 0-11
    const dow = date.getDay()
    const isWeekend = dow === 0 || dow === 6
    const seasonBoost = month >= 8 || month <= 3 ? 1.35 : month >= 4 && month <= 5 ? 0.7 : 0.45
    const dayBoost = isWeekend ? 1.4 : 1

    for (const team of teams) {
        const activityChance = Math.min(
            0.85,
            0.42 * teamIntensity[team] * seasonBoost,
        )
        if (rand() > activityChance) continue

        const discountCount = randInt(2, 5)
        const keys = pickN(discountKeys, discountCount)

        for (const discountKey of keys) {
            const baseTickets = Math.round(
                randInt(2, 28) * teamIntensity[team] * seasonBoost * dayBoost,
            )
            const tickets = Math.max(1, baseTickets)
            const extraFullPrice = Math.round(tickets * (0.4 + rand() * 1.2))
            const totalTickets = tickets + extraFullPrice
            const avgPrice = 180 + Math.round(rand() * 220)
            const discountPerTicket =
                discountKey === 'zdarma'
                    ? avgPrice
                    : discountKey === 'sleva50'
                      ? Math.round(avgPrice * 0.5)
                      : discountKey === 'sleva20'
                        ? Math.round(avgPrice * 0.2)
                        : Math.round(avgPrice * (0.15 + rand() * 0.35))
            const discount = tickets * discountPerTicket
            const revenue = tickets * Math.max(0, avgPrice - discountPerTicket)
            const users = Math.max(1, Math.round(tickets * (0.55 + rand() * 0.35)))

            rows.push({
                date: iso,
                team,
                discountKey,
                tickets,
                totalTickets,
                revenue,
                discount,
                users,
            })
        }
    }
})

const outPath = path.join(
    process.cwd(),
    'src/app/(sidebar)/sales-report/data/sales-facts.json',
)
fs.writeFileSync(outPath, JSON.stringify(rows) + '\n')

const dates = new Set(rows.map((r) => r.date))
console.log(
    `Generated ${rows.length} fact rows across ${dates.size} days, ${teams.length} teams`,
)
console.log(`Range: ${rows[0]?.date} – ${rows.at(-1)?.date}`)
console.log(`File: ${outPath}`)
