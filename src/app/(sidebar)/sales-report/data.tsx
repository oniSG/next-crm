import type { HeatmapCell } from '@/components/custom/statistics/heatmap'
import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import discountedTicketRevenue from './data/discounted-ticket-revenue.json'
import discountedTicketsByCategory from './data/discounted-tickets-by-category.json'
import discountedTicketsByTeam from './data/discounted-tickets-by-team.json'
import discountAmountByCategory from './data/discount-amount-by-category.json'
import discountAmountByTeam from './data/discount-amount-by-team.json'
import discountsByTeam from './data/discounts-by-team.json'
import salesReportKpis from './data/sales-report-kpis.json'
import ticketRevenueByTeam from './data/ticket-revenue-by-team.json'
import ticketsSoldByTeam from './data/tickets-sold-by-team.json'
import csobPartnerDiscountByTeam from './data/csob-partner-discount-by-team.json'

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

export const TEAM_OPTIONS = [
    { label: 'blackdogsbudweis', value: 'blackdogsbudweis' },
    { label: 'HC Sparta Praha', value: 'sparta' },
    { label: 'HC Kometa Brno', value: 'kometa' },
    { label: 'HC Dynamo Pardubice', value: 'dynamo' },
    {
        label: 'HC Energie Karlovy Vary – testovací velmi dlouhý název týmu pro ellipsis',
        value: 'energie-long',
    },
    { label: 'Mountfield HK', value: 'mountfield' },
] as const

export const DISCOUNT_CATEGORY_OPTIONS = [
    { label: 'ZDARMA', value: 'zdarma' },
    { label: 'ČSOB', value: 'csob' },
    { label: 'Studentská', value: 'studentska' },
    { label: 'Dětská', value: 'detska' },
    { label: 'Senioři', value: 'seniori' },
] as const

export type DiscountedTicketRevenuePoint = {
    label: string
    revenue: number
}

export const DISCOUNTED_TICKET_REVENUE_SERIES = ['revenue'] as const

export const DISCOUNTED_TICKET_REVENUE_CONFIG = {
    revenue: { label: 'Tržba', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const DISCOUNTED_TICKET_REVENUE =
    discountedTicketRevenue as DiscountedTicketRevenuePoint[]

export const DISCOUNTED_TICKET_REVENUE_COLUMNS: SimpleTableColumn<DiscountedTicketRevenuePoint>[] =
    [
        {
            id: 'label',
            header: 'Měsíc',
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

export function formatSalesRevenue(value: number) {
    return moneyFormatter.format(value)
}

export function formatTicketCount(value: number) {
    return numberFormatter.format(value)
}

export const DISCOUNTED_TICKETS_BY_TEAM =
    discountedTicketsByTeam as HeatmapCell[]

export const DISCOUNT_AMOUNT_BY_TEAM = discountAmountByTeam as HeatmapCell[]

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

export type DiscountedTicketsByCategoryPoint = {
    label: string
} & Record<(typeof DISCOUNT_CATEGORY_SERIES)[number], number>

export const DISCOUNTED_TICKETS_BY_CATEGORY =
    discountedTicketsByCategory as DiscountedTicketsByCategoryPoint[]

export const DISCOUNTED_TICKETS_BY_CATEGORY_COLUMNS: SimpleTableColumn<DiscountedTicketsByCategoryPoint>[] =
    [
        {
            id: 'label',
            header: 'Měsíc',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...DISCOUNT_CATEGORY_SERIES.map((key) => ({
            id: key,
            header: DISCOUNT_CATEGORY_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountedTicketsByCategoryPoint) =>
                numberFormatter.format(row[key]),
        })),
    ]

export type DiscountAmountByCategoryPoint = DiscountedTicketsByCategoryPoint

export const DISCOUNT_AMOUNT_BY_CATEGORY =
    discountAmountByCategory as DiscountAmountByCategoryPoint[]

export const DISCOUNT_AMOUNT_BY_CATEGORY_COLUMNS: SimpleTableColumn<DiscountAmountByCategoryPoint>[] =
    [
        {
            id: 'label',
            header: 'Měsíc',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...DISCOUNT_CATEGORY_SERIES.map((key) => ({
            id: key,
            header: DISCOUNT_CATEGORY_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountAmountByCategoryPoint) =>
                moneyFormatter.format(row[key]),
        })),
    ]

export const DISCOUNT_TEAM_SERIES = [
    'akademiciplzen',
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

export const DISCOUNT_TEAM_CONFIG = {
    akademiciplzen: { label: 'akademiciplzen', color: 'var(--chart-1)' },
    boostrava: { label: 'boostrava', color: 'var(--chart-2)' },
    czufarmers: { label: 'czufarmers', color: 'var(--chart-3)' },
    engineersprague: { label: 'engineersprague', color: 'var(--chart-4)' },
    finalfour: { label: 'finalfour', color: 'var(--chart-5)' },
    hcmuni: { label: 'hcmuni', color: 'var(--chart-6)' },
    hcnorthwings: { label: 'hcnorthwings', color: 'var(--chart-7)' },
    ridersup: { label: 'ridersup', color: 'var(--chart-8)' },
    ukhockeyprague: { label: 'ukhockeyprague', color: 'var(--chart-9)' },
    unitedhk: { label: 'unitedhk', color: 'var(--chart-10)' },
    vsefalcons: { label: 'vsefalcons', color: 'var(--chart-11)' },
    vutcavaliers: { label: 'vutcavaliers', color: 'var(--chart-12)' },
} satisfies ChartConfig

export type DiscountsByTeamPoint = {
    label: string
} & Record<(typeof DISCOUNT_TEAM_SERIES)[number], number>

export const DISCOUNTS_BY_TEAM = discountsByTeam as DiscountsByTeamPoint[]

export const DISCOUNTS_BY_TEAM_COLUMNS: SimpleTableColumn<DiscountsByTeamPoint>[] =
    [
        {
            id: 'label',
            header: 'Kategorie slevy',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...DISCOUNT_TEAM_SERIES.map((key) => ({
            id: key,
            header: DISCOUNT_TEAM_CONFIG[key].label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: DiscountsByTeamPoint) => numberFormatter.format(row[key]),
        })),
    ]

export type TicketsSoldByTeamPoint = {
    label: string
    count: number
}

export const TICKETS_SOLD_BY_TEAM_SERIES = ['count'] as const

export const TICKETS_SOLD_BY_TEAM_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const TICKETS_SOLD_BY_TEAM =
    ticketsSoldByTeam as TicketsSoldByTeamPoint[]

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

export type TicketRevenueByTeamPoint = {
    label: string
    revenue: number
}

export const TICKET_REVENUE_BY_TEAM_SERIES = ['revenue'] as const

export const TICKET_REVENUE_BY_TEAM_CONFIG = {
    revenue: { label: 'Tržba', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const TICKET_REVENUE_BY_TEAM =
    ticketRevenueByTeam as TicketRevenueByTeamPoint[]

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

export type CsobPartnerDiscountByTeamPoint = {
    label: string
    count: number
}

export const CSOB_PARTNER_DISCOUNT_BY_TEAM_SERIES = ['count'] as const

export const CSOB_PARTNER_DISCOUNT_BY_TEAM_CONFIG = {
    count: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const CSOB_PARTNER_DISCOUNT_BY_TEAM =
    csobPartnerDiscountByTeam as CsobPartnerDiscountByTeamPoint[]

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

export const SALES_REPORT_KPIS_DATA = salesReportKpis[0] as SalesReportKpis

export function getSalesReportKpis(
    data: SalesReportKpis = SALES_REPORT_KPIS_DATA,
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
