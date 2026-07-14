import type { ChartConfig } from '@/components/ui/chart'

export const POPUP_STATS_BY_MONTH = [
    { month: 'Led', doruceno: 5420 },
    { month: 'Úno', doruceno: 4890 },
    { month: 'Bře', doruceno: 6150 },
    { month: 'Dub', doruceno: 5720 },
    { month: 'Kvě', doruceno: 6680 },
    { month: 'Čer', doruceno: 7240 },
    { month: 'Čvc', doruceno: 7890 },
]

export const POPUP_STATS_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
} satisfies ChartConfig
