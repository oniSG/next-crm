import type { ChartConfig } from '@/components/ui/chart'

export const PUSH_STATS_BY_MONTH = [
    { month: 'Led', doruceno: 12420, nedoruceno: 380 },
    { month: 'Úno', doruceno: 11890, nedoruceno: 345 },
    { month: 'Bře', doruceno: 13150, nedoruceno: 410 },
    { month: 'Dub', doruceno: 12720, nedoruceno: 392 },
    { month: 'Kvě', doruceno: 13680, nedoruceno: 428 },
    { month: 'Čer', doruceno: 14240, nedoruceno: 445 },
    { month: 'Čvc', doruceno: 14890, nedoruceno: 462 },
]

export const PUSH_STATS_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
} satisfies ChartConfig
