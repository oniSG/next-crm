import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import InfoTooltip from '@/components/custom/other/info-tooltip'

export const RELATOO_INDEX_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Relatoo index',
        value: '3,63',
        content: [
            { label: 'Pořadí mezi tenanty', value: '14' },
        ],
        trend: {
            direction: 'up',
            delta: '+0,59',
            hint: 'změna indexu',
        },
        action: (
            <InfoTooltip>
                Aktuální Relatoo index oproti předchozímu období, včetně změny a
                pořadí mezi tenanty.
            </InfoTooltip>
        ),
    },
    {
        label: 'Stav',
        value: 'Dobrý',
        action: (
            <InfoTooltip>
                Aktuální stav Relatoo indexu oproti předchozímu období.
            </InfoTooltip>
        ),
    },
    {
        label: 'Proměnné',
        content: [
            { label: 'Události', value: '4' },
            { label: 'Počet akcí', value: '19' },
            { label: 'Počet dotazníků', value: '0' },
            { label: 'Vstupy', value: '0' },
        ],
        action: (
            <InfoTooltip>
                Proměnné vstupující do výpočtu Relatoo indexu — události, akce,
                dotazníky a vstupy.
            </InfoTooltip>
        ),
    },
]
