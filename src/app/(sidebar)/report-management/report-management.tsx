'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    getManagementReportPeriodView,
    MANAGEMENT_REPORT_DATA,
    TICKET_CHANNEL_SERIES,
    TICKET_COUNT_COLUMNS,
    TICKET_REVENUE_COLUMNS,
    toChartConfig,
    toSectionFooter,
    toSectionTableColumns,
    toTicketCountRows,
    toTicketRevenueRows,
    VISITOR_GROWTH_COLUMNS,
    VISITOR_GROWTH_SERIES,
    VISITOR_TOTAL_COLUMNS,
    VISITOR_TOTAL_SERIES,
} from './data'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const moneyFormatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})
const dateFormatter = new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})
const dateTimeFormatter = new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 5, 30)

const TICKET_CHANNEL_CONFIG = toChartConfig(TICKET_CHANNEL_SERIES)
const TICKET_CHANNEL_KEYS = TICKET_CHANNEL_SERIES.map((item) => item.key)
const VISITOR_TOTAL_CONFIG = toChartConfig(VISITOR_TOTAL_SERIES)
const VISITOR_TOTAL_KEYS = VISITOR_TOTAL_SERIES.map((item) => item.key)
const VISITOR_GROWTH_CONFIG = toChartConfig(VISITOR_GROWTH_SERIES)
const VISITOR_GROWTH_KEYS = VISITOR_GROWTH_SERIES.map((item) => item.key)

export function ReportManagement() {
    const { meta } = MANAGEMENT_REPORT_DATA
    const [from] = useQueryState('from', parseAsIsoDate.withDefault(defaultFrom))
    const [to] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))
    const dateRange = { from, to }
    const periodKey = `${from.toISOString()}-${to.toISOString()}`
    const {
        fanDevelopment,
        ticketDevelopment,
        lastFanPoint,
        fanNetGrowth,
        seasonTicketsSold,
        seasonTicketsRevenue,
        ticketsSold,
        ticketsRevenue,
        ticketsEventCount,
    } = getManagementReportPeriodView(MANAGEMENT_REPORT_DATA, dateRange)

    const ticketRevenueRows = toTicketRevenueRows(ticketDevelopment)
    const ticketCountRows = toTicketCountRows(ticketDevelopment)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Přehled výsledků CRM+ relatoo"
                itemsClassName="lg:grid-cols-3"
                items={[
                    {
                        title: 'Organizace',
                        value: meta.organizationName,
                    },
                    {
                        title: 'Report za období',
                        value: `${dateFormatter.format(from)} – ${dateFormatter.format(to)}`,
                    },
                    {
                        title: 'Datum sestavení',
                        value: dateTimeFormatter.format(new Date()),
                    },
                ]}
            />

            <section className="grid gap-4 md:grid-cols-3" aria-label="Přehled výsledků">
                <KpiCard
                    label="Návštěvníci"
                    content={[
                        {
                            label: 'Návštěvníků v databázi celkem',
                            value: numberFormatter.format(lastFanPoint?.total ?? 0),
                        },
                        {
                            label: 'Z toho zablokovaní',
                            value: numberFormatter.format(lastFanPoint?.blocked ?? 0),
                        },
                    ]}
                    trend={{
                        direction: fanNetGrowth >= 0 ? 'up' : 'down',
                        delta: `${fanNetGrowth >= 0 ? '+' : ''}${numberFormatter.format(fanNetGrowth)}`,
                        hint: 'návštěvníků',
                    }}
                />
                <KpiCard
                    label="Permanentky"
                    content={[
                        {
                            label: 'Příjem z prodeje',
                            value: moneyFormatter.format(seasonTicketsRevenue),
                        },
                        {
                            label: 'Počet kusů',
                            value: `${numberFormatter.format(seasonTicketsSold)}`,
                        },
                    ]}
                />
                <KpiCard
                    label="Vstupenky"
                    content={[
                        {
                            label: 'Příjem z prodeje',
                            value: moneyFormatter.format(ticketsRevenue),
                        },
                        {
                            label: 'Počet kusů',
                            value: `${numberFormatter.format(ticketsSold)}`,
                        },
                        {
                            label: 'Počet událostí',
                            value: numberFormatter.format(ticketsEventCount),
                        },
                    ]}
                />
            </section>

            <DataVisulaizationCard
                title="Development of revenue from tickets sold"
                description="Revenue by sales channel in the selected period."
                queryKey="management-ticket-revenue-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            ticketRevenueRows.length > 0 ? (
                                <BarChart
                                    key={`management-ticket-revenue-chart-${periodKey}`}
                                    data={ticketRevenueRows}
                                    config={TICKET_CHANNEL_CONFIG}
                                    categoryKey="label"
                                    series={TICKET_CHANNEL_KEYS}
                                    stacked
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="CZK"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No ticket sales data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            ticketRevenueRows.length > 0 ? (
                                <SimpleTable
                                    key={`management-ticket-revenue-table-${periodKey}`}
                                    data={ticketRevenueRows}
                                    columns={toSectionTableColumns(
                                        TICKET_REVENUE_COLUMNS,
                                    )}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        ticketRevenueRows,
                                        TICKET_REVENUE_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No ticket sales data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Number of tickets sold"
                description="Ticket volume by sales channel in the selected period."
                queryKey="management-ticket-count-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            ticketCountRows.length > 0 ? (
                                <BarChart
                                    key={`management-ticket-count-chart-${periodKey}`}
                                    data={ticketCountRows}
                                    config={TICKET_CHANNEL_CONFIG}
                                    categoryKey="label"
                                    series={TICKET_CHANNEL_KEYS}
                                    stacked
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No ticket sales data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            ticketCountRows.length > 0 ? (
                                <SimpleTable
                                    key={`management-ticket-count-table-${periodKey}`}
                                    data={ticketCountRows}
                                    columns={toSectionTableColumns(TICKET_COUNT_COLUMNS)}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        ticketCountRows,
                                        TICKET_COUNT_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No ticket sales data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Development of the total number of visitors"
                description="Total number of visitors at the end of each month in the selected period."
                queryKey="management-visitor-total-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            fanDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-visitor-total-chart-${periodKey}`}
                                    data={fanDevelopment}
                                    config={VISITOR_TOTAL_CONFIG}
                                    categoryKey="label"
                                    series={VISITOR_TOTAL_KEYS}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No visitor data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            fanDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-visitor-total-table-${periodKey}`}
                                    data={fanDevelopment}
                                    columns={toSectionTableColumns(VISITOR_TOTAL_COLUMNS)}
                                    getRowKey={(row) => row.period}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No visitor data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Growth in the number of visitors"
                description="New and removed visitors in the selected period."
                queryKey="management-visitor-growth-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            fanDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-visitor-growth-chart-${periodKey}`}
                                    data={fanDevelopment}
                                    config={VISITOR_GROWTH_CONFIG}
                                    categoryKey="label"
                                    series={VISITOR_GROWTH_KEYS}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No visitor growth data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            fanDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-visitor-growth-table-${periodKey}`}
                                    data={fanDevelopment}
                                    columns={toSectionTableColumns(
                                        VISITOR_GROWTH_COLUMNS,
                                    )}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        fanDevelopment,
                                        VISITOR_GROWTH_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No visitor growth data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />
        </div>
    )
}
