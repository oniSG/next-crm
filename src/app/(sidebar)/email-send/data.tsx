import type { ChartConfig } from '@/components/ui/chart'

export const CLICK_RATE_BY_DAY = [
    { day: 'Po', miraProkliku: 2.4 },
    { day: 'Út', miraProkliku: 3.1 },
    { day: 'St', miraProkliku: 3.7 },
    { day: 'Čt', miraProkliku: 3.5 },
    { day: 'Pá', miraProkliku: 2.9 },
    { day: 'So', miraProkliku: 1.8 },
    { day: 'Ne', miraProkliku: 1.5 },
]

export const CLICK_RATE_CHART_CONFIG = {
    miraProkliku: { label: 'Míra prokliků', color: 'var(--chart-1)' },
} satisfies ChartConfig
