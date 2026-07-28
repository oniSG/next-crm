import type { ChartConfig } from '@/components/ui/chart'

export type StatsChartType = 'pie' | 'bar' | 'line' | 'area' | 'radar' | 'labeledBar'

type StatsQuestionBase = {
    id: string
    question: string
    description: string
    chartType: StatsChartType
}

export type StatsQuestion =
    | (StatsQuestionBase & {
          chartType: 'pie'
          pieData: { name: string; value: number; fill: string }[]
          pieConfig: ChartConfig
      })
    | (StatsQuestionBase & {
          chartType: 'bar'
          barData: object[]
          barConfig: ChartConfig
          categoryKey: string
          series: string[]
          stacked?: boolean
      })
    | (StatsQuestionBase & {
          chartType: 'line'
          lineData: object[]
          lineConfig: ChartConfig
          categoryKey: string
          series: string[]
      })
    | (StatsQuestionBase & {
          chartType: 'area'
          areaData: object[]
          areaConfig: ChartConfig
          categoryKey: string
          series: string[]
      })
    | (StatsQuestionBase & {
          chartType: 'radar'
          radarData: object[]
          radarConfig: ChartConfig
          categoryKey: string
          series: string[]
      })
    | (StatsQuestionBase & {
          chartType: 'labeledBar'
          labeledBarData: object[]
          labeledBarConfig: ChartConfig
          categoryKey: string
          valueKey: string
      })

export const SURVEY_QUESTIONS: StatsQuestion[] = [
    {
        id: 'q1',
        question: 'Jaký komunikační kanál vám nejvíce vyhovuje?',
        description: 'Podíl preferovaných kanálů mezi respondenty.',
        chartType: 'pie',
        pieData: [
            { name: 'E-mail', value: 38, fill: 'var(--chart-1)' },
            { name: 'SMS', value: 24, fill: 'var(--chart-2)' },
            { name: 'Push', value: 18, fill: 'var(--chart-3)' },
            { name: 'Popup', value: 12, fill: 'var(--chart-4)' },
            { name: 'Notifikační lišty', value: 8, fill: 'var(--destructive)' },
        ],
        pieConfig: {
            value: { label: 'Podíl' },
            'E-mail': { label: 'E-mail', color: 'var(--chart-1)' },
            SMS: { label: 'SMS', color: 'var(--chart-2)' },
            Push: { label: 'Push', color: 'var(--chart-3)' },
            Popup: { label: 'Popup', color: 'var(--chart-4)' },
            'Notifikační lišty': {
                label: 'Notifikační lišty',
                color: 'var(--destructive)',
            },
        },
    },
    {
        id: 'q2',
        question: 'Jak hodnotíte celkovou spokojenost se službami klubu?',
        description: 'Rozložení hodnocení 1–5 hvězdiček.',
        chartType: 'bar',
        barData: [
            { stars: '1 ★', count: 48 },
            { stars: '2 ★', count: 72 },
            { stars: '3 ★', count: 156 },
            { stars: '4 ★', count: 312 },
            { stars: '5 ★', count: 428 },
        ],
        barConfig: {
            count: { label: 'Počet hodnocení', color: 'var(--chart-1)' },
        },
        categoryKey: 'stars',
        series: ['count'],
    },
    {
        id: 'q3',
        question: 'Jak často navštěvujete domácí zápasy v sezóně?',
        description: 'Průměrná návštěvnost podle měsíce.',
        chartType: 'line',
        lineData: [
            { month: 'Led', navstevy: 2.1 },
            { month: 'Úno', navstevy: 2.4 },
            { month: 'Bře', navstevy: 3.2 },
            { month: 'Dub', navstevy: 2.8 },
            { month: 'Kvě', navstevy: 3.6 },
            { month: 'Čer', navstevy: 1.2 },
            { month: 'Čvc', navstevy: 0.8 },
        ],
        lineConfig: {
            navstevy: { label: 'Zápasy / fanoušek', color: 'var(--chart-2)' },
        },
        categoryKey: 'month',
        series: ['navstevy'],
    },
    {
        id: 'q4',
        question: 'Jak se vyvíjí vaše zapojení ve věrnostním programu?',
        description: 'Nasbírané body a uplatněné odměny po měsících.',
        chartType: 'area',
        areaData: [
            { month: 'Led', nasbiraneBody: 420, odmeny: 180 },
            { month: 'Úno', nasbiraneBody: 510, odmeny: 210 },
            { month: 'Bře', nasbiraneBody: 630, odmeny: 260 },
            { month: 'Dub', nasbiraneBody: 580, odmeny: 240 },
            { month: 'Kvě', nasbiraneBody: 740, odmeny: 310 },
            { month: 'Čer', nasbiraneBody: 890, odmeny: 380 },
            { month: 'Čvc', nasbiraneBody: 1020, odmeny: 450 },
        ],
        areaConfig: {
            nasbiraneBody: { label: 'Nasbírané body', color: 'var(--chart-1)' },
            odmeny: { label: 'Uplatněné odměny', color: 'var(--chart-3)' },
        },
        categoryKey: 'month',
        series: ['nasbiraneBody', 'odmeny'],
    },
    {
        id: 'q5',
        question: 'V jakých oblastech jsme podle vás nejsilnější?',
        description: 'Hodnocení klíčových oblastí oproti očekávání fanoušků.',
        chartType: 'radar',
        radarData: [
            { oblast: 'Atmosféra', klub: 92, ocekavani: 80 },
            { oblast: 'Občerstvení', klub: 68, ocekavani: 75 },
            { oblast: 'Vstupenky', klub: 85, ocekavani: 78 },
            { oblast: 'E-shop', klub: 72, ocekavani: 70 },
            { oblast: 'Komunikace', klub: 88, ocekavani: 82 },
            { oblast: 'Parkování', klub: 55, ocekavani: 65 },
        ],
        radarConfig: {
            klub: { label: 'Náš klub', color: 'var(--chart-1)' },
            ocekavani: { label: 'Očekávání', color: 'var(--chart-2)' },
        },
        categoryKey: 'oblast',
        series: ['klub', 'ocekavani'],
    },
    {
        id: 'q6',
        question: 'Které kategorie merchandisingu vás nejvíce zajímají?',
        description: 'Počet projevů zájmu za posledních 30 dní.',
        chartType: 'labeledBar',
        labeledBarData: [
            { kategorie: 'Dresy', zajem: 1240 },
            { kategorie: 'Šály', zajem: 890 },
            { kategorie: 'Čepice', zajem: 620 },
            { kategorie: 'Mikiny', zajem: 980 },
            { kategorie: 'Doplňky', zajem: 450 },
        ],
        labeledBarConfig: {
            zajem: { label: 'Zájem', color: 'var(--chart-4)' },
        },
        categoryKey: 'kategorie',
        valueKey: 'zajem',
    },
]
