'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
    CalendarDaysIcon,
    ChartColumnIcon,
    IdCardIcon,
    PercentIcon,
    TableIcon,
    TicketCheckIcon,
} from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    buildPartnerUsageColumns,
    formatCount,
    formatPercent,
    TICKET_CATEGORIES,
    TICKET_CATEGORY_CONFIG,
    USAGE_OVER_TIME_CONFIG,
    USAGE_OVER_TIME_SERIES,
    USAGE_TIMELINE_COLUMNS,
    TOP_EVENT_COLUMNS,
    CATEGORY_UTILIZATION_COLUMNS,
} from './data'
import { getPartnerSeasonTicketsData } from './filter-data'
import { usePartnerSeasonTicketsFilters } from './use-partner-season-tickets-filters'
import {
    buildCategoryConfig,
    toSparseCategoryChart,
} from '@/lib/alumni/sparse-category-chart'

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

export function PartnerSeasonTickets() {
    const { partners, categories, season } = usePartnerSeasonTicketsFilters()

    const dashboardData = useMemo(
        () =>
            getPartnerSeasonTicketsData({
                partners,
                categories,
                season,
            }),
        [partners, categories, season],
    )

    const {
        kpis,
        timeline,
        topEvents,
        categoryUtilization,
        partnerUsage,
        selectedCategories,
    } = dashboardData

    const topEventsChart = useMemo(
        () =>
            toSparseCategoryChart(
                topEvents.map((row) => ({
                    label: row.label,
                    count: row.visits,
                })),
            ),
        [topEvents],
    )

    const topEventsConfig = useMemo(
        () => buildCategoryConfig(topEvents),
        [topEvents],
    )

    const categoryChart = useMemo(
        () =>
            toSparseCategoryChart(
                categoryUtilization.map((row) => ({
                    label: row.label,
                    count: row.utilization,
                })),
            ),
        [categoryUtilization],
    )

    const categoryChartConfig = useMemo(
        () => buildCategoryConfig(categoryUtilization),
        [categoryUtilization],
    )

    const partnerColumns = useMemo(
        () => buildPartnerUsageColumns(selectedCategories),
        [selectedCategories],
    )

    const categoryChartHeight = Math.max(
        280,
        categoryUtilization.length * 36 + 80,
    )
    const partnerChartHeight = Math.max(360, partnerUsage.length * 36 + 88)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Partnerské permanentky"
                description="Využití partnerských permanentek na událostech, podle kategorií a partnerů."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
                aria-label="Partnerské permanentky KPI"
            >
                <KpiCard
                    label="Partnerské permanentky"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-3/10 text-chart-3"
                    value={formatCount(kpis.issued)}
                    metric={{
                        label: 'Rozdáno',
                        value: formatCount(kpis.issued),
                    }}
                    action={
                        <InfoTooltip>
                            Počet rozdaných partnerských permanentek pro zvolenou
                            sezónu a filtry.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Partneři"
                    icon={<IdCardIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={formatCount(kpis.partnersTotal)}
                    metric={{
                        label: 'Aktivních',
                        value: formatCount(kpis.partnersActive),
                    }}
                    action={
                        <InfoTooltip>
                            Aktivní = alespoň jedna návštěva v zvoleném období.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Návštěvy"
                    icon={<CalendarDaysIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={formatCount(kpis.visits)}
                    metric={{
                        label: 'Události',
                        value: formatCount(kpis.eventCount),
                    }}
                    action={
                        <InfoTooltip>
                            Součet návštěv partnerských permanentek napříč
                            událostmi ve zvoleném období.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Průměrné využití"
                    icon={<PercentIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={formatPercent(kpis.averageUtilization)}
                    metric={{
                        label: 'Kapacita',
                        value: formatCount(kpis.issued * kpis.eventCount),
                    }}
                    action={
                        <InfoTooltip>
                            Průměrné využití z dostupných permanentek × počet
                            událostí ve zvoleném období.
                        </InfoTooltip>
                    }
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Časová osa využití"
                    description="Počet partnerských permanentek použitých na jednotlivých událostech."
                    queryKey="partner-tickets-usage-timeline"
                    action={
                        <InfoTooltip>
                            Každý bod je jedna událost. Návštěva = použití
                            partnerské permanentky na dané akci.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'casova-osa-vyuziti',
                        headers: ['Datum', 'Událost', 'Návštěvy'],
                        rows: timeline.map((row) => [
                            row.date,
                            row.event,
                            row.visits,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <LineChart
                            data={timeline}
                            config={USAGE_OVER_TIME_CONFIG}
                            categoryKey="label"
                            series={[...USAGE_OVER_TIME_SERIES]}
                            showYAxis
                            angledXAxis
                            showDots
                            xAxisLabel="Datum události"
                            yAxisLabel="Počet návštěv"
                            formatValue={formatCount}
                            emptyMessage="Pro zvolené filtry nejsou k dispozici žádné události."
                            legendQueryKey="partner-tickets-usage-timeline-muted"
                            className="h-80"
                        />,
                        <SimpleTable
                            data={timeline}
                            columns={USAGE_TIMELINE_COLUMNS}
                            getRowKey={(row) => `${row.date}:${row.opponent}`}
                        />,
                    )}
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Top 3 události"
                    description="Podle počtu použitých permanentek."
                    queryKey="partner-tickets-top-events"
                    action={
                        <InfoTooltip>
                            Tři události s nejvyšším počtem použití
                            partnerských permanentek.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'top-3-udalosti',
                        headers: ['Událost', 'Návštěvy'],
                        rows: topEvents.map((row) => [
                            row.event,
                            row.visits,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <BarChart
                            data={topEventsChart.data}
                            config={topEventsConfig}
                            categoryKey="label"
                            series={topEventsChart.series}
                            stacked
                            orientation="horizontal"
                            showYAxis
                            xAxisLabel="Návštěvy"
                            formatValue={formatCount}
                            emptyMessage="Pro zvolené filtry nejsou k dispozici žádné události."
                            legendQueryKey="partner-tickets-top-events-muted"
                            className="h-72"
                        />,
                        <SimpleTable
                            data={topEvents}
                            columns={TOP_EVENT_COLUMNS}
                            getRowKey={(row) => row.label}
                        />,
                    )}
                />

                <DataVisulaizationCard
                    title="Nejvyužívanější kategorie"
                    description="Průměrné využití vydaných permanentek."
                    queryKey="partner-tickets-categories"
                    action={
                        <InfoTooltip>
                            Průměrné využití vydaných partnerských
                            permanentek podle kategorie.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'nejvyuzivanejsi-kategorie',
                        headers: ['Kategorie', 'Využití %'],
                        rows: categoryUtilization.map((row) => [
                            row.label,
                            row.utilization,
                        ]),
                    }}
                    tabs={chartTableTabs(
                        <div
                            className="w-full"
                            style={{
                                height: categoryChartHeight,
                            }}
                        >
                            <BarChart
                                data={categoryChart.data}
                                config={categoryChartConfig}
                                categoryKey="label"
                                series={categoryChart.series}
                                stacked
                                orientation="horizontal"
                                showYAxis
                                categoryMaxLength={22}
                                xAxisLabel="Využití"
                                formatValue={formatPercent}
                                emptyMessage="Pro zvolené filtry nejsou k dispozici žádné kategorie."
                                legendQueryKey="partner-tickets-categories-muted"
                                className="h-full"
                            />
                        </div>,
                        <SimpleTable
                            data={categoryUtilization}
                            columns={CATEGORY_UTILIZATION_COLUMNS}
                            getRowKey={(row) => row.key}
                        />,
                    )}
                />
            </section>

            <DataVisulaizationCard
                title="Nejaktivnější partneři"
                description="Celkové využití je rozdělené podle kategorií permanentek. Zobrazeno je prvních 12 partnerů."
                queryKey="partner-tickets-top-partners"
                action={
                    <InfoTooltip>
                        Průměrné využití permanentek jednotlivých partnerů,
                        rozdělené podle kategorie. Filtry Partner a Kategorie
                        zužují zobrazená data.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'nejaktivnejsi-partneri',
                    headers: [
                        'Partner',
                        ...TICKET_CATEGORIES.filter((category) =>
                            selectedCategories.includes(category.key),
                        ).map((category) => category.label),
                        'Celkem',
                    ],
                    rows: partnerUsage.map((row) => [
                        row.label,
                        ...selectedCategories.map((key) => row[key] ?? 0),
                        selectedCategories.reduce((sum, key) => {
                            const value = row[key]
                            return (
                                sum + (typeof value === 'number' ? value : 0)
                            )
                        }, 0),
                    ]),
                }}
                tabs={chartTableTabs(
                    <div
                        className="w-full"
                        style={{ height: partnerChartHeight }}
                    >
                        <BarChart
                            data={partnerUsage}
                            config={TICKET_CATEGORY_CONFIG}
                            categoryKey="label"
                            series={[...selectedCategories]}
                            stacked
                            orientation="horizontal"
                            showYAxis
                            categoryMaxLength={24}
                            xAxisLabel="Průměrné využití permanentek (%)"
                            yAxisLabel="Partner"
                            formatValue={formatPercent}
                            emptyMessage="Pro zvolené filtry nejsou k dispozici žádní partneři."
                            legendQueryKey="partner-tickets-top-partners-muted"
                            className="h-full"
                        />
                    </div>,
                    <SimpleTable
                        data={partnerUsage}
                        columns={partnerColumns}
                        getRowKey={(row) => String(row.label)}
                    />,
                )}
            />
        </div>
    )
}
