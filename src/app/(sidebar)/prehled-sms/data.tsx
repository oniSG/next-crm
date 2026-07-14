import type { ChartConfig } from '@/components/ui/chart'

export const SMS_STATS_BY_MONTH = [
    { month: 'Led', doruceno: 3420, rozkliknuto: 820, nedoruceno: 145, odhlaseno: 38 },
    { month: 'Úno', doruceno: 3180, rozkliknuto: 740, nedoruceno: 132, odhlaseno: 42 },
    { month: 'Bře', doruceno: 3650, rozkliknuto: 910, nedoruceno: 158, odhlaseno: 35 },
    { month: 'Dub', doruceno: 3510, rozkliknuto: 860, nedoruceno: 141, odhlaseno: 40 },
    { month: 'Kvě', doruceno: 3890, rozkliknuto: 980, nedoruceno: 165, odhlaseno: 33 },
    { month: 'Čer', doruceno: 4120, rozkliknuto: 1050, nedoruceno: 172, odhlaseno: 36 },
    { month: 'Čvc', doruceno: 4380, rozkliknuto: 1120, nedoruceno: 188, odhlaseno: 31 },
]

export const SMS_STATS_CHART_CONFIG = {
    doruceno: { label: 'Doručeno', color: 'var(--chart-1)' },
    rozkliknuto: { label: 'Rozkliknuto', color: 'var(--chart-2)' },
    nedoruceno: { label: 'Nedoručeno', color: 'var(--chart-3)' },
    odhlaseno: { label: 'Odhlášeno', color: 'var(--chart-4)' },
} satisfies ChartConfig
