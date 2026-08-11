import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import bestSendDay from './data/best-send-day.json'
import bestSendTime from './data/best-send-time.json'
import emailFunnelFlow from './data/email-funnel-flow.json'
import emailMetricsStages from './data/email-metrics-stages.json'
import topActions from './data/top-actions.json'
import unsubscribeTypes from './data/unsubscribe-types.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export const RELATOO_INDEX_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Relatoo index',
        value: '3,63',
        content: [{ label: 'Pořadí mezi tenanty', value: '14' }],
        trend: {
            direction: 'up',
            delta: '+0,59',
            hint: 'změna indexu za posledních 30 dní',
        },
        action: (
            <InfoTooltip>
                Aktuální Relatoo index oproti předchozímu období, včetně změny a pořadí
                mezi tenanty.
            </InfoTooltip>
        ),
    },
    {
        label: 'Stav',
        value: 'Dobrý',
        action: (
            <InfoTooltip>
                Aktuální stav Relatoo indexu oproti předchozímu období.
            </InfoTooltip>
        ),
    },
    {
        label: 'Proměnné',
        content: [
            { label: 'Události', value: '4' },
            { label: 'Počet akcí', value: '19' },
            { label: 'Počet dotazníků', value: '0' },
            { label: 'Vstupy', value: '0' },
        ],
        action: (
            <InfoTooltip>
                Proměnné vstupující do výpočtu Relatoo indexu — události, akce, dotazníky
                a vstupy.
            </InfoTooltip>
        ),
    },
]

export type BestSendPoint = {
    label: string
    pocet: number
}

export type EmailMetricStage = {
    label: string
    pocet: number
    percent: number
}

export type TopActionRow = {
    id: string
    name: string
    channel: string
    delivered: number
    uniqueOpens: number
    openRate: number
    uniqueClicks: number
    ctr: number
}

export const BEST_SEND_TIME_SERIES = ['pocet'] as const

export const BEST_SEND_TIME_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_TIME_BY_SLOT = bestSendTime as BestSendPoint[]

export const BEST_SEND_DAY_SERIES = ['pocet'] as const

export const BEST_SEND_DAY_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_DAY_BY_WEEKDAY = bestSendDay as BestSendPoint[]

export const EMAIL_FUNNEL_FLOW = emailFunnelFlow as SankeyChartData

export type UnsubscribeTypePoint = {
    label: string
    sdeleniOAkci: number
    sdeleniPoradatele: number
    marketing: number
}

export const UNSUBSCRIBE_TYPES_SERIES = [
    'sdeleniOAkci',
    'sdeleniPoradatele',
    'marketing',
] as const

export const UNSUBSCRIBE_TYPES_CHART_CONFIG = {
    sdeleniOAkci: { label: 'Sdělení o akci', color: 'var(--chart-1)' },
    sdeleniPoradatele: {
        label: 'Sdělení pořadatele',
        color: 'var(--chart-2)',
    },
    marketing: { label: 'Marketing', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const UNSUBSCRIBE_TYPES = unsubscribeTypes as UnsubscribeTypePoint[]

export const UNSUBSCRIBE_TYPES_COLUMNS: SimpleTableColumn<UnsubscribeTypePoint>[] =
    [
        {
            id: 'label',
            header: 'Kategorie',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'sdeleniOAkci',
            header: 'Sdělení o akci',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.sdeleniOAkci),
        },
        {
            id: 'sdeleniPoradatele',
            header: 'Sdělení pořadatele',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.sdeleniPoradatele),
        },
        {
            id: 'marketing',
            header: 'Marketing',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.marketing),
        },
    ]

export const EMAIL_METRICS_STAGES = emailMetricsStages as EmailMetricStage[]

export const TOP_ACTIONS = topActions as TopActionRow[]

export const BEST_SEND_TIME_COLUMNS: SimpleTableColumn<BestSendPoint>[] = [
    {
        id: 'label',
        header: 'Čas',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'pocet',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.pocet),
    },
]

export const BEST_SEND_DAY_COLUMNS: SimpleTableColumn<BestSendPoint>[] = [
    {
        id: 'label',
        header: 'Den',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'pocet',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.pocet),
    },
]

export const EMAIL_METRICS_COLUMNS: SimpleTableColumn<EmailMetricStage>[] = [
    {
        id: 'label',
        header: 'Metrika',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'pocet',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.pocet),
    },
    {
        id: 'percent',
        header: 'Podíl',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => `${percentFormatter.format(row.percent)} %`,
    },
]

export const TOP_ACTIONS_COLUMNS: SimpleTableColumn<TopActionRow>[] = [
    {
        id: 'name',
        header: 'Akce',
        cellClassName: 'font-medium',
        cell: (row) => row.name,
    },
    {
        id: 'channel',
        header: 'Kanál',
        cell: (row) => row.channel,
    },
    {
        id: 'delivered',
        header: 'Doručeno',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.delivered),
    },
    {
        id: 'uniqueOpens',
        header: 'Unikátní otevření',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) =>
            row.channel === 'SMS' ? '—' : numberFormatter.format(row.uniqueOpens),
    },
    {
        id: 'openRate',
        header: 'Open rate',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) =>
            row.channel === 'SMS' ? '—' : `${percentFormatter.format(row.openRate)} %`,
    },
    {
        id: 'uniqueClicks',
        header: 'Unikátní proklik',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.uniqueClicks),
    },
    {
        id: 'ctr',
        header: 'CTR',
        headerClassName: 'text-right',
        cellClassName: 'text-right font-medium tabular-nums',
        cell: (row) => (row.ctr > 100 ? '—' : `${percentFormatter.format(row.ctr)} %`),
    },
]

export function formatExpertCount(value: number) {
    return numberFormatter.format(value)
}
