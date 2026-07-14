import type { ChartConfig } from '@/components/ui/chart'

export const BODY_BY_MONTH = [
    { month: 'Led', pocetBodu: 12450 },
    { month: 'Úno', pocetBodu: 13820 },
    { month: 'Bře', pocetBodu: 15180 },
    { month: 'Dub', pocetBodu: 14620 },
    { month: 'Kvě', pocetBodu: 16340 },
    { month: 'Čer', pocetBodu: 17890 },
    { month: 'Čvc', pocetBodu: 19210 },
]

export const BODY_CHART_CONFIG = {
    pocetBodu: { label: 'Počet bodů', color: 'var(--chart-1)' },
} satisfies ChartConfig
