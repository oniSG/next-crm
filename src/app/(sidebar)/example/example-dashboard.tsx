'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
    ChartColumnIcon,
    CircleDollarSignIcon,
    MailIcon,
    TableIcon,
    TicketCheckIcon,
    UsersIcon,
} from 'lucide-react'

import { AreaChart } from '@/components/custom/statistics/area-chart'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { Heatmap } from '@/components/custom/statistics/heatmap'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LabeledBarChart } from '@/components/custom/statistics/labeled-bar-chart'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { NegativeBarChart } from '@/components/custom/statistics/negative-bar-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import InfoSheet from '@/components/custom/other/info-sheet'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import {
    CATEGORY_CHART_CONFIG,
    CATEGORY_TABLE_COLUMNS,
    CAMPAIGN_TABLE_COLUMNS,
    FUNNEL_FLOW_TABLE_COLUMNS,
    HEATMAP_TABLE_COLUMNS,
    KPI_DETAIL_ROWS,
    MRR_CHART_CONFIG,
    MRR_TABLE_COLUMNS,
    NET_INCOME_CHART_CONFIG,
    NET_INCOME_TABLE_COLUMNS,
    REVENUE_CHART_CONFIG,
    REVENUE_STACKED_CHART_CONFIG,
    REVENUE_TABLE_COLUMNS,
    SESSIONS_CHART_CONFIG,
    SESSIONS_TABLE_COLUMNS,
    VISITORS_CHART_CONFIG,
    VISITORS_TABLE_COLUMNS,
    VISITS_CHART_CONFIG,
    VISITS_TABLE_COLUMNS,
} from './data'
import { getExampleDashboardData } from './filter-data'
import { useExampleFilters } from './use-example-filters'

function chartTableTabs(chart: ReactNode, table: ReactNode): GraphCardTab[] {
    return [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: chart,
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: table,
        },
    ]
}

export function ExampleDashboard() {
    const { dateRange, segment, teams, channels, regions } = useExampleFilters()

    const data = useMemo(
        () =>
            getExampleDashboardData({
                dateRange,
                segment,
                teams,
                channels,
                regions,
            }),
        [dateRange, segment, teams, channels, regions],
    )

    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Ukazkový dashboard"
                description="Ukázka komponent pro custom dashboard."
            />

            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                aria-label="Varianty KPI karet"
            >
                <KpiCard label="Kartička s hodnotou" value={data.kpis.totalVisitors} />

                <KpiCard
                    label="Kartička s hodnotou a trendem"
                    value={data.kpis.totalRevenue}
                    trend={{
                        direction: 'up',
                        delta: '+10,1 %',
                        hint: 'oproti minulému měsíci',
                    }}
                />

                <KpiCard
                    label="Kartička s hodnotou a trendem"
                    value={data.kpis.openRate}
                    trend={{
                        direction: 'down',
                        delta: '−0,34 %',
                        hint: 'oproti minulému měsíci',
                    }}
                />

                <KpiCard
                    label="Kartička s hodnotou a tooltipem"
                    value={data.kpis.openRate}
                    action={
                        <InfoTooltip>
                            `action` — typicky InfoTooltip nebo InfoSheet. Hodnota reaguje
                            na filtry.
                        </InfoTooltip>
                    }
                />

                <KpiCard
                    label="Kartička s hodnotou a ikonou"
                    value={data.kpis.totalSessions}
                    icon={<UsersIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                />

                <KpiCard
                    label="Kartička s hodnotou a metrikou"
                    value={data.kpis.openRate}
                    metric={{
                        label: 'Odesláno',
                        value: data.kpis.campaignSent,
                    }}
                />

                <KpiCard label="Kartička s contentem" content={KPI_DETAIL_ROWS} />

                <KpiCard
                    label="Kartička s contentem a trendem"
                    content={[
                        { label: 'Příjem', value: '320 000 Kč' },
                        { label: 'Kusů', value: '1 240' },
                    ]}
                    trend={{
                        direction: 'up',
                        delta: '+180',
                        hint: 'návštěvníků',
                    }}
                />

                <KpiCard
                    label="Kartička s contentem a ikonou"
                    icon={<MailIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    content={KPI_DETAIL_ROWS}
                    action={
                        <InfoTooltip>
                            Content bez velké hodnoty — seznam řádků.
                        </InfoTooltip>
                    }
                />

                <KpiCard
                    label="Kartička s hodnotou a contentem"
                    value="12 450"
                    content={[{ label: 'Z celkem prodaných', value: '48 200' }]}
                    action={
                        <InfoTooltip>
                            Velká hodnota nahoře, detaily v `content` pod oddělovačem.
                        </InfoTooltip>
                    }
                />

                <KpiCard
                    label="Kartička s hodnotou, contentem a trendem"
                    value="3,63"
                    content={[{ label: 'Pořadí mezi tenanty', value: '14' }]}
                    trend={{
                        direction: 'up',
                        delta: '+0,59',
                        hint: 'za posledních 30 dní',
                    }}
                    action={
                        <InfoSheet>
                            <h2>Kartička s hodnotou, contentem a trendem</h2>
                            <p>
                                Kombinace jako u Relatoo indexu — hlavní číslo, jeden
                                detail a footer s trendem.
                            </p>
                        </InfoSheet>
                    }
                />

                <KpiCard
                    label="Kartička s hodnotou, metrikou a contentem"
                    value="72,5 %"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    metric={{ label: 'Počet', value: '6 840' }}
                    content={[
                        { label: 'Paid', value: '5 120' },
                        { label: 'Free', value: '1 720' },
                    ]}
                />

                <KpiCard
                    label="Kartička s hodnotou, metrikou a trendem"
                    value="214 500 Kč"
                    icon={<CircleDollarSignIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    metric={{ label: 'Ø lístek', value: '480 Kč' }}
                    trend={{
                        direction: 'up',
                        delta: '+8,2 %',
                        hint: 'oproti minulé akci',
                    }}
                />

                <KpiCard
                    label="Kartička s hodnotou, ikonou, metrikou, contentem a trendem"
                    value="9 180"
                    icon={<UsersIcon className="size-4" />}
                    iconClassName="bg-chart-3/10 text-chart-3"
                    metric={{ label: 'Cíl', value: '10 000' }}
                    content={[
                        { label: 'Noví', value: '1 240' },
                        { label: 'Vracející se', value: '7 940' },
                    ]}
                    trend={{
                        direction: 'down',
                        delta: '−1,2 %',
                        hint: 'oproti minulému měsíci',
                    }}
                    action={
                        <InfoTooltip>
                            Ikona + value + metric + content + trend + action.
                        </InfoTooltip>
                    }
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <DataVisulaizationCard
                    title="Sloupcový graf"
                    description="Více sérií, svislá orientace."
                    className="lg:col-span-2"
                    queryKey="example-revenue-trend"
                    action={
                        <InfoSheet>
                            <h2>Sloupcový graf</h2>
                            <p>
                                Základní BarChart s více sériemi. InfoSheet slouží k
                                delšímu vysvětlení metriky.
                            </p>
                        </InfoSheet>
                    }
                    tableExportable={{
                        filename: 'example-trendy-trzeb',
                        headers: ['Měsíc', 'Desktop', 'Mobil', 'Celkem'],
                        rows: data.revenueTableRows.map((row) => [
                            row.month,
                            row.desktop,
                            row.mobile,
                            row.total,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <BarChart
                            data={data.revenueByMonth}
                            config={REVENUE_CHART_CONFIG}
                            categoryKey="month"
                            series={['desktop', 'mobile']}
                            legendQueryKey="example-revenue-trend-muted"
                        />,
                        <SimpleTable
                            data={data.revenueTableRows}
                            columns={REVENUE_TABLE_COLUMNS}
                            getRowKey={(row) => row.month}
                        />,
                    )}
                />
                <DataVisulaizationCard
                    title="Koláčový graf"
                    description="Podíl kategorií."
                    queryKey="example-customer-segments"
                    tableExportable={{
                        filename: 'example-podil-kategorii',
                        headers: ['Segment', 'Podíl %'],
                        rows: data.categoryShare.map((row) => [row.name, row.value]),
                    }}
                    tabs={chartTableTabs(
                        <PieChart
                            data={data.categoryShare}
                            config={CATEGORY_CHART_CONFIG}
                        />,
                        <SimpleTable
                            data={data.categoryShare}
                            columns={CATEGORY_TABLE_COLUMNS}
                            getRowKey={(row) => row.name}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Čárový graf + průměr"
                    description="showAverage vykreslí šedou přerušovanou linii."
                    queryKey="example-weekly-traffic"
                    tableExportable={{
                        filename: 'example-tydenni-navstevnost',
                        headers: ['Den', 'Návštěvy', 'Registrace'],
                        rows: data.visitsByDay.map((row) => [
                            row.day,
                            row.visits,
                            row.signups,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <LineChart
                            data={data.visitsByDay}
                            config={VISITS_CHART_CONFIG}
                            categoryKey="day"
                            series={['visits', 'signups']}
                            showAverage
                            showDots
                            showYAxis
                            legendQueryKey="example-weekly-traffic-muted"
                            className="h-72"
                        />,
                        <SimpleTable
                            data={data.visitsByDay}
                            columns={VISITS_TABLE_COLUMNS}
                            getRowKey={(row) => row.day}
                        />,
                    )}
                />
                <DataVisulaizationCard
                    title="Plošný graf"
                    description="Stacked area (MRR)."
                    queryKey="example-mrr-growth"
                    tableExportable={{
                        filename: 'example-mrr',
                        headers: ['Měsíc', 'Nové MRR', 'Expansion'],
                        rows: data.mrrByMonth.map((row) => [
                            row.month,
                            row.newMrr,
                            row.expansion,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <AreaChart
                            data={data.mrrByMonth}
                            config={MRR_CHART_CONFIG}
                            categoryKey="month"
                            series={['newMrr', 'expansion']}
                            legendQueryKey="example-mrr-growth-muted"
                        />,
                        <SimpleTable
                            data={data.mrrByMonth}
                            columns={MRR_TABLE_COLUMNS}
                            getRowKey={(row) => row.month}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Horizontální sloupce"
                    description='BarChart orientation="horizontal"'
                    queryKey="example-visitors-horizontal"
                    tableExportable={{
                        filename: 'example-navstevnici-horizontal',
                        headers: ['Měsíc', 'Desktop'],
                        rows: data.visitorsByMonth.map((row) => [row.month, row.desktop]),
                    }}
                    tabs={chartTableTabs(
                        <BarChart
                            data={data.visitorsByMonth}
                            config={VISITORS_CHART_CONFIG}
                            categoryKey="month"
                            series={['desktop']}
                            orientation="horizontal"
                            legendQueryKey="example-visitors-horizontal-muted"
                        />,
                        <SimpleTable
                            data={data.visitorsByMonth}
                            columns={VISITORS_TABLE_COLUMNS}
                            getRowKey={(row) => row.month}
                        />,
                    )}
                />
                <DataVisulaizationCard
                    title="Skládané sloupce"
                    description="BarChart stacked"
                    queryKey="example-revenue-stacked"
                    tableExportable={{
                        filename: 'example-trendy-trzeb-stacked',
                        headers: ['Měsíc', 'Desktop', 'Mobil', 'Celkem'],
                        rows: data.revenueTableRows.map((row) => [
                            row.month,
                            row.desktop,
                            row.mobile,
                            row.total,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <BarChart
                            data={data.revenueByMonth}
                            config={REVENUE_STACKED_CHART_CONFIG}
                            categoryKey="month"
                            series={['desktop', 'mobile']}
                            stacked
                            legendQueryKey="example-revenue-stacked-muted"
                        />,
                        <SimpleTable
                            data={data.revenueTableRows}
                            columns={REVENUE_TABLE_COLUMNS}
                            getRowKey={(row) => row.month}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Labeled bar"
                    description="Hodnoty přímo u sloupců."
                    queryKey="example-sessions-by-channel"
                    tableExportable={{
                        filename: 'example-sessions-kanal',
                        headers: ['Kanál', 'Sessions'],
                        rows: data.sessionsByChannel.map((row) => [
                            row.channel,
                            row.sessions,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <LabeledBarChart
                            data={data.sessionsByChannel}
                            config={SESSIONS_CHART_CONFIG}
                            categoryKey="channel"
                            valueKey="sessions"
                        />,
                        <SimpleTable
                            data={data.sessionsByChannel}
                            columns={SESSIONS_TABLE_COLUMNS}
                            getRowKey={(row) => row.channel}
                        />,
                    )}
                />
                <DataVisulaizationCard
                    title="Negativní / pozitivní sloupce"
                    description="NegativeBarChart pro P&L."
                    queryKey="example-net-income"
                    tableExportable={{
                        filename: 'example-cisty-zisk',
                        headers: ['Měsíc', 'Čistý zisk'],
                        rows: data.netIncomeMonthly.map((row) => [
                            row.month,
                            row.netIncome,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <NegativeBarChart
                            data={data.netIncomeMonthly}
                            config={NET_INCOME_CHART_CONFIG}
                            categoryKey="month"
                            valueKey="netIncome"
                            positiveColor="var(--chart-1)"
                            negativeColor="var(--chart-3)"
                        />,
                        <SimpleTable
                            data={data.netIncomeMonthly}
                            columns={NET_INCOME_TABLE_COLUMNS}
                            getRowKey={(row) => row.month}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="SimpleTable"
                    description="Samostatná tabulka (bez grafu), včetně footer součací a exportu."
                    queryKey="example-simple-table"
                    action={
                        <InfoTooltip>
                            SimpleTable je základní tabulka pro detaily, seznamy a
                            exportovatelné přehledy. Umí footer a volitelně onRowClick.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'example-kampane',
                        headers: [
                            'Kampaň',
                            'Kanál',
                            'Region',
                            'Odesláno',
                            'Otevření',
                            'Prokliky',
                        ],
                        rows: data.campaignRows.map((row) => [
                            row.name,
                            row.channel,
                            row.region,
                            row.sent,
                            row.opened,
                            row.clicked,
                        ]),
                    }}
                >
                    <SimpleTable
                        data={data.campaignRows}
                        columns={CAMPAIGN_TABLE_COLUMNS}
                        getRowKey={(row) => row.id}
                        footer={data.campaignFooter}
                    />
                </DataVisulaizationCard>
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Heatmapa"
                    description="Matice tým × období."
                    queryKey="example-heatmap"
                    action={
                        <InfoTooltip>
                            Heatmapa hodí se na hustotu hodnot přes dvě dimenze (řádek ×
                            sloupec).
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'example-heatmap',
                        headers: ['Tým', 'Období', 'Hodnota'],
                        rows: data.heatmapByTeam.map((cell) => [
                            cell.row,
                            cell.column,
                            cell.value,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <Heatmap data={data.heatmapByTeam} />,
                        <SimpleTable
                            data={data.heatmapByTeam}
                            columns={HEATMAP_TABLE_COLUMNS}
                            getRowKey={(row) => `${row.row}-${row.column}`}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Sankey (flow)"
                    description="Tok mezi stavy konverze."
                    queryKey="example-sankey"
                    className="min-h-80"
                    action={
                        <InfoTooltip>
                            Sankey znázorňuje tok objemů mezi uzly (funnel, kampaně,
                            lifecycle).
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'example-sankey-flow',
                        headers: ['Z', 'Do', 'Objem'],
                        rows: data.funnelFlowTableRows.map((row) => [
                            row.from,
                            row.to,
                            row.value,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <SankeyChart
                            data={data.funnelFlow}
                            className="h-full min-h-75"
                        />,
                        <SimpleTable
                            data={data.funnelFlowTableRows}
                            columns={FUNNEL_FLOW_TABLE_COLUMNS}
                            getRowKey={(row) => row.id}
                        />,
                    )}
                />
            </section>
        </div>
    )
}
