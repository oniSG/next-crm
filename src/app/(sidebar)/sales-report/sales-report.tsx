'use client'

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
    CSOB_PARTNER_DISCOUNT_BY_TEAM,
    CSOB_PARTNER_DISCOUNT_BY_TEAM_COLUMNS,
    CSOB_PARTNER_DISCOUNT_BY_TEAM_CONFIG,
    CSOB_PARTNER_DISCOUNT_BY_TEAM_SERIES,
    DISCOUNT_AMOUNT_BY_CATEGORY,
    DISCOUNT_AMOUNT_BY_CATEGORY_COLUMNS,
    DISCOUNT_AMOUNT_BY_TEAM,
    DISCOUNT_CATEGORY_CONFIG,
    DISCOUNT_CATEGORY_SERIES,
    DISCOUNT_TEAM_CONFIG,
    DISCOUNT_TEAM_SERIES,
    DISCOUNTED_TICKET_REVENUE,
    DISCOUNTED_TICKET_REVENUE_COLUMNS,
    DISCOUNTED_TICKET_REVENUE_CONFIG,
    DISCOUNTED_TICKET_REVENUE_SERIES,
    DISCOUNTED_TICKETS_BY_CATEGORY,
    DISCOUNTED_TICKETS_BY_CATEGORY_COLUMNS,
    DISCOUNTED_TICKETS_BY_TEAM,
    DISCOUNTS_BY_TEAM,
    DISCOUNTS_BY_TEAM_COLUMNS,
    formatSalesRevenue,
    formatTicketCount,
    getSalesReportKpis,
    TICKET_REVENUE_BY_TEAM,
    TICKET_REVENUE_BY_TEAM_COLUMNS,
    TICKET_REVENUE_BY_TEAM_CONFIG,
    TICKET_REVENUE_BY_TEAM_SERIES,
    TICKETS_SOLD_BY_TEAM,
    TICKETS_SOLD_BY_TEAM_COLUMNS,
    TICKETS_SOLD_BY_TEAM_CONFIG,
    TICKETS_SOLD_BY_TEAM_SERIES,
} from './data'

export function SalesReport() {
    const kpis = getSalesReportKpis()
    const ticketsSoldByTeamChartHeight = Math.max(
        320,
        TICKETS_SOLD_BY_TEAM.length * 36 + 80,
    )
    const ticketRevenueByTeamChartHeight = Math.max(
        320,
        TICKET_REVENUE_BY_TEAM.length * 36 + 80,
    )
    const csobPartnerDiscountByTeamChartHeight = Math.max(
        320,
        CSOB_PARTNER_DISCOUNT_BY_TEAM.length * 36 + 80,
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
                        Vývoj tržby ze zlevněných vstupenek podle měsíců.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-trzby-prodanych-vstupenek-se-slevou',
                    headers: ['Měsíc', 'Tržba'],
                    rows: DISCOUNTED_TICKET_REVENUE.map((row) => [
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
                                data={DISCOUNTED_TICKET_REVENUE}
                                config={DISCOUNTED_TICKET_REVENUE_CONFIG}
                                categoryKey="label"
                                series={[...DISCOUNTED_TICKET_REVENUE_SERIES]}
                                showYAxis
                                angledXAxis
                                showDots
                                xAxisLabel="Měsíc"
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
                                data={DISCOUNTED_TICKET_REVENUE}
                                columns={DISCOUNTED_TICKET_REVENUE_COLUMNS}
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
                        Heatmapa počtu zlevněných vstupenek podle týmu a měsíce.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-zlevnenych-vstupenek-podle-tymu',
                    headers: ['Tým', 'Měsíc', 'Počet'],
                    rows: DISCOUNTED_TICKETS_BY_TEAM.map((cell) => [
                        cell.row,
                        cell.column,
                        cell.value,
                    ]),
                }}
            >
                <Heatmap
                    data={DISCOUNTED_TICKETS_BY_TEAM}
                    formatValue={formatTicketCount}
                />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Výše poskytnutých slev podle týmů"
                queryKey="sales-discount-amount-by-team-view"
                action={
                    <InfoTooltip>
                        Heatmapa výše poskytnutých slev podle týmu a měsíce.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyse-poskytnutych-slev-podle-tymu',
                    headers: ['Tým', 'Měsíc', 'Sleva'],
                    rows: DISCOUNT_AMOUNT_BY_TEAM.map((cell) => [
                        cell.row,
                        cell.column,
                        cell.value,
                    ]),
                }}
            >
                <Heatmap
                    data={DISCOUNT_AMOUNT_BY_TEAM}
                    formatValue={formatSalesRevenue}
                />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Počet zlevněných vstupenek podle kategorií slev"
                queryKey="sales-discounted-tickets-by-category-view"
                action={
                    <InfoTooltip>
                        Počet zlevněných vstupenek podle kategorií slev a měsíců.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-zlevnenych-vstupenek-podle-kategorii-slev',
                    headers: [
                        'Měsíc',
                        ...DISCOUNT_CATEGORY_SERIES.map(
                            (key) => DISCOUNT_CATEGORY_CONFIG[key].label,
                        ),
                    ],
                    rows: DISCOUNTED_TICKETS_BY_CATEGORY.map((row) => [
                        row.label,
                        ...DISCOUNT_CATEGORY_SERIES.map((key) => row[key]),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={DISCOUNTED_TICKETS_BY_CATEGORY}
                                config={DISCOUNT_CATEGORY_CONFIG}
                                categoryKey="label"
                                series={[...DISCOUNT_CATEGORY_SERIES]}
                                showYAxis
                                angledXAxis
                                xAxisLabel="Měsíc"
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
                                data={DISCOUNTED_TICKETS_BY_CATEGORY}
                                columns={DISCOUNTED_TICKETS_BY_CATEGORY_COLUMNS}
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
                        Výše poskytnutých slev podle kategorií slev a měsíců.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyse-poskytnutych-slev-podle-kategorii',
                    headers: [
                        'Měsíc',
                        ...DISCOUNT_CATEGORY_SERIES.map(
                            (key) => DISCOUNT_CATEGORY_CONFIG[key].label,
                        ),
                    ],
                    rows: DISCOUNT_AMOUNT_BY_CATEGORY.map((row) => [
                        row.label,
                        ...DISCOUNT_CATEGORY_SERIES.map((key) => row[key]),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={DISCOUNT_AMOUNT_BY_CATEGORY}
                                config={DISCOUNT_CATEGORY_CONFIG}
                                categoryKey="label"
                                series={[...DISCOUNT_CATEGORY_SERIES]}
                                showYAxis
                                angledXAxis
                                showDots
                                xAxisLabel="Měsíc"
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
                                data={DISCOUNT_AMOUNT_BY_CATEGORY}
                                columns={DISCOUNT_AMOUNT_BY_CATEGORY_COLUMNS}
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
                        ...DISCOUNT_TEAM_SERIES.map(
                            (key) => DISCOUNT_TEAM_CONFIG[key].label,
                        ),
                    ],
                    rows: DISCOUNTS_BY_TEAM.map((row) => [
                        row.label,
                        ...DISCOUNT_TEAM_SERIES.map((key) => row[key]),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={DISCOUNTS_BY_TEAM}
                                config={DISCOUNT_TEAM_CONFIG}
                                categoryKey="label"
                                series={[...DISCOUNT_TEAM_SERIES]}
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
                                data={DISCOUNTS_BY_TEAM}
                                columns={DISCOUNTS_BY_TEAM_COLUMNS}
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
                    rows: TICKETS_SOLD_BY_TEAM.map((row) => [
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
                                    data={TICKETS_SOLD_BY_TEAM}
                                    config={TICKETS_SOLD_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[...TICKETS_SOLD_BY_TEAM_SERIES]}
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
                                data={TICKETS_SOLD_BY_TEAM}
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
                    rows: TICKET_REVENUE_BY_TEAM.map((row) => [
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
                                    data={TICKET_REVENUE_BY_TEAM}
                                    config={TICKET_REVENUE_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[...TICKET_REVENUE_BY_TEAM_SERIES]}
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
                                data={TICKET_REVENUE_BY_TEAM}
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
                    rows: CSOB_PARTNER_DISCOUNT_BY_TEAM.map((row) => [
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
                                    data={CSOB_PARTNER_DISCOUNT_BY_TEAM}
                                    config={CSOB_PARTNER_DISCOUNT_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[
                                        ...CSOB_PARTNER_DISCOUNT_BY_TEAM_SERIES,
                                    ]}
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
                                data={CSOB_PARTNER_DISCOUNT_BY_TEAM}
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
