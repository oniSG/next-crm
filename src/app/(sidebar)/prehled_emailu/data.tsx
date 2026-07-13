import type { ChartConfig } from '@/components/ui/chart'

export const EMAIL_STATS_BY_MONTH = [
    { month: 'Led', doruceno: 8420, otevreno: 5120, kliknuto: 1240 },
    { month: 'Úno', doruceno: 7890, otevreno: 4680, kliknuto: 980 },
    { month: 'Bře', doruceno: 9150, otevreno: 5540, kliknuto: 1420 },
    { month: 'Dub', doruceno: 8720, otevreno: 5210, kliknuto: 1180 },
    { month: 'Kvě', doruceno: 9680, otevreno: 5980, kliknuto: 1560 },
    { month: 'Čer', doruceno: 10240, otevreno: 6340, kliknuto: 1720 },
    { month: 'Čvc', doruceno: 10890, otevreno: 6810, kliknuto: 1890 },
]

export const EMAIL_STATS_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    otevreno: { label: 'Otevřeno', color: 'var(--chart-2)' },
    kliknuto: { label: 'Kliknuto', color: 'var(--chart-3)' },
} satisfies ChartConfig
