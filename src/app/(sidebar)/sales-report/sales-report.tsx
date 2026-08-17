'use client'

import { useMemo } from 'react'
import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { Heatmap } from '@/components/custom/statistics/heatmap'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    buildDiscountAmountByCategoryColumns,
    buildDiscountedTicketRevenueColumns,
    buildDiscountedTicketsByCategoryColumns,
    buildDiscountsByTeamColumns,
    computeSalesReportKpis,
    CSOB_PARTNER_DISCOUNT_BY_TEAM_COLUMNS,
    DISCOUNT_CATEGORY_CONFIG,
    DISCOUNT_TEAM_CONFIG,
    DISCOUNTED_TICKET_REVENUE_CONFIG,
    DISCOUNTED_TICKET_REVENUE_SERIES,
    filterSalesFacts,
    formatSalesRevenue,
    formatTicketCount,
    getCsobPartnerDiscountByTeam,
    getDiscountAmountByCategory,
    getDiscountAmountByTeamHeatmap,
    getDiscountCategorySeries,
    getDiscountedTicketRevenue,
    getDiscountedTicketsByCategory,
    getDiscountedTicketsByTeamHeatmap,
    getDiscountsByTeam,
    getDiscountTeamSeries,
    getSalesReportKpis,
    getTicketRevenueByTeam,
    getTicketsSoldByTeam,
    periodColumnLabel,
    TICKET_REVENUE_BY_TEAM_COLUMNS,
    TICKETS_SOLD_BY_TEAM_COLUMNS,
} from './data'
import { useFilters } from './use-filters'
import {
    buildCategoryConfig,
    toSparseCategoryChart,
} from '@/lib/statistics/sparse-category-chart'

export function SalesReport() {
    const { dateRange, period, teams, category } = useFilters()

    const filteredRows = useMemo(
        () =>
            filterSalesFacts(
                dateRange.from,
                dateRange.to,
                teams,
                category,
            ),
        [dateRange.from, dateRange.to, teams, category],
    )

    const kpis = useMemo(
        () => getSalesReportKpis(computeSalesReportKpis(filteredRows, teams)),
        [filteredRows, teams],
    )

    const categorySeries = useMemo(
        () => getDiscountCategorySeries(category),
        [category],
    )

    const teamSeries = useMemo(() => getDiscountTeamSeries(teams), [teams])

    const discountedTicketRevenue = useMemo(
        () => getDiscountedTicketRevenue(filteredRows, period),
        [filteredRows, period],
    )

    const revenueColumns = useMemo(
        () => buildDiscountedTicketRevenueColumns(period),
        [period],
    )

    const ticketsByTeamHeatmap = useMemo(
        () => getDiscountedTicketsByTeamHeatmap(filteredRows, period),
        [filteredRows, period],
    )

    const discountAmountByTeamHeatmap = useMemo(
        () => getDiscountAmountByTeamHeatmap(filteredRows, period),
        [filteredRows, period],
    )

    const ticketsByCategory = useMemo(
        () => getDiscountedTicketsByCategory(filteredRows, period, category),
        [filteredRows, period, category],
    )

    const ticketsByCategoryColumns = useMemo(
        () => buildDiscountedTicketsByCategoryColumns(period, categorySeries),
        [period, categorySeries],
    )

    const discountAmountByCategory = useMemo(
        () => getDiscountAmountByCategory(filteredRows, period, category),
        [filteredRows, period, category],
    )

    const discountAmountByCategoryColumns = useMemo(
        () => buildDiscountAmountByCategoryColumns(period, categorySeries),
        [period, categorySeries],
    )

    const discountsByTeam = useMemo(
        () => getDiscountsByTeam(filteredRows, teams, category),
        [filteredRows, teams, category],
    )

    const discountsByTeamColumns = useMemo(
        () => buildDiscountsByTeamColumns(teamSeries),
        [teamSeries],
    )

    const ticketsSoldByTeam = useMemo(
        () => getTicketsSoldByTeam(filteredRows, teams),
        [filteredRows, teams],
    )

    const ticketsSoldByTeamChart = useMemo(
        () => toSparseCategoryChart(ticketsSoldByTeam),
        [ticketsSoldByTeam],
    )

    const ticketsSoldByTeamConfig = useMemo(
        () => buildCategoryConfig(ticketsSoldByTeam),
        [ticketsSoldByTeam],
    )

    const ticketRevenueByTeam = useMemo(
        () => getTicketRevenueByTeam(filteredRows, teams),
        [filteredRows, teams],
    )

    const ticketRevenueByTeamChart = useMemo(
        () =>
            toSparseCategoryChart(
                ticketRevenueByTeam.map((row) => ({
                    label: row.label,
                    count: row.revenue,
                })),
            ),
        [ticketRevenueByTeam],
    )

    const ticketRevenueByTeamConfig = useMemo(
        () => buildCategoryConfig(ticketRevenueByTeam),
        [ticketRevenueByTeam],
    )

    const csobPartnerDiscountByTeam = useMemo(
        () => getCsobPartnerDiscountByTeam(filteredRows, teams),
        [filteredRows, teams],
    )

    const csobPartnerDiscountByTeamChart = useMemo(
        () => toSparseCategoryChart(csobPartnerDiscountByTeam),
        [csobPartnerDiscountByTeam],
    )

    const csobPartnerDiscountByTeamConfig = useMemo(
        () => buildCategoryConfig(csobPartnerDiscountByTeam),
        [csobPartnerDiscountByTeam],
    )

    const periodLabel = periodColumnLabel(period)
    const ticketsSoldByTeamChartHeight = Math.max(
        320,
        ticketsSoldByTeam.length * 36 + 80,
    )
    const ticketRevenueByTeamChartHeight = Math.max(
        320,
        ticketRevenueByTeam.length * 36 + 80,
    )
    const csobPartnerDiscountByTeamChartHeight = Math.max(
        320,
        csobPartnerDiscountByTeam.length * 36 + 80,
    )

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Sales report"
                description="Přehled zlevněných vstupenek, slev a jejich využití."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Sales report KPI"
            >
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <DataVisulaizationCard
                title="Vývoj tržby prodaných vstupenek se slevou"
                queryKey="sales-discounted-ticket-revenue-view"
                action={
                    <InfoTooltip>
                        Vývoj tržby ze zlevněných vstupenek podle zvoleného období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-trzby-prodanych-vstupenek-se-slevou',
                    headers: [periodLabel, 'Tržba'],
                    rows: discountedTicketRevenue.map((row) => [
                        row.label,
                        row.revenue,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={discountedTicketRevenue}
                                config={DISCOUNTED_TICKET_REVENUE_CONFIG}
                                categoryKey="label"
                                series={[...DISCOUNTED_TICKET_REVENUE_SERIES]}
                                showYAxis
                                angledXAxis
                                showDots
                                xAxisLabel={periodLabel}
                                yAxisLabel="Tržba v Kč"
                                formatValue={formatSalesRevenue}
                                legendQueryKey="sales-discounted-ticket-revenue-muted"
                                className="h-80"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={discountedTicketRevenue}
                                columns={revenueColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Počet zlevněných vstupenek podle týmů"
                queryKey="sales-discounted-tickets-by-team-view"
                action={
                    <InfoTooltip>
                        Heatmapa počtu zlevněných vstupenek podle týmu a období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-zlevnenych-vstupenek-podle-tymu',
                    headers: ['Tým', periodLabel, 'Počet'],
                    rows: ticketsByTeamHeatmap.map((cell) => [
                        cell.row,
                        cell.column,
                        cell.value,
                    ]),
                }}
            >
                <Heatmap
                    data={ticketsByTeamHeatmap}
                    formatValue={formatTicketCount}
                />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Výše poskytnutých slev podle týmů"
                queryKey="sales-discount-amount-by-team-view"
                action={
                    <InfoTooltip>
                        Heatmapa výše poskytnutých slev podle týmu a období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyse-poskytnutych-slev-podle-tymu',
                    headers: ['Tým', periodLabel, 'Sleva'],
                    rows: discountAmountByTeamHeatmap.map((cell) => [
                        cell.row,
                        cell.column,
                        cell.value,
                    ]),
                }}
            >
                <Heatmap
                    data={discountAmountByTeamHeatmap}
                    formatValue={formatSalesRevenue}
                />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Počet zlevněných vstupenek podle kategorií slev"
                queryKey="sales-discounted-tickets-by-category-view"
                action={
                    <InfoTooltip>
                        Počet zlevněných vstupenek podle kategorií slev a období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-zlevnenych-vstupenek-podle-kategorii-slev',
                    headers: [
                        periodLabel,
                        ...categorySeries.map(
                            (key) => DISCOUNT_CATEGORY_CONFIG[key].label,
                        ),
                    ],
                    rows: ticketsByCategory.map((row) => [
                        row.label,
                        ...categorySeries.map((key) => row[key] ?? 0),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={ticketsByCategory}
                                config={DISCOUNT_CATEGORY_CONFIG}
                                categoryKey="label"
                                series={categorySeries}
                                showYAxis
                                angledXAxis
                                xAxisLabel={periodLabel}
                                yAxisLabel="Počet"
                                formatValue={formatTicketCount}
                                legendQueryKey="sales-discounted-tickets-by-category-muted"
                                className="h-96"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={ticketsByCategory}
                                columns={ticketsByCategoryColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Výše poskytnutých slev podle kategorií"
                queryKey="sales-discount-amount-by-category-view"
                action={
                    <InfoTooltip>
                        Výše poskytnutých slev podle kategorií slev a období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyse-poskytnutych-slev-podle-kategorii',
                    headers: [
                        periodLabel,
                        ...categorySeries.map(
                            (key) => DISCOUNT_CATEGORY_CONFIG[key].label,
                        ),
                    ],
                    rows: discountAmountByCategory.map((row) => [
                        row.label,
                        ...categorySeries.map((key) => row[key] ?? 0),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={discountAmountByCategory}
                                config={DISCOUNT_CATEGORY_CONFIG}
                                categoryKey="label"
                                series={categorySeries}
                                showYAxis
                                angledXAxis
                                showDots
                                xAxisLabel={periodLabel}
                                yAxisLabel="Cena v Kč"
                                formatValue={formatSalesRevenue}
                                legendQueryKey="sales-discount-amount-by-category-muted"
                                className="h-96"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={discountAmountByCategory}
                                columns={discountAmountByCategoryColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Rozdělení slev podle týmů"
                queryKey="sales-discounts-by-team-view"
                action={
                    <InfoTooltip>
                        Počet uplatněných slev podle kategorie slevy a týmu.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'rozdeleni-slev-podle-tymu',
                    headers: [
                        'Kategorie slevy',
                        ...teamSeries,
                    ],
                    rows: discountsByTeam.map((row) => [
                        row.label,
                        ...teamSeries.map((key) => row[key] ?? 0),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={discountsByTeam}
                                config={DISCOUNT_TEAM_CONFIG}
                                categoryKey="label"
                                series={teamSeries}
                                showYAxis
                                angledXAxis
                                yAxisLabel="Počet"
                                formatValue={formatTicketCount}
                                legendQueryKey="sales-discounts-by-team-muted"
                                className="h-96"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={discountsByTeam}
                                columns={discountsByTeamColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Počet prodaných vstupenek podle týmů"
                queryKey="sales-tickets-sold-by-team-view"
                action={
                    <InfoTooltip>
                        Počet prodaných vstupenek podle jednotlivých týmů.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-prodanych-vstupenek-podle-tymu',
                    headers: ['Tým', 'Počet'],
                    rows: ticketsSoldByTeam.map((row) => [
                        row.label,
                        row.count,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <div
                                className="w-full"
                                style={{ height: ticketsSoldByTeamChartHeight }}
                            >
                                <BarChart
                                    data={ticketsSoldByTeamChart.data}
                                    config={ticketsSoldByTeamConfig}
                                    categoryKey="label"
                                    series={ticketsSoldByTeamChart.series}
                                    stacked
                                    orientation="horizontal"
                                    showYAxis
                                    categoryMaxLength={22}
                                    xAxisLabel="Počet"
                                    yAxisLabel="Tým"
                                    formatValue={formatTicketCount}
                                    legendQueryKey="sales-tickets-sold-by-team-muted"
                                    className="h-full"
                                />
                            </div>
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={ticketsSoldByTeam}
                                columns={TICKETS_SOLD_BY_TEAM_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Tržba prodaných vstupenek podle týmů"
                queryKey="sales-ticket-revenue-by-team-view"
                action={
                    <InfoTooltip>
                        Tržba z prodaných vstupenek podle jednotlivých týmů.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'trzba-prodanych-vstupenek-podle-tymu',
                    headers: ['Tým', 'Tržba'],
                    rows: ticketRevenueByTeam.map((row) => [
                        row.label,
                        row.revenue,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <div
                                className="w-full"
                                style={{
                                    height: ticketRevenueByTeamChartHeight,
                                }}
                            >
                                <BarChart
                                    data={ticketRevenueByTeamChart.data}
                                    config={ticketRevenueByTeamConfig}
                                    categoryKey="label"
                                    series={ticketRevenueByTeamChart.series}
                                    stacked
                                    orientation="horizontal"
                                    showYAxis
                                    categoryMaxLength={22}
                                    xAxisLabel="Cena v Kč"
                                    yAxisLabel="Tým"
                                    formatValue={formatSalesRevenue}
                                    legendQueryKey="sales-ticket-revenue-by-team-muted"
                                    className="h-full"
                                />
                            </div>
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={ticketRevenueByTeam}
                                columns={TICKET_REVENUE_BY_TEAM_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Partnerská sleva ČSOB"
                queryKey="sales-csob-partner-discount-by-team-view"
                action={
                    <InfoTooltip>
                        Počet uplatněných partnerských slev ČSOB podle týmů.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'partnerska-sleva-csob',
                    headers: ['Tým', 'Počet'],
                    rows: csobPartnerDiscountByTeam.map((row) => [
                        row.label,
                        row.count,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <div
                                className="w-full"
                                style={{
                                    height: csobPartnerDiscountByTeamChartHeight,
                                }}
                            >
                                <BarChart
                                    data={csobPartnerDiscountByTeamChart.data}
                                    config={csobPartnerDiscountByTeamConfig}
                                    categoryKey="label"
                                    series={csobPartnerDiscountByTeamChart.series}
                                    stacked
                                    orientation="horizontal"
                                    showYAxis
                                    categoryMaxLength={22}
                                    xAxisLabel="Počet"
                                    yAxisLabel="Tým"
                                    formatValue={formatTicketCount}
                                    legendQueryKey="sales-csob-partner-discount-by-team-muted"
                                    className="h-full"
                                />
                            </div>
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={csobPartnerDiscountByTeam}
                                columns={CSOB_PARTNER_DISCOUNT_BY_TEAM_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
