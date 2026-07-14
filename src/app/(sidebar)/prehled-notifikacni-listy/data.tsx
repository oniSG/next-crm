import type { ChartConfig } from '@/components/ui/chart'

export const NOTIFIKACNI_LISTY_STATS_BY_MONTH = [
    { month: 'Led', doruceno: 4820 },
    { month: 'Úno', doruceno: 4390 },
    { month: 'Bře', doruceno: 5650 },
    { month: 'Dub', doruceno: 5120 },
    { month: 'Kvě', doruceno: 5980 },
    { month: 'Čer', doruceno: 6540 },
    { month: 'Čvc', doruceno: 7090 },
]

export const NOTIFIKACNI_LISTY_STATS_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
} satisfies ChartConfig
