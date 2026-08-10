import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import type { ChartConfig } from '@/components/ui/chart'

import bestSendDay from './data/best-send-day.json'
import bestSendTime from './data/best-send-time.json'
import emailMetricsPie from './data/email-metrics-pie.json'
import emailMetricsStages from './data/email-metrics-stages.json'

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
            hint: 'změna indexu',
        },
        action: (
            <InfoTooltip>
                Aktuální Relatoo index oproti předchozímu období, včetně změny a
                pořadí mezi tenanty.
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
                Proměnné vstupující do výpočtu Relatoo indexu — události, akce,
                dotazníky a vstupy.
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

export const BEST_SEND_TIME_SERIES = ['pocet'] as const

export const BEST_SEND_TIME_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_TIME_BY_SLOT = bestSendTime as BestSendPoint[]

export const BEST_SEND_DAY_SERIES = ['pocet'] as const

export const BEST_SEND_DAY_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const BEST_SEND_DAY_BY_WEEKDAY = bestSendDay as BestSendPoint[]

export const EMAIL_METRICS_PIE_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    unikatniOtevreni: { label: 'Unikátní otevření', color: 'var(--chart-2)' },
    unikatniProklik: { label: 'Unikátní proklik', color: 'var(--chart-3)' },
    odhlaseno: { label: 'Odhlášeno', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const EMAIL_METRICS_PIE = emailMetricsPie as {
    name: string
    value: number
    fill: string
}[]

export const EMAIL_METRICS_STAGES = emailMetricsStages as EmailMetricStage[]

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

export function formatExpertCount(value: number) {
    return numberFormatter.format(value)
}
