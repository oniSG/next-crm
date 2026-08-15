import type { HeatmapCell } from '@/components/custom/statistics/heatmap'
import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import salesFacts from './data/sales-facts.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const moneyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})
const moneyPreciseFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export type Period = 'day' | 'month' | 'year'

export const PERIOD_OPTIONS = [
    { label: 'Den', value: 'day' },
    { label: 'Měsíc', value: 'month' },
    { label: 'Rok', value: 'year' },
] as const

export const DISCOUNT_TEAM_SERIES = [
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
] as const

export type DiscountTeamKey = (typeof DISCOUNT_TEAM_SERIES)[number]

export const TEAM_OPTIONS = [
    { label: 'Vše', value: 'all' },
    ...DISCOUNT_TEAM_SERIES.map((value) => ({ label: value, value })),
] as const

export const DISCOUNT_CATEGORY_SERIES = [
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
] as const

export type DiscountCategoryKey = (typeof DISCOUNT_CATEGORY_SERIES)[number]

/** Coarse toolbar category → fine discount series keys. */
export const CATEGORY_TO_DISCOUNT_KEYS: Record<
    string,
    readonly DiscountCategoryKey[]
> = {
    all: DISCOUNT_CATEGORY_SERIES,
    zdarma: ['zdarma'],
    csob: ['ostravar', 'slevovyKod'],
    studentska: ['student', 'erasmus', 'zapasSkoly'],
    detska: ['happyMonday', 'zapas', 'zapasAfter'],
    seniori: ['duchodce'],
}

export const DISCOUNT_CATEGORY_OPTIONS = [
    { label: 'Vše', value: 'all' },
    { label: 'ZDARMA', value: 'zdarma' },
    { label: 'ČSOB', value: 'csob' },
    { label: 'Studentská', value: 'studentska' },
    { label: 'Dětská', value: 'detska' },
    { label: 'Senioři', value: 'seniori' },
] as const

export type SalesFactRow = {
    date: string
    team: string
    discountKey: DiscountCategoryKey
    tickets: number
    totalTickets: number
    revenue: number
    discount: number
    users: number
}

export const SALES_FACTS = salesFacts as SalesFactRow[]

export const DISCOUNT_CATEGORY_CONFIG = {
    happyMonday: { label: 'Happy Monday', color: 'var(--chart-1)' },
    hraciPromo: { label: 'Hráči promo', color: 'var(--chart-2)' },
    hraciPromo1: { label: 'Hráči promo 1. vlna', color: 'var(--chart-3)' },
    promoKod: { label: 'Promo Kod', color: 'var(--chart-4)' },
    zdarma: { label: 'Zdarma', color: 'var(--chart-5)' },
    derbyFomo: { label: 'DERBY FOMO', color: 'var(--chart-6)' },
    ostravar: { label: 'Ostravar', color: 'var(--chart-7)' },
    slevovyKod: { label: 'Slevový kód', color: 'var(--chart-8)' },
    student: { label: 'Student', color: 'var(--chart-9)' },
    duchodce: { label: 'Důchodce', color: 'var(--chart-10)' },
    erasmus: { label: 'Erasmus', color: 'var(--chart-11)' },
    zapas: { label: 'Zápas', color: 'var(--chart-12)' },
    zapasSkoly: { label: 'Zápas - školy', color: 'var(--chart-13)' },
    zapasAfter: { label: 'Zápas + After party', color: 'var(--chart-14)' },
    sleva20: { label: 'Sleva 20%', color: 'var(--chart-15)' },
    sleva50: { label: 'Sleva 50%', color: 'var(--chart-16)' },
} satisfies ChartConfig

export const DISCOUNT_TEAM_CONFIG = Object.fromEntries(
    DISCOUNT_TEAM_SERIES.map((team, index) => [
        team,
        { label: team, color: `var(--chart-${(index % 16) + 1})` },
    ]),
) as ChartConfig

export type DiscountedTicketRevenuePoint = {
    label: string
    revenue: number
}

export const DISCOUNTED_TICKET_REVENUE_SERIES = ['revenue'] as const

export const DISCOUNTED_TICKET_REVENUE_CONFIG = {
    revenue: { label: 'Tržba', color: 'var(--chart-1)' },
} satisfies ChartConfig

export type DiscountedTicketsByCategoryPoint = {
    label: string
} & Partial<Record<DiscountCategoryKey, number>>

export type DiscountAmountByCategoryPoint = DiscountedTicketsByCategoryPoint

export type DiscountsByTeamPoint = {
    label: string
} & Partial<Record<DiscountTeamKey, number>>

export type TicketsSoldByTeamPoint = {
    label: string
    count: number
}

export const TICKETS_SOLD_BY_TEAM_SERIES = ['count'] as const

export const TICKETS_SOLD_BY_TEAM_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export type TicketRevenueByTeamPoint = {
    label: string
    revenue: number
}

export const TICKET_REVENUE_BY_TEAM_SERIES = ['revenue'] as const

export const TICKET_REVENUE_BY_TEAM_CONFIG = {
    revenue: { label: 'Tržba', color: 'var(--chart-1)' },
} satisfies ChartConfig

export type CsobPartnerDiscountByTeamPoint = {
    label: string
    count: number
}

export const CSOB_PARTNER_DISCOUNT_BY_TEAM_SERIES = ['count'] as const

export const CSOB_PARTNER_DISCOUNT_BY_TEAM_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function formatSalesRevenue(value: number) {
    return moneyFormatter.format(value)
}

export function formatTicketCount(value: number) {
    return numberFormatter.format(value)
}

export function toDateKey(date: Date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

export function periodColumnLabel(period: Period) {
    if (period === 'day') return 'Datum'
    if (period === 'month') return 'Měsíc'
    return 'Rok'
}

function periodBucket(date: string, period: Period) {
    if (period === 'day') return date
    if (period === 'month') return date.slice(0, 7)
    return date.slice(0, 4)
}

function discountKeysForCategory(category: string): readonly DiscountCategoryKey[] {
    return CATEGORY_TO_DISCOUNT_KEYS[category] ?? DISCOUNT_CATEGORY_SERIES
}

function teamsForFilter(team: string): readonly DiscountTeamKey[] {
    if (team === 'all') return DISCOUNT_TEAM_SERIES
    if ((DISCOUNT_TEAM_SERIES as readonly string[]).includes(team)) {
        return [team as DiscountTeamKey]
    }
    return DISCOUNT_TEAM_SERIES
}

export function filterSalesFacts(
    from: Date,
    to: Date,
    team: string,
    category: string,
    rows: readonly SalesFactRow[] = SALES_FACTS,
): SalesFactRow[] {
    if (from > to) return []

    const fromKey = toDateKey(from)
    const toKey = toDateKey(to)
    const discountKeys = new Set(discountKeysForCategory(category))
    const teamFilter = team === 'all' ? null : team

    return rows.filter((row) => {
        if (row.date < fromKey || row.date > toKey) return false
        if (teamFilter && row.team !== teamFilter) return false
        if (!discountKeys.has(row.discountKey)) return false
        return true
    })
}

export function getDiscountCategorySeries(category: string): DiscountCategoryKey[] {
    return [...discountKeysForCategory(category)]
}

export function getDiscountTeamSeries(team: string): DiscountTeamKey[] {
    return [...teamsForFilter(team)]
}

export function getDiscountedTicketRevenue(
    rows: readonly SalesFactRow[],
    period: Period,
): DiscountedTicketRevenuePoint[] {
    const byBucket = new Map<string, number>()
    for (const row of rows) {
        const key = periodBucket(row.date, period)
        byBucket.set(key, (byBucket.get(key) ?? 0) + row.revenue)
    }
    return [...byBucket.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, revenue]) => ({ label, revenue }))
}

export function getDiscountedTicketsByTeamHeatmap(
    rows: readonly SalesFactRow[],
    period: Period,
): HeatmapCell[] {
    const cells = new Map<string, HeatmapCell>()
    for (const row of rows) {
        const column = periodBucket(row.date, period)
        const key = `${row.team}|${column}`
        const existing = cells.get(key) ?? {
            row: row.team,
            column,
            value: 0,
        }
        existing.value += row.tickets
        cells.set(key, existing)
    }
    return [...cells.values()].sort(
        (a, b) =>
            a.row.localeCompare(b.row) || a.column.localeCompare(b.column),
    )
}

export function getDiscountAmountByTeamHeatmap(
    rows: readonly SalesFactRow[],
    period: Period,
): HeatmapCell[] {
    const cells = new Map<string, HeatmapCell>()
    for (const row of rows) {
        const column = periodBucket(row.date, period)
        const key = `${row.team}|${column}`
        const existing = cells.get(key) ?? {
            row: row.team,
            column,
            value: 0,
        }
        existing.value += row.discount
        cells.set(key, existing)
    }
    return [...cells.values()].sort(
        (a, b) =>
            a.row.localeCompare(b.row) || a.column.localeCompare(b.column),
    )
}

export function getDiscountedTicketsByCategory(
    rows: readonly SalesFactRow[],
    period: Period,
    category: string,
): DiscountedTicketsByCategoryPoint[] {
    const series = getDiscountCategorySeries(category)
    const byBucket = new Map<string, DiscountedTicketsByCategoryPoint>()

    for (const row of rows) {
        const label = periodBucket(row.date, period)
        const current =
            byBucket.get(label) ??
            ({
                label,
                ...Object.fromEntries(series.map((key) => [key, 0])),
            } as DiscountedTicketsByCategoryPoint)
        current[row.discountKey] = (current[row.discountKey] ?? 0) + row.tickets
        byBucket.set(label, current)
    }

    return [...byBucket.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, point]) => point)
}

export function getDiscountAmountByCategory(
    rows: readonly SalesFactRow[],
    period: Period,
    category: string,
): DiscountAmountByCategoryPoint[] {
    const series = getDiscountCategorySeries(category)
    const byBucket = new Map<string, DiscountAmountByCategoryPoint>()

    for (const row of rows) {
        const label = periodBucket(row.date, period)
        const current =
            byBucket.get(label) ??
            ({
                label,
                ...Object.fromEntries(series.map((key) => [key, 0])),
            } as DiscountAmountByCategoryPoint)
        current[row.discountKey] = (current[row.discountKey] ?? 0) + row.discount
        byBucket.set(label, current)
    }

    return [...byBucket.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, point]) => point)
}

export function getDiscountsByTeam(
    rows: readonly SalesFactRow[],
    team: string,
    category: string,
): DiscountsByTeamPoint[] {
    const teamSeries = getDiscountTeamSeries(team)
    const discountSeries = getDiscountCategorySeries(category)
    const byDiscount = new Map<string, DiscountsByTeamPoint>()

    for (const key of discountSeries) {
        byDiscount.set(key, {
            label: DISCOUNT_CATEGORY_CONFIG[key].label,
            ...Object.fromEntries(teamSeries.map((teamKey) => [teamKey, 0])),
        } as DiscountsByTeamPoint)
    }

    for (const row of rows) {
        const point = byDiscount.get(row.discountKey)
        if (!point) continue
        const teamKey = row.team as DiscountTeamKey
        point[teamKey] = (point[teamKey] ?? 0) + row.tickets
    }

    return discountSeries
        .map((key) => byDiscount.get(key)!)
        .filter((point) =>
            teamSeries.some((teamKey) => (point[teamKey] ?? 0) > 0),
        )
}

export function getTicketsSoldByTeam(
    rows: readonly SalesFactRow[],
    team: string,
): TicketsSoldByTeamPoint[] {
    const teamSeries = getDiscountTeamSeries(team)
    const byTeam = new Map<string, number>()
    for (const row of rows) {
        byTeam.set(row.team, (byTeam.get(row.team) ?? 0) + row.totalTickets)
    }
    return teamSeries
        .map((key) => ({ label: key, count: byTeam.get(key) ?? 0 }))
        .filter((row) => row.count > 0)
        .sort((a, b) => b.count - a.count)
}

export function getTicketRevenueByTeam(
    rows: readonly SalesFactRow[],
    team: string,
): TicketRevenueByTeamPoint[] {
    const teamSeries = getDiscountTeamSeries(team)
    const byTeam = new Map<string, number>()
    for (const row of rows) {
        byTeam.set(row.team, (byTeam.get(row.team) ?? 0) + row.revenue)
    }
    return teamSeries
        .map((key) => ({ label: key, revenue: byTeam.get(key) ?? 0 }))
        .filter((row) => row.revenue > 0)
        .sort((a, b) => b.revenue - a.revenue)
}

const CSOB_KEYS = new Set<DiscountCategoryKey>(['ostravar', 'slevovyKod'])

export function getCsobPartnerDiscountByTeam(
    rows: readonly SalesFactRow[],
    team: string,
): CsobPartnerDiscountByTeamPoint[] {
    const teamSeries = getDiscountTeamSeries(team)
    const byTeam = new Map<string, number>()
    for (const row of rows) {
        if (!CSOB_KEYS.has(row.discountKey)) continue
        byTeam.set(row.team, (byTeam.get(row.team) ?? 0) + row.tickets)
    }
    return teamSeries
        .map((key) => ({ label: key, count: byTeam.get(key) ?? 0 }))
        .filter((row) => row.count > 0)
        .sort((a, b) => b.count - a.count)
}

export type SalesReportKpis = {
    discountedTickets: number
    totalTickets: number
    totalDiscount: number
    averageDiscount: number
    revenue: number
    discountSharePercent: number
    users: number
    usersSharePercent: number
    teamsTotal: number
    teamsUsingDiscount: number
    teamsNotUsingDiscount: number
    csobDiscountsUsed: number
}

export function computeSalesReportKpis(
    rows: readonly SalesFactRow[],
    team: string,
): SalesReportKpis {
    let discountedTickets = 0
    let totalTickets = 0
    let totalDiscount = 0
    let revenue = 0
    let users = 0
    let csobDiscountsUsed = 0
    const teamsWithDiscount = new Set<string>()

    for (const row of rows) {
        discountedTickets += row.tickets
        totalTickets += row.totalTickets
        totalDiscount += row.discount
        revenue += row.revenue
        users += row.users
        if (row.tickets > 0) teamsWithDiscount.add(row.team)
        if (CSOB_KEYS.has(row.discountKey)) csobDiscountsUsed += row.tickets
    }

    const teamsTotal = teamsForFilter(team).length
    const teamsUsingDiscount = teamsWithDiscount.size
    const priceBeforeDiscount = revenue + totalDiscount

    return {
        discountedTickets,
        totalTickets,
        totalDiscount,
        averageDiscount:
            discountedTickets > 0 ? totalDiscount / discountedTickets : 0,
        revenue,
        discountSharePercent:
            priceBeforeDiscount > 0
                ? (totalDiscount / priceBeforeDiscount) * 100
                : 0,
        users,
        usersSharePercent: 12.5,
        teamsTotal,
        teamsUsingDiscount,
        teamsNotUsingDiscount: Math.max(0, teamsTotal - teamsUsingDiscount),
        csobDiscountsUsed,
    }
}

export function getSalesReportKpis(
    data: SalesReportKpis,
): Omit<KpiCardProps, 'className'>[] {
    return [
        {
            label: 'Zlevněné vstupenky',
            value: numberFormatter.format(data.discountedTickets),
            action: (
                <InfoTooltip>
                    Počet zlevněných vstupenek z celkového prodeje.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Z celkem prodaných',
                    value: numberFormatter.format(data.totalTickets),
                },
            ],
        },
        {
            label: 'Celková sleva',
            value: moneyFormatter.format(data.totalDiscount),
            action: (
                <InfoTooltip>Součet všech uplatněných slev na vstupenkách.</InfoTooltip>
            ),
            content: [
                {
                    label: 'Průměrná sleva / vstupenka',
                    value: moneyPreciseFormatter.format(data.averageDiscount),
                },
            ],
        },
        {
            label: 'Tržba vs. sleva',
            value: `${moneyFormatter.format(data.revenue)} / ${moneyFormatter.format(data.totalDiscount)}`,
            action: (
                <InfoTooltip>
                    Porovnání tržby a celkové slevy za vybrané období.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Podíl slevy z ceny před slevou',
                    value: `${percentFormatter.format(data.discountSharePercent)} %`,
                },
            ],
        },
        {
            label: 'Uživatelé',
            value: numberFormatter.format(data.users),
            action: (
                <InfoTooltip>
                    Počet uživatelů, kteří využili slevu na vstupenky.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Podíl fanouškovské databáze',
                    value: `${percentFormatter.format(data.usersSharePercent)} %`,
                },
            ],
        },
        {
            label: 'Týmy',
            value: numberFormatter.format(data.teamsTotal),
            action: (
                <InfoTooltip>
                    Počet týmů a podíl těch, které využívají slevu.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Využívá slevu',
                    value: numberFormatter.format(data.teamsUsingDiscount),
                },
                {
                    label: 'Nevyužívá slevu',
                    value: numberFormatter.format(data.teamsNotUsingDiscount),
                },
            ],
        },
        {
            label: 'Počet využitých ČSOB slev',
            value: numberFormatter.format(data.csobDiscountsUsed),
            action: (
                <InfoTooltip>Počet uplatněných slev ČSOB ve vybraném období.</InfoTooltip>
            ),
        },
    ]
}

export function buildDiscountedTicketRevenueColumns(
    period: Period,
): SimpleTableColumn<DiscountedTicketRevenuePoint>[] {
    return [
        {
            id: 'label',
            header: periodColumnLabel(period),
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'revenue',
            header: 'Tržba',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => moneyFormatter.format(row.revenue),
        },
    ]
}

export function buildDiscountedTicketsByCategoryColumns(
    period: Period,
    series: readonly DiscountCategoryKey[],
): SimpleTableColumn<DiscountedTicketsByCategoryPoint>[] {
    return [
        {
            id: 'label',
            header: periodColumnLabel(period),
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: DISCOUNT_CATEGORY_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountedTicketsByCategoryPoint) =>
                numberFormatter.format(row[key] ?? 0),
        })),
    ]
}

export function buildDiscountAmountByCategoryColumns(
    period: Period,
    series: readonly DiscountCategoryKey[],
): SimpleTableColumn<DiscountAmountByCategoryPoint>[] {
    return [
        {
            id: 'label',
            header: periodColumnLabel(period),
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: DISCOUNT_CATEGORY_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountAmountByCategoryPoint) =>
                moneyFormatter.format(row[key] ?? 0),
        })),
    ]
}

export function buildDiscountsByTeamColumns(
    series: readonly DiscountTeamKey[],
): SimpleTableColumn<DiscountsByTeamPoint>[] {
    return [
        {
            id: 'label',
            header: 'Kategorie slevy',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: DISCOUNT_TEAM_CONFIG[key]?.label ?? key,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountsByTeamPoint) =>
                numberFormatter.format(row[key] ?? 0),
        })),
    ]
}

export const TICKETS_SOLD_BY_TEAM_COLUMNS: SimpleTableColumn<TicketsSoldByTeamPoint>[] =
    [
        {
            id: 'label',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'count',
            header: 'Počet',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
    ]

export const TICKET_REVENUE_BY_TEAM_COLUMNS: SimpleTableColumn<TicketRevenueByTeamPoint>[] =
    [
        {
            id: 'label',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'revenue',
            header: 'Tržba',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => moneyFormatter.format(row.revenue),
        },
    ]

export const CSOB_PARTNER_DISCOUNT_BY_TEAM_COLUMNS: SimpleTableColumn<CsobPartnerDiscountByTeamPoint>[] =
    [
        {
            id: 'label',
            header: 'Tým',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'count',
            header: 'Počet',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.count),
        },
    ]
