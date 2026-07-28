import type { ChartConfig } from '@/components/ui/chart'

export const GLOBAL_REPORT_BY_MONTH = [
    {
        month: 'Led',
        doruceno: 8420,
        unikatniOtevreni: 5120,
        unikatniProklik: 1240,
        nedoruceno: 320,
        odhlaseno: 85,
        hardBounce: 72,
        softBounce: 205,
        spam: 18,
    },
    {
        month: 'Úno',
        doruceno: 7890,
        unikatniOtevreni: 4680,
        unikatniProklik: 980,
        nedoruceno: 290,
        odhlaseno: 92,
        hardBounce: 65,
        softBounce: 178,
        spam: 24,
    },
    {
        month: 'Bře',
        doruceno: 9150,
        unikatniOtevreni: 5540,
        unikatniProklik: 1420,
        nedoruceno: 340,
        odhlaseno: 78,
        hardBounce: 88,
        softBounce: 192,
        spam: 31,
    },
    {
        month: 'Dub',
        doruceno: 8720,
        unikatniOtevreni: 5210,
        unikatniProklik: 1180,
        nedoruceno: 310,
        odhlaseno: 105,
        hardBounce: 81,
        softBounce: 167,
        spam: 15,
    },
    {
        month: 'Kvě',
        doruceno: 9680,
        unikatniOtevreni: 5980,
        unikatniProklik: 1560,
        nedoruceno: 365,
        odhlaseno: 68,
        hardBounce: 95,
        softBounce: 218,
        spam: 42,
    },
    {
        month: 'Čer',
        doruceno: 10240,
        unikatniOtevreni: 6340,
        unikatniProklik: 1720,
        nedoruceno: 385,
        odhlaseno: 112,
        hardBounce: 102,
        softBounce: 241,
        spam: 28,
    },
    {
        month: 'Čvc',
        doruceno: 10890,
        unikatniOtevreni: 6810,
        unikatniProklik: 1890,
        nedoruceno: 410,
        odhlaseno: 95,
        hardBounce: 118,
        softBounce: 205,
        spam: 36,
    },
]

export const GLOBAL_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    unikatniOtevreni: { label: 'Unikátní otevření', color: 'var(--chart-2)' },
    unikatniProklik: { label: 'Unikátní proklik', color: 'var(--chart-3)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-4)' },
    odhlaseno: { label: 'Odhlášeno', color: 'oklch(0.65 0.2 35)' },
    hardBounce: { label: 'Hard bounce', color: 'oklch(0.65 0.12 200)' },
    softBounce: { label: 'Soft bounce', color: 'oklch(0.5 0.1 55)' },
    spam: { label: 'Spam', color: 'var(--destructive)' },
} satisfies ChartConfig

export const GLOBAL_REPORT_SERIES = [
    'doruceno',
    'unikatniOtevreni',
    'unikatniProklik',
    'nedoruceno',
    'odhlaseno',
    'hardBounce',
    'softBounce',
    'spam',
] as const

export const SMS_REPORT_BY_MONTH = [
    { month: 'Led', doruceno: 4210, nedoruceno: 186 },
    { month: 'Úno', doruceno: 3980, nedoruceno: 172 },
    { month: 'Bře', doruceno: 4520, nedoruceno: 198 },
    { month: 'Dub', doruceno: 4380, nedoruceno: 181 },
    { month: 'Kvě', doruceno: 4760, nedoruceno: 205 },
    { month: 'Čer', doruceno: 5010, nedoruceno: 219 },
    { month: 'Čvc', doruceno: 5240, nedoruceno: 231 },
]

export const SMS_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const SMS_REPORT_SERIES = ['doruceno', 'nedoruceno'] as const

export const PUSH_REPORT_BY_MONTH = [
    { month: 'Led', doruceno: 12420, nedoruceno: 380 },
    { month: 'Úno', doruceno: 11890, nedoruceno: 345 },
    { month: 'Bře', doruceno: 13150, nedoruceno: 410 },
    { month: 'Dub', doruceno: 12720, nedoruceno: 392 },
    { month: 'Kvě', doruceno: 13680, nedoruceno: 428 },
    { month: 'Čer', doruceno: 14240, nedoruceno: 445 },
    { month: 'Čvc', doruceno: 14890, nedoruceno: 462 },
]

export const PUSH_REPORT_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const PUSH_REPORT_SERIES = ['doruceno', 'nedoruceno'] as const
