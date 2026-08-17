import type { ChartConfig } from '@/components/ui/chart'
import type { SelectFilterOption } from '@/components/custom/filters/select-filter'
import type { MultiSelectFilterOption } from '@/components/custom/filters/multi-select-filter'
import type { HeatmapCell } from '@/components/custom/statistics/heatmap'
import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import type { KpiCardContent } from '@/components/custom/statistics/kpi-card'

/** Zákaznické segmenty — koláčový graf. */
export const SEGMENT_OPTIONS = [
    { value: 'all', label: 'Všechny' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'smb', label: 'SMB' },
    { value: 'startup', label: 'Startup' },
    { value: 'personal', label: 'Personal' },
] as const satisfies ReadonlyArray<SelectFilterOption>

/** Týmy — heatmapa. */
export const TEAM_OPTIONS = [
    { value: 'a-team', label: 'A tým' },
    { value: 'b-team', label: 'B tým' },
    { value: 'u19', label: 'U19' },
    { value: 'u17', label: 'U17' },
] as const satisfies ReadonlyArray<MultiSelectFilterOption>

/** Kanály — labeled bar (sessions) + tabulka kampaní. */
export const CHANNEL_OPTIONS = [
    { value: 'organic', label: 'Organic' },
    { value: 'direct', label: 'Direct' },
    { value: 'referral', label: 'Referral' },
    { value: 'email', label: 'E-mail' },
    { value: 'push', label: 'Push' },
    { value: 'sms', label: 'SMS' },
    { value: 'web', label: 'Web' },
] as const satisfies ReadonlyArray<MultiSelectFilterOption>

/** Regiony — tabulka kampaní. */
export const REGION_OPTIONS = [
    { value: 'praha', label: 'Praha' },
    { value: 'brno', label: 'Brno' },
    { value: 'ostrava', label: 'Ostrava' },
    { value: 'plzen', label: 'Plzeň' },
] as const satisfies ReadonlyArray<MultiSelectFilterOption>

export const KPI_DETAIL_ROWS: KpiCardContent[] = [
    { label: 'Otevření', value: '42 %' },
    { label: 'Prokliky', value: '8,1 %' },
    { label: 'Odhlášení', value: '0,4 %' },
]

export const REVENUE_BY_MONTH = [
    { month: 'Led', desktop: 186, mobile: 80 },
    { month: 'Úno', desktop: 214, mobile: 120 },
    { month: 'Bře', desktop: 305, mobile: 190 },
    { month: 'Dub', desktop: 273, mobile: 220 },
    { month: 'Kvě', desktop: 356, mobile: 260 },
    { month: 'Čer', desktop: 421, mobile: 310 },
    { month: 'Čvc', desktop: 480, mobile: 355 },
]

export const REVENUE_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobil', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const REVENUE_STACKED_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobil', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const CATEGORY_SHARE = [
    { name: 'Enterprise', value: 45, fill: 'var(--chart-1)' },
    { name: 'SMB', value: 30, fill: 'var(--chart-2)' },
    { name: 'Startup', value: 15, fill: 'var(--chart-3)' },
    { name: 'Personal', value: 10, fill: 'var(--chart-4)' },
]

export const CATEGORY_CHART_CONFIG = {
    value: { label: 'Podíl' },
    Enterprise: { label: 'Enterprise', color: 'var(--chart-1)' },
    SMB: { label: 'SMB', color: 'var(--chart-2)' },
    Startup: { label: 'Startup', color: 'var(--chart-3)' },
    Personal: { label: 'Personal', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const VISITS_BY_DAY = [
    { day: 'Po', visits: 320, signups: 24 },
    { day: 'Út', visits: 412, signups: 32 },
    { day: 'St', visits: 502, signups: 45 },
    { day: 'Čt', visits: 468, signups: 38 },
    { day: 'Pá', visits: 543, signups: 51 },
    { day: 'So', visits: 380, signups: 28 },
    { day: 'Ne', visits: 295, signups: 20 },
]

export const VISITS_CHART_CONFIG = {
    visits: { label: 'Návštěvy', color: 'var(--chart-1)' },
    signups: { label: 'Registrace', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const MRR_BY_MONTH = [
    { month: 'Led', newMrr: 42, expansion: 18 },
    { month: 'Úno', newMrr: 51, expansion: 22 },
    { month: 'Bře', newMrr: 63, expansion: 28 },
    { month: 'Dub', newMrr: 58, expansion: 35 },
    { month: 'Kvě', newMrr: 74, expansion: 41 },
    { month: 'Čer', newMrr: 89, expansion: 48 },
    { month: 'Čvc', newMrr: 102, expansion: 55 },
]

export const MRR_CHART_CONFIG = {
    newMrr: { label: 'Nové MRR', color: 'var(--chart-1)' },
    expansion: { label: 'Expansion MRR', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const VISITORS_BY_MONTH = [
    { month: 'Led', desktop: 186 },
    { month: 'Úno', desktop: 305 },
    { month: 'Bře', desktop: 237 },
    { month: 'Dub', desktop: 73 },
    { month: 'Kvě', desktop: 209 },
    { month: 'Čer', desktop: 214 },
]

export const VISITORS_CHART_CONFIG = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const SESSIONS_BY_CHANNEL = [
    { channel: 'Organic', channelId: 'organic', sessions: 4200 },
    { channel: 'Direct', channelId: 'direct', sessions: 3120 },
    { channel: 'Referral', channelId: 'referral', sessions: 1840 },
    { channel: 'E-mail', channelId: 'email', sessions: 1420 },
    { channel: 'Push', channelId: 'push', sessions: 980 },
    { channel: 'SMS', channelId: 'sms', sessions: 620 },
    { channel: 'Web', channelId: 'web', sessions: 540 },
]

export const SESSIONS_CHART_CONFIG = {
    sessions: { label: 'Sessions', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const NET_INCOME_MONTHLY = [
    { month: 'Led', netIncome: 186 },
    { month: 'Úno', netIncome: 205 },
    { month: 'Bře', netIncome: -207 },
    { month: 'Dub', netIncome: 173 },
    { month: 'Kvě', netIncome: -209 },
    { month: 'Čer', netIncome: 214 },
]

export const NET_INCOME_CHART_CONFIG = {
    netIncome: { label: 'Čistý zisk' },
} satisfies ChartConfig

export const HEATMAP_BY_TEAM: HeatmapCell[] = [
    { row: 'A tým', column: 'Led', value: 42 },
    { row: 'A tým', column: 'Úno', value: 55 },
    { row: 'A tým', column: 'Bře', value: 48 },
    { row: 'A tým', column: 'Dub', value: 61 },
    { row: 'B tým', column: 'Led', value: 28 },
    { row: 'B tým', column: 'Úno', value: 33 },
    { row: 'B tým', column: 'Bře', value: 41 },
    { row: 'B tým', column: 'Dub', value: 37 },
    { row: 'U19', column: 'Led', value: 18 },
    { row: 'U19', column: 'Úno', value: 22 },
    { row: 'U19', column: 'Bře', value: 19 },
    { row: 'U19', column: 'Dub', value: 25 },
    { row: 'U17', column: 'Led', value: 12 },
    { row: 'U17', column: 'Úno', value: 15 },
    { row: 'U17', column: 'Bře', value: 14 },
    { row: 'U17', column: 'Dub', value: 17 },
]

export const FUNNEL_FLOW: SankeyChartData = {
    nodes: [
        { name: 'Návštěvy', fill: 'var(--chart-1)' },
        { name: 'Registrace', fill: 'var(--chart-1)' },
        { name: 'Odchod', fill: 'var(--chart-7)' },
        { name: 'Aktivace', fill: 'var(--chart-2)' },
        { name: 'Neaktivní', fill: 'var(--chart-7)' },
        { name: 'Platba', fill: 'var(--chart-3)' },
        { name: 'Bez nákupu', fill: 'var(--chart-7)' },
    ],
    links: [
        { source: 0, target: 1, value: 1200 },
        { source: 0, target: 2, value: 3800 },
        { source: 1, target: 3, value: 780 },
        { source: 1, target: 4, value: 420 },
        { source: 3, target: 5, value: 410 },
        { source: 3, target: 6, value: 370 },
    ],
}

export type RevenueTableRow = {
    month: string
    desktop: number
    mobile: number
    total: number
}

export const REVENUE_TABLE_ROWS: RevenueTableRow[] = REVENUE_BY_MONTH.map(
    (row) => ({
        month: row.month,
        desktop: row.desktop,
        mobile: row.mobile,
        total: row.desktop + row.mobile,
    }),
)

export const REVENUE_TABLE_COLUMNS: SimpleTableColumn<RevenueTableRow>[] = [
    {
        id: 'month',
        header: 'Měsíc',
        cell: (row) => row.month,
    },
    {
        id: 'desktop',
        header: 'Desktop',
        cell: (row) => row.desktop.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
    {
        id: 'mobile',
        header: 'Mobil',
        cell: (row) => row.mobile.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
    {
        id: 'total',
        header: 'Celkem',
        cell: (row) => row.total.toLocaleString('cs-CZ'),
        cellClassName: 'text-right font-medium',
        headerClassName: 'text-right',
    },
]

export const CATEGORY_TABLE_COLUMNS: SimpleTableColumn<(typeof CATEGORY_SHARE)[number]>[] =
    [
        {
            id: 'name',
            header: 'Segment',
            cell: (row) => row.name,
        },
        {
            id: 'value',
            header: 'Podíl %',
            cell: (row) => row.value.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
    ]

export const VISITS_TABLE_COLUMNS: SimpleTableColumn<(typeof VISITS_BY_DAY)[number]>[] =
    [
        {
            id: 'day',
            header: 'Den',
            cell: (row) => row.day,
        },
        {
            id: 'visits',
            header: 'Návštěvy',
            cell: (row) => row.visits.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
        {
            id: 'signups',
            header: 'Registrace',
            cell: (row) => row.signups.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
    ]

export const MRR_TABLE_COLUMNS: SimpleTableColumn<(typeof MRR_BY_MONTH)[number]>[] =
    [
        {
            id: 'month',
            header: 'Měsíc',
            cell: (row) => row.month,
        },
        {
            id: 'newMrr',
            header: 'Nové MRR',
            cell: (row) => row.newMrr.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
        {
            id: 'expansion',
            header: 'Expansion',
            cell: (row) => row.expansion.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
    ]

export const VISITORS_TABLE_COLUMNS: SimpleTableColumn<
    (typeof VISITORS_BY_MONTH)[number]
>[] = [
    {
        id: 'month',
        header: 'Měsíc',
        cell: (row) => row.month,
    },
    {
        id: 'desktop',
        header: 'Desktop',
        cell: (row) => row.desktop.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export const SESSIONS_TABLE_COLUMNS: SimpleTableColumn<
    (typeof SESSIONS_BY_CHANNEL)[number]
>[] = [
    {
        id: 'channel',
        header: 'Kanál',
        cell: (row) => row.channel,
    },
    {
        id: 'sessions',
        header: 'Sessions',
        cell: (row) => row.sessions.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export const NET_INCOME_TABLE_COLUMNS: SimpleTableColumn<
    (typeof NET_INCOME_MONTHLY)[number]
>[] = [
    {
        id: 'month',
        header: 'Měsíc',
        cell: (row) => row.month,
    },
    {
        id: 'netIncome',
        header: 'Čistý zisk',
        cell: (row) => row.netIncome.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export const HEATMAP_TABLE_COLUMNS: SimpleTableColumn<HeatmapCell>[] = [
    {
        id: 'row',
        header: 'Tým',
        cell: (row) => row.row,
    },
    {
        id: 'column',
        header: 'Období',
        cell: (row) => row.column,
    },
    {
        id: 'value',
        header: 'Hodnota',
        cell: (row) => row.value.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]

export type FunnelFlowTableRow = {
    id: string
    from: string
    to: string
    value: number
}

export const FUNNEL_FLOW_TABLE_ROWS: FunnelFlowTableRow[] =
    FUNNEL_FLOW.links.map((link, index) => ({
        id: String(index),
        from: FUNNEL_FLOW.nodes[link.source]?.name ?? String(link.source),
        to: FUNNEL_FLOW.nodes[link.target]?.name ?? String(link.target),
        value: link.value,
    }))

export const FUNNEL_FLOW_TABLE_COLUMNS: SimpleTableColumn<FunnelFlowTableRow>[] =
    [
        {
            id: 'from',
            header: 'Z',
            cell: (row) => row.from,
        },
        {
            id: 'to',
            header: 'Do',
            cell: (row) => row.to,
        },
        {
            id: 'value',
            header: 'Objem',
            cell: (row) => row.value.toLocaleString('cs-CZ'),
            cellClassName: 'text-right',
            headerClassName: 'text-right',
        },
    ]

export type CampaignTableRow = {
    id: string
    name: string
    channel: string
    channelId: string
    region: string
    regionId: string
    sent: number
    opened: number
    clicked: number
}

export const CAMPAIGN_TABLE_ROWS: CampaignTableRow[] = [
    {
        id: 'c1',
        name: 'Welcome série',
        channel: 'E-mail',
        channelId: 'email',
        region: 'Praha',
        regionId: 'praha',
        sent: 12400,
        opened: 5208,
        clicked: 984,
    },
    {
        id: 'c2',
        name: 'Matchday reminder',
        channel: 'Push',
        channelId: 'push',
        region: 'Brno',
        regionId: 'brno',
        sent: 8600,
        opened: 4128,
        clicked: 1102,
    },
    {
        id: 'c3',
        name: 'Sleva na dresy',
        channel: 'E-mail',
        channelId: 'email',
        region: 'Ostrava',
        regionId: 'ostrava',
        sent: 9800,
        opened: 2940,
        clicked: 686,
    },
    {
        id: 'c4',
        name: 'SMS vstupenky',
        channel: 'SMS',
        channelId: 'sms',
        region: 'Plzeň',
        regionId: 'plzen',
        sent: 3200,
        opened: 3040,
        clicked: 512,
    },
    {
        id: 'c5',
        name: 'Retargeting web',
        channel: 'Web',
        channelId: 'web',
        region: 'Praha',
        regionId: 'praha',
        sent: 5400,
        opened: 1620,
        clicked: 378,
    },
]

export const CAMPAIGN_TABLE_COLUMNS: SimpleTableColumn<CampaignTableRow>[] = [
    {
        id: 'name',
        header: 'Kampaň',
        cell: (row) => row.name,
        cellClassName: 'font-medium',
    },
    {
        id: 'channel',
        header: 'Kanál',
        cell: (row) => row.channel,
    },
    {
        id: 'region',
        header: 'Region',
        cell: (row) => row.region,
    },
    {
        id: 'sent',
        header: 'Odesláno',
        cell: (row) => row.sent.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
    {
        id: 'opened',
        header: 'Otevření',
        cell: (row) => row.opened.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
    {
        id: 'clicked',
        header: 'Prokliky',
        cell: (row) => row.clicked.toLocaleString('cs-CZ'),
        cellClassName: 'text-right',
        headerClassName: 'text-right',
    },
]
