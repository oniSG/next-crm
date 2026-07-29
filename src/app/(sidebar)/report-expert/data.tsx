import type { ChartConfig } from '@/components/ui/chart'

import bestSendDay from './data/best-send-day.json'
import bestSendTime from './data/best-send-time.json'
import emailMetricsPie from './data/email-metrics-pie.json'
import emailMetricsStages from './data/email-metrics-stages.json'

export const BEST_SEND_TIME_SERIES = ['pocet'] as const

export const BEST_SEND_TIME_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_TIME_BY_SLOT = bestSendTime

export const BEST_SEND_DAY_SERIES = ['pocet'] as const

export const BEST_SEND_DAY_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const BEST_SEND_DAY_BY_WEEKDAY = bestSendDay

export const EMAIL_METRICS_PIE_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    unikatniOtevreni: { label: 'Unikátní otevření', color: 'var(--chart-2)' },
    unikatniProklik: { label: 'Unikátní proklik', color: 'var(--chart-3)' },
    odhlaseno: { label: 'Odhlášeno', color: 'var(--chart-4)' },
} satisfies ChartConfig

export const EMAIL_METRICS_PIE = emailMetricsPie
export const EMAIL_METRICS_STAGES = emailMetricsStages
