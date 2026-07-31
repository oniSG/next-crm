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
        getTooltip: (percent) =>
            `${percent} uživatelů není přihlášeno.`,
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
        getTooltip: (percent) =>
            `${percent} uživatelů má neplatný e-mail.`,
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
        getTooltip: (percent) =>
            `${percent} uživatelů nemá vyplněné datum narození.`,
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
        getTooltip: (percent) =>
            `${percent} uživatelů nemá vyplněné příjmení.`,
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
        getTooltip: (percent) =>
            `${percent} uživatelů nemá vyplněné jméno.`,
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
        getTooltip: (percent) =>
            `${percent} uživatelů nemá vyplněný telefon.`,
        trend: {
            direction: 'up',
            delta: '+0,3 %',
            hint: 'za poslední měsíc',
        },
    },
]
