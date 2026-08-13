import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import InfoTooltip from '@/components/custom/other/info-tooltip'

import salesReportKpis from './data/sales-report-kpis.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const moneyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})
const moneyPreciseFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export type SalesReportKpis = {
    discountedTickets: number
    totalTickets: number
    totalDiscount: number
    averageDiscount: number
    revenue: number
    discountSharePercent: number
    users: number
    usersSharePercent: number
    teamsTotal: number
    teamsUsingDiscount: number
    teamsNotUsingDiscount: number
    csobDiscountsUsed: number
}

export const SALES_REPORT_KPIS_DATA = salesReportKpis[0] as SalesReportKpis

export function getSalesReportKpis(
    data: SalesReportKpis = SALES_REPORT_KPIS_DATA,
): Omit<KpiCardProps, 'className'>[] {
    return [
        {
            label: 'Zlevněné vstupenky',
            value: numberFormatter.format(data.discountedTickets),
            action: (
                <InfoTooltip>
                    Počet zlevněných vstupenek z celkového prodeje.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Z celkem prodaných',
                    value: numberFormatter.format(data.totalTickets),
                },
            ],
        },
        {
            label: 'Celková sleva',
            value: moneyFormatter.format(data.totalDiscount),
            action: (
                <InfoTooltip>Součet všech uplatněných slev na vstupenkách.</InfoTooltip>
            ),
            content: [
                {
                    label: 'Průměrná sleva / vstupenka',
                    value: moneyPreciseFormatter.format(data.averageDiscount),
                },
            ],
        },
        {
            label: 'Tržba vs. sleva',
            value: `${moneyFormatter.format(data.revenue)} / ${moneyFormatter.format(data.totalDiscount)}`,
            action: (
                <InfoTooltip>
                    Porovnání tržby a celkové slevy za vybrané období.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Podíl slevy z ceny před slevou',
                    value: `${percentFormatter.format(data.discountSharePercent)} %`,
                },
            ],
        },
        {
            label: 'Uživatelé',
            value: numberFormatter.format(data.users),
            action: (
                <InfoTooltip>
                    Počet uživatelů, kteří využili slevu na vstupenky.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Podíl fanouškovské databáze',
                    value: `${percentFormatter.format(data.usersSharePercent)} %`,
                },
            ],
        },
        {
            label: 'Týmy',
            value: numberFormatter.format(data.teamsTotal),
            action: (
                <InfoTooltip>
                    Počet týmů a podíl těch, které využívají slevu.
                </InfoTooltip>
            ),
            content: [
                {
                    label: 'Využívá slevu',
                    value: numberFormatter.format(data.teamsUsingDiscount),
                },
                {
                    label: 'Nevyužívá slevu',
                    value: numberFormatter.format(data.teamsNotUsingDiscount),
                },
            ],
        },
        {
            label: 'Počet využitých ČSOB slev',
            value: numberFormatter.format(data.csobDiscountsUsed),
            action: (
                <InfoTooltip>Počet uplatněných slev ČSOB ve vybraném období.</InfoTooltip>
            ),
        },
    ]
}
