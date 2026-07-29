import type { ChartConfig } from '@/components/ui/chart'

import bestSendTime from './data/best-send-time.json'

export const BEST_SEND_TIME_SERIES = ['pocet'] as const

export const BEST_SEND_TIME_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_TIME_BY_SLOT = bestSendTime
