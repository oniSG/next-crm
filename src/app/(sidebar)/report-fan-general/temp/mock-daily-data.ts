type MetricKey =
    | 'doruceno'
    | 'unikatniOtevreni'
    | 'unikatniProklik'
    | 'nedoruceno'
    | 'odhlaseno'
    | 'hardBounce'
    | 'softBounce'
    | 'spam'

type DailyMetrics = {
    date: string
} & Record<MetricKey, number>

const GLOBAL_KEYS: MetricKey[] = [
    'doruceno',
    'unikatniOtevreni',
    'unikatniProklik',
    'nedoruceno',
    'odhlaseno',
    'hardBounce',
    'softBounce',
    'spam',
]

function hash(n: number) {
    const x = Math.sin(n) * 10000
    return x - Math.floor(x)
}

function dayMetrics(
    dayIndex: number,
    base: Record<MetricKey, number>,
): Record<MetricKey, number> {
    const result = {} as Record<MetricKey, number>
    for (const key of GLOBAL_KEYS) {
        const noise = 0.25 + hash(dayIndex * 17 + key.length * 3) * 1.6
        const weekly = 0.7 + hash(Math.floor(dayIndex / 7) * 9 + key.length) * 0.6
        const spike = hash(dayIndex * 41 + key.length * 11) > 0.92 ? 1.8 : 1
        const wobble = noise * weekly * spike
        result[key] = Math.max(0, Math.round(base[key] * wobble))
    }
    return result
}

function buildDailyRange(
    start: Date,
    end: Date,
    base: Record<MetricKey, number>,
): DailyMetrics[] {
    const rows: DailyMetrics[] = []
    const cursor = new Date(start)
    let i = 0
    while (cursor <= end) {
        const y = cursor.getFullYear()
        const m = String(cursor.getMonth() + 1).padStart(2, '0')
        const d = String(cursor.getDate()).padStart(2, '0')
        rows.push({
            date: `${y}-${m}-${d}`,
            ...dayMetrics(i, base),
        })
        cursor.setDate(cursor.getDate() + 1)
        i += 1
    }
    return rows
}

const RANGE_START = new Date(2022, 0, 1)
const RANGE_END = new Date(2026, 7, 28)

/** Mock daily data — delete this folder when real API data is wired. */
export const EMAIL_REPORT_BY_DAY = buildDailyRange(RANGE_START, RANGE_END, {
    doruceno: 280,
    unikatniOtevreni: 170,
    unikatniProklik: 42,
    nedoruceno: 12,
    odhlaseno: 3,
    hardBounce: 3,
    softBounce: 7,
    spam: 1,
})

export const SMS_REPORT_BY_DAY = buildDailyRange(RANGE_START, RANGE_END, {
    doruceno: 140,
    unikatniOtevreni: 0,
    unikatniProklik: 0,
    nedoruceno: 6,
    odhlaseno: 0,
    hardBounce: 0,
    softBounce: 0,
    spam: 0,
}).map(({ date, doruceno, nedoruceno }) => ({ date, doruceno, nedoruceno }))

export const PUSH_REPORT_BY_DAY = buildDailyRange(RANGE_START, RANGE_END, {
    doruceno: 420,
    unikatniOtevreni: 0,
    unikatniProklik: 0,
    nedoruceno: 14,
    odhlaseno: 0,
    hardBounce: 0,
    softBounce: 0,
    spam: 0,
}).map(({ date, doruceno, nedoruceno }) => ({ date, doruceno, nedoruceno }))
