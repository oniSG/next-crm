import type { ChartConfig } from '@/components/ui/chart'

export const FUNNEL_CHART_DATA = [
    { name: 'impression', value: 100, fill: 'var(--color-impression)' },
    { name: 'click', value: 80, fill: 'var(--color-click)' },
    { name: 'visit', value: 50, fill: 'var(--color-visit)' },
    { name: 'consult', value: 30, fill: 'var(--color-consult)' },
    { name: 'order', value: 15, fill: 'var(--color-order)' },
]

export const FUNNEL_CHART_CONFIG = {
    impression: { label: 'Impression', color: 'var(--chart-1)' },
    click: { label: 'Click', color: 'var(--chart-2)' },
    visit: { label: 'Visit', color: 'var(--chart-3)' },
    consult: { label: 'Consult', color: 'var(--chart-4)' },
    order: { label: 'Order', color: 'var(--chart-5)' },
} satisfies ChartConfig
