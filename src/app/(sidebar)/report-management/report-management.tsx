'use client'

import {
    ChartColumnIcon,
    IdCardIcon,
    TableIcon,
    TicketCheckIcon,
    UsersIcon,
} from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
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
import { useFilters } from './use-filters'

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

const TICKET_CHANNEL_CONFIG = toChartConfig(TICKET_CHANNEL_SERIES)
const TICKET_CHANNEL_KEYS = TICKET_CHANNEL_SERIES.map((item) => item.key)
const VISITOR_TOTAL_CONFIG = toChartConfig(VISITOR_TOTAL_SERIES)
const VISITOR_TOTAL_KEYS = VISITOR_TOTAL_SERIES.map((item) => item.key)
const VISITOR_GROWTH_CONFIG = toChartConfig(VISITOR_GROWTH_SERIES)
const VISITOR_GROWTH_KEYS = VISITOR_GROWTH_SERIES.map((item) => item.key)

export function ReportManagement() {
    const { meta } = MANAGEMENT_REPORT_DATA
    const { dateRange } = useFilters()
    const { from, to } = dateRange
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
                    icon={<UsersIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
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
                    icon={<IdCardIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
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
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
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
                title="Vývoj tržeb za prodané vstupenky"
                queryKey="management-ticket-revenue-view"
                action={
                    <InfoTooltip>
                        Přehled celkových tržeb z prodaných za vybrané období,
                        barevně rozdělené podle kanálu prodeje.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-trzeb-za-prodane-vstupenky',
                    headers: [
                        'Month',
                        ...TICKET_REVENUE_COLUMNS.map((column) => column.label),
                    ],
                    rows: ticketRevenueRows.map((row) => [
                        row.label,
                        ...TICKET_REVENUE_COLUMNS.map((column) =>
                            Number(row[column.key] ?? 0),
                        ),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
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
                                emptyMessage="No ticket sales data for the selected period."
                                legendQueryKey="management-ticket-revenue-muted"
                            />
                        ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                key={`management-ticket-revenue-table-${periodKey}`}
                                data={ticketRevenueRows}
                                columns={toSectionTableColumns(TICKET_REVENUE_COLUMNS)}
                                getRowKey={(row) => row.period}
                                footer={toSectionFooter(
                                    ticketRevenueRows,
                                    TICKET_REVENUE_COLUMNS,
                                )}
                                emptyMessage="No ticket sales data for the selected period."
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Počet prodaných kusů vstupenek"
                queryKey="management-ticket-count-view"
                action={
                    <InfoTooltip>
                        Přehled celkového počtu prodaných vstupenek za vybrané
                        období, barevně rozdělené podle kanálu prodeje.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pocet-prodanych-kusu-vstupenek',
                    headers: [
                        'Month',
                        ...TICKET_COUNT_COLUMNS.map((column) => column.label),
                    ],
                    rows: ticketCountRows.map((row) => [
                        row.label,
                        ...TICKET_COUNT_COLUMNS.map((column) =>
                            Number(row[column.key] ?? 0),
                        ),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
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
                                emptyMessage="No ticket sales data for the selected period."
                                legendQueryKey="management-ticket-count-muted"
                            />
                        ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                key={`management-ticket-count-table-${periodKey}`}
                                data={ticketCountRows}
                                columns={toSectionTableColumns(TICKET_COUNT_COLUMNS)}
                                getRowKey={(row) => row.period}
                                footer={toSectionFooter(
                                    ticketCountRows,
                                    TICKET_COUNT_COLUMNS,
                                )}
                                emptyMessage="No ticket sales data for the selected period."
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Vývoj celkového počtu návštěvníků"
                queryKey="management-visitor-total-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění vývoje celkového počtu návštěvníků
                        zaznamenaných v databázi za vybrané období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-celkoveho-poctu-navstevniku',
                    headers: [
                        'Month',
                        ...VISITOR_TOTAL_COLUMNS.map((column) => column.label),
                    ],
                    rows: fanDevelopment.map((row) => [
                        row.label,
                        row.total,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
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
                                emptyMessage="No visitor data for the selected period."
                                legendQueryKey="management-visitor-total-muted"
                            />
                        ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                key={`management-visitor-total-table-${periodKey}`}
                                data={fanDevelopment}
                                columns={toSectionTableColumns(VISITOR_TOTAL_COLUMNS)}
                                getRowKey={(row) => row.period}
                                emptyMessage="No visitor data for the selected period."
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Přírůstky počtu návštěvníků"
                queryKey="management-visitor-growth-view"
                action={
                    <InfoTooltip>
                        Denní počet návštěvníků nově vytvořených v databázi za
                        vybrané období.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'prirustky-poctu-navstevniku',
                    headers: [
                        'Month',
                        ...VISITOR_GROWTH_COLUMNS.map((column) => column.label),
                    ],
                    rows: fanDevelopment.map((row) => [
                        row.label,
                        row.added,
                        row.removed,
                        row.netChange,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
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
                                emptyMessage="No visitor growth data for the selected period."
                                legendQueryKey="management-visitor-growth-muted"
                            />
                        ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                key={`management-visitor-growth-table-${periodKey}`}
                                data={fanDevelopment}
                                columns={toSectionTableColumns(VISITOR_GROWTH_COLUMNS)}
                                getRowKey={(row) => row.period}
                                footer={toSectionFooter(
                                    fanDevelopment,
                                    VISITOR_GROWTH_COLUMNS,
                                )}
                                emptyMessage="No visitor growth data for the selected period."
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
