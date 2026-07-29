import type { ChartConfig } from '@/components/ui/chart'

export type Period = 'day' | 'month' | 'year'

export const PERIOD_OPTIONS = [
    { label: 'Den', value: 'day' },
    { label: 'Měsíc', value: 'month' },
    { label: 'Rok', value: 'year' },
] as const

export const EMAIL_REPORT_SERIES = [
    'doruceno',
    'unikatniOtevreni',
    'unikatniProklik',
    'nedoruceno',
    'odhlaseno',
    'hardBounce',
    'softBounce',
    'spam',
] as const

export const SMS_REPORT_SERIES = ['doruceno', 'nedoruceno'] as const
export const PUSH_REPORT_SERIES = ['doruceno', 'nedoruceno'] as const

export const EMAIL_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    unikatniOtevreni: { label: 'Unikátní otevření', color: 'var(--chart-2)' },
    unikatniProklik: { label: 'Unikátní proklik', color: 'var(--chart-3)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-4)' },
    odhlaseno: { label: 'Odhlášeno', color: 'oklch(0.65 0.2 35)' },
    hardBounce: { label: 'Hard bounce', color: 'oklch(0.65 0.12 200)' },
    softBounce: { label: 'Soft bounce', color: 'oklch(0.5 0.1 55)' },
    spam: { label: 'Spam', color: 'var(--destructive)' },
} satisfies ChartConfig

export const SMS_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const PUSH_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
} satisfies ChartConfig
