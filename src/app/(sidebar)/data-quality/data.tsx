import type { KpiTrend } from '@/components/custom/statistics/kpi-card'

export type DataQualityKpi = {
    id: string
    label: string
    percent: string
    count: string
    countLabel: string
    getTooltip: (percent: string) => string
    trend: KpiTrend
}

export const DATA_QUALITY_KPIS: DataQualityKpi[] = [
    {
        id: 'inactive-fans',
        label: 'Neaktivní fanoušci',
        percent: '44,01%',
        count: '252 077',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, kteří za posledních 90 dní nevykazovali žádnou aktivitu.',
        trend: {
            direction: 'down',
            delta: '-1,2 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        id: 'invalid-emails',
        label: 'Neplatné e-maily',
        percent: '0,01%',
        count: '51',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, jejich e-mailové adresy v databázi jsou neplatné (hard bounce při odeslání zprávy).',
        trend: {
            direction: 'down',
            delta: '-0,01 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        id: 'missing-birthdate',
        label: 'Chybí datum narození',
        percent: '20,65%',
        count: '118 257',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, u kterých v databázi chybí datum narození.',
        trend: {
            direction: 'up',
            delta: '+0,4 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        id: 'missing-surname',
        label: 'Chybí příjmení',
        percent: '0,32%',
        count: '1 842',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, kterým v databázi chybí příjmení.',
        trend: {
            direction: 'down',
            delta: '-0,05 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        id: 'missing-firstname',
        label: 'Chybí jméno',
        percent: '0,38%',
        count: '2 156',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, kterým v databázi chybí křestní jméno.',
        trend: {
            direction: 'down',
            delta: '-0,08 %',
            hint: 'za poslední měsíc',
        },
    },
    {
        id: 'missing-phone',
        label: 'Chybí telefon',
        percent: '94,9%',
        count: '543 587',
        countLabel: 'Počet',
        getTooltip: () =>
            'Počet fanoušků, u kterých v databázi chybí telefonní číslo.',
        trend: {
            direction: 'up',
            delta: '+0,3 %',
            hint: 'za poslední měsíc',
        },
    },
]
