import type { ChartConfig } from '@/components/ui/chart'

import emailReportByDay from './data/email-report-by-day.json'
import pushReportByDay from './data/push-report-by-day.json'
import smsReportByDay from './data/sms-report-by-day.json'

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
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-5)' },
    odhlaseno: { label: 'Odhlášeno', color: 'var(--chart-4)' },
    hardBounce: { label: 'Hard bounce', color: 'var(--chart-5)' },
    softBounce: { label: 'Soft bounce', color: 'var(--chart-5)' },
    spam: { label: 'Spam', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const SMS_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const PUSH_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const EMAIL_REPORT_BY_DAY = emailReportByDay
export const SMS_REPORT_BY_DAY = smsReportByDay
export const PUSH_REPORT_BY_DAY = pushReportByDay
