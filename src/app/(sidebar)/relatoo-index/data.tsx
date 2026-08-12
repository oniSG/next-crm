import type { KpiCardProps } from '@/components/custom/statistics/kpi-card'
import type { SankeyChartData } from '@/components/custom/statistics/sankey-chart'
import type { SimpleTableColumn } from '@/components/custom/statistics/simple-table'
import InfoSheet from '@/components/custom/other/info-sheet'
import type { ChartConfig } from '@/components/ui/chart'

import bestSendDay from './data/best-send-day.json'
import bestSendTime from './data/best-send-time.json'
import emailFunnelFlow from './data/email-funnel-flow.json'
import topActions from './data/top-actions.json'
import unsubscribeTypes from './data/unsubscribe-types.json'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const percentFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

const RELATOO_INDEX_INFO = (
    <>
        <p>
            Relatoo Index měří „CRM zralost“ klubu za posledních 30 dní — čím více a
            rozmanitěji klub komunikuje, automatizuje a úspěšně láká fanoušky na své
            události, tím vyššího indexu dosahuje. Změna vůči minulému období pak
            ukazuje trend rozvoje práce se systémem.
        </p>
        <p>Vstupní datové bloky z logovacích tabulek:</p>
        <ol>
            <li>
                Spočítá celkový počet aktivních fanoušků pro daný klub, to je základ
                pro normalizaci všech poměrů.
            </li>
            <li>
                Porovná se posledních 30 dnů s předchozím obdobím v následujících
                metrikách:
                <ul>
                    <li>
                        součet odeslaných e-mailů, push notifikací a SMS na 1000
                        návštěvníků
                    </li>
                    <li>
                        průměrný počet vstupů na jednu událost na 1000 fanoušků
                    </li>
                    <li>počet otevřených dotazníků</li>
                    <li>
                        průměrný počet aktivovaných akcí (automatizací) z e-mailů s
                        vyplněným spouštěčem na jeden den
                    </li>
                </ul>
            </li>
            <li>
                Z těchto metrik se skládá výsledná hodnota pomocí váženého
                logaritmického vzorce, přičemž jsou určeny váhy jednotlivých metrik:
                <ul>
                    <li>Odeslané zprávy = 40 %</li>
                    <li>Počet průchodů = 40 %</li>
                    <li>Počet dotazníků = 10 %</li>
                    <li>Akce / den = 10 %</li>
                </ul>
            </li>
            <li>
                Porovnají se jednotlivá období a spočítají se absolutní a procentuální
                změny, které se zařadí do trendu a přiřadí se k nim slovní kategorie
                výkonu:
                <ul>
                    <li>Výborný {'>= 6.0'}</li>
                    <li>Velmi dobrý {'>= 4.5'}</li>
                    <li>Dobrý {'>= 3.5'}</li>
                    <li>Průměrný {'>= 2.5'}</li>
                    <li>Pod průměrem {'< 2.5'}</li>
                </ul>
            </li>
        </ol>
        <p>
            Použití logaritmu zajišťuje, že vysoké objemy aktivit (např. 10 000
            odeslaných e-mailů) nezvyšují skóre lineárně, ale s postupně klesajícím
            přínosem. Díky tomu se více oceňuje pravidelná a vyvážená aktivita než
            samotná kvantita a zároveň se tím vyrovnávají rozdíly ve velikosti databází
            jednotlivých klubů.
        </p>
        <p>Relatoo Index tedy kombinuje:</p>
        <ul>
            <li>jak aktivní je klub v kampaních,</li>
            <li>jak využívá automatizace,</li>
            <li>jak úspěšně láká své fanoušky na akce,</li>
            <li>a jak často komunikuje s fanoušky.</li>
        </ul>
    </>
)

export const RELATOO_INDEX_KPIS: Omit<KpiCardProps, 'className'>[] = [
    {
        label: 'Relatoo index',
        value: '3,63',
        content: [{ label: 'Pořadí mezi tenanty', value: '14' }],
        trend: {
            direction: 'up',
            delta: '+0,59',
            hint: 'změna indexu za posledních 30 dní',
        },
        action: (
            <InfoSheet title="Relatoo index">{RELATOO_INDEX_INFO}</InfoSheet>
        ),
    },
    {
        label: 'Stav',
        value: 'Dobrý',
        action: <InfoSheet title="Stav">{RELATOO_INDEX_INFO}</InfoSheet>,
    },
    {
        label: 'Proměnné',
        content: [
            { label: 'Události', value: '4' },
            { label: 'Počet akcí', value: '19' },
            { label: 'Počet dotazníků', value: '0' },
            { label: 'Vstupy', value: '0' },
        ],
        action: <InfoSheet title="Proměnné">{RELATOO_INDEX_INFO}</InfoSheet>,
    },
]

export type BestSendPoint = {
    label: string
    pocet: number
}

export type TopActionRow = {
    id: string
    name: string
    channel: string
    delivered: number
    uniqueOpens: number
    openRate: number
    uniqueClicks: number
    ctr: number
}

export const BEST_SEND_TIME_SERIES = ['pocet'] as const

export const BEST_SEND_TIME_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_TIME_BY_SLOT = bestSendTime as BestSendPoint[]

export const BEST_SEND_DAY_SERIES = ['pocet'] as const

export const BEST_SEND_DAY_CHART_CONFIG = {
    pocet: { label: 'Počet', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const BEST_SEND_DAY_BY_WEEKDAY = bestSendDay as BestSendPoint[]

export const EMAIL_FUNNEL_FLOW = emailFunnelFlow as SankeyChartData

export type UnsubscribeTypePoint = {
    label: string
    sdeleniOAkci: number
    sdeleniPoradatele: number
    marketing: number
}

export const UNSUBSCRIBE_TYPES_SERIES = [
    'sdeleniOAkci',
    'sdeleniPoradatele',
    'marketing',
] as const

export const UNSUBSCRIBE_TYPES_CHART_CONFIG = {
    sdeleniOAkci: { label: 'Sdělení o akci', color: 'var(--chart-1)' },
    sdeleniPoradatele: {
        label: 'Sdělení pořadatele',
        color: 'var(--chart-2)',
    },
    marketing: { label: 'Marketing', color: 'var(--chart-3)' },
} satisfies ChartConfig

export const UNSUBSCRIBE_TYPES = unsubscribeTypes as UnsubscribeTypePoint[]

export const UNSUBSCRIBE_TYPES_COLUMNS: SimpleTableColumn<UnsubscribeTypePoint>[] =
    [
        {
            id: 'label',
            header: 'Kategorie',
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        {
            id: 'sdeleniOAkci',
            header: 'Sdělení o akci',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.sdeleniOAkci),
        },
        {
            id: 'sdeleniPoradatele',
            header: 'Sdělení pořadatele',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.sdeleniPoradatele),
        },
        {
            id: 'marketing',
            header: 'Marketing',
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row) => numberFormatter.format(row.marketing),
        },
    ]

export const TOP_ACTIONS = topActions as TopActionRow[]

export const BEST_SEND_TIME_COLUMNS: SimpleTableColumn<BestSendPoint>[] = [
    {
        id: 'label',
        header: 'Čas',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'pocet',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.pocet),
    },
]

export const BEST_SEND_DAY_COLUMNS: SimpleTableColumn<BestSendPoint>[] = [
    {
        id: 'label',
        header: 'Den',
        cellClassName: 'font-medium',
        cell: (row) => row.label,
    },
    {
        id: 'pocet',
        header: 'Počet',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.pocet),
    },
]

export const TOP_ACTIONS_COLUMNS: SimpleTableColumn<TopActionRow>[] = [
    {
        id: 'name',
        header: 'Akce',
        cellClassName: 'font-medium',
        cell: (row) => row.name,
    },
    {
        id: 'channel',
        header: 'Kanál',
        cell: (row) => row.channel,
    },
    {
        id: 'delivered',
        header: 'Doručeno',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.delivered),
    },
    {
        id: 'uniqueOpens',
        header: 'Unikátní otevření',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) =>
            row.channel === 'SMS' ? '—' : numberFormatter.format(row.uniqueOpens),
    },
    {
        id: 'openRate',
        header: 'Open rate',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) =>
            row.channel === 'SMS' ? '—' : `${percentFormatter.format(row.openRate)} %`,
    },
    {
        id: 'uniqueClicks',
        header: 'Unikátní proklik',
        headerClassName: 'text-right',
        cellClassName: 'text-right tabular-nums',
        cell: (row) => numberFormatter.format(row.uniqueClicks),
    },
    {
        id: 'ctr',
        header: 'CTR',
        headerClassName: 'text-right',
        cellClassName: 'text-right font-medium tabular-nums',
        cell: (row) => (row.ctr > 100 ? '—' : `${percentFormatter.format(row.ctr)} %`),
    },
]

export function formatExpertCount(value: number) {
    return numberFormatter.format(value)
}
