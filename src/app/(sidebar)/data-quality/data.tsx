import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'

export const DATA_QUALITY_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Neaktivní fanoušci',
        content: [
            { label: 'Počet', value: '252 077' },
            { label: 'Procenta', value: '44,01%' },
        ],
        trend: {
            direction: 'down',
            delta: '-1,2 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        label: 'Neplatné e-maily',
        content: [
            { label: 'Počet', value: '51' },
            { label: 'Procenta', value: '0,01%' },
        ],
        trend: {
            direction: 'down',
            delta: '-0,01 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        label: 'Chybí datum narození',
        content: [
            { label: 'Počet', value: '118 257' },
            { label: 'Procenta', value: '20,65%' },
        ],
        trend: {
            direction: 'up',
            delta: '+0,4 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        label: 'Chybí příjmení',
        content: [
            { label: 'Počet', value: '1 842' },
            { label: 'Procenta', value: '0,32%' },
        ],
        trend: {
            direction: 'down',
            delta: '-0,05 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        label: 'Chybí jméno',
        content: [
            { label: 'Počet', value: '2 156' },
            { label: 'Procenta', value: '0,38%' },
        ],
        trend: {
            direction: 'down',
            delta: '-0,08 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        label: 'Chybí telefon',
        content: [
            { label: 'Počet', value: '543 587' },
            { label: 'Procenta', value: '94,9%' },
        ],
        trend: {
            direction: 'up',
            delta: '+0,3 %',
            hint: 'za poslední měsíc',
        },
    },
]
