'use client'

import {
    ChartColumnIcon,
    ContactRoundIcon,
    MailIcon,
    MessageSquareTextIcon,
    SendIcon,
    TableIcon,
    TicketCheckIcon,
} from 'lucide-react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import {
    SimpleTable,
    type SimpleTableColumn,
} from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import {
    ADVERTISING_SPACES_CONFIG,
    BUSINESS_CASE_STATUS_COLUMNS,
    BUSINESS_CASE_STATUS_SERIES,
    DELIVERED_COLUMNS,
    filterByPeriodRange,
    MANAGEMENT_REPORT_DATA,
    TICKET_CHANNEL_SERIES,
    TICKET_COUNT_COLUMNS,
    TICKET_REVENUE_COLUMNS,
    toBusinessCaseStatusRows,
    toTicketCountRows,
    toTicketRevenueRows,
    VISITOR_GROWTH_COLUMNS,
    VISITOR_GROWTH_SERIES,
    VISITOR_TOTAL_COLUMNS,
    VISITOR_TOTAL_SERIES,
    WON_BUSINESS_CASE_COLUMNS,
    WON_BUSINESS_CASE_SERIES,
    type ReportChartSeries,
    type ReportSectionRow,
    type ReportTableColumn,
} from './data'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})
const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})

const defaultFrom = new Date(2026, 0, 1)
const defaultTo = new Date(2026, 5, 30)

function formatValue(value: number, format: ReportTableColumn['format']) {
    if (format === 'currency') return currencyFormatter.format(value)
    const formatted = numberFormatter.format(value)
    if (format === 'signed' && value >= 0) return `+${formatted}`
    return formatted
}

function sumBy<T>(rows: T[], pick: (row: T) => number) {
    return rows.reduce((sum, row) => sum + pick(row), 0)
}

function ChartTableSection({
    title,
    description,
    rows,
    columns,
    series,
    periodKey,
    stacked = false,
    showTotals = true,
    emptyMessage,
    queryKey,
}: {
    title: string
    description: string
    rows: ReportSectionRow[]
    columns: ReportTableColumn[]
    series: ReportChartSeries[]
    periodKey: string
    stacked?: boolean
    showTotals?: boolean
    emptyMessage: string
    queryKey: string
}) {
    const config = Object.fromEntries(
        series.map((item) => [item.key, { label: item.label, color: item.color }]),
    ) satisfies ChartConfig
    const totals = columns.reduce<Record<string, number>>((result, column) => {
        result[column.key] = sumBy(rows, (row) => Number(row[column.key] ?? 0))
        return result
    }, {})

    const chart =
        rows.length > 0 ? (
            <BarChart
                key={`${queryKey}-chart-${periodKey}`}
                data={rows}
                config={config}
                categoryKey="label"
                series={series.map((item) => item.key)}
                stacked={stacked}
                showYAxis
                className="h-80"
            />
        ) : (
            <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                {emptyMessage}
            </div>
        )

    const tableColumns: SimpleTableColumn<ReportSectionRow>[] = [
        {
            id: 'label',
            header: 'Month',
            cell: (row) => row.label,
            cellClassName: 'font-medium',
        },
        ...columns.map((column) => ({
            id: column.key,
            header: column.label,
            headerClassName: 'text-right',
            cellClassName: column.emphasize
                ? 'text-right font-medium tabular-nums'
                : 'text-right tabular-nums',
            cell: (row: ReportSectionRow) =>
                formatValue(Number(row[column.key] ?? 0), column.format),
        })),
    ]

    const table = (
        <div key={`${queryKey}-table-${periodKey}`}>
            {rows.length > 0 ? (
                <SimpleTable
                    data={rows}
                    columns={tableColumns}
                    getRowKey={(row) => row.period}
                    footer={
                        showTotals
                            ? [
                                  'Total',
                                  ...columns.map((column) =>
                                      formatValue(totals[column.key], column.format),
                                  ),
                              ]
                            : undefined
                    }
                />
            ) : (
                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                    {emptyMessage}
                </div>
            )}
        </div>
    )

    const tabs: GraphCardTab[] = [
        {
            name: 'Chart',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: chart,
        },
        {
            name: 'Table',
            value: 'table',
            icon: <TableIcon />,
            content: table,
        },
    ]

    return (
        <DataVisulaizationCard
            title={title}
            description={description}
            tabs={tabs}
            queryKey={queryKey}
        />
    )
}

export function ReportManagement() {
    const { meta, fans, seasonTickets, tickets, communication, business } =
        MANAGEMENT_REPORT_DATA
    const [from] = useQueryState('from', parseAsIsoDate.withDefault(defaultFrom))
    const [to] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))
    const dateRange = { from, to }
    const periodKey = `${from.toISOString()}-${to.toISOString()}`
    const inRange = <T extends { period: string }>(data: T[]) =>
        filterByPeriodRange(data, dateRange)

    const fanDevelopment = inRange(fans.development)
    const seasonTicketDevelopment = inRange(seasonTickets.development)
    const ticketDevelopment = inRange(tickets.development)
    const emailDevelopment = inRange(communication.email.development)
    const pushDevelopment = inRange(communication.push.development)
    const smsDevelopment = inRange(communication.sms.development)
    const advertisingDevelopment = inRange(business.advertisingSpaces.development)
    const wonBusinessCasesDevelopment = inRange(business.wonCases.development)
    const businessCaseDevelopment = inRange(business.caseDevelopment)

    const lastFanPoint = fanDevelopment.at(-1)
    const fanNetGrowth = sumBy(fanDevelopment, (point) => point.netChange)
    const seasonTicketsSold = sumBy(seasonTicketDevelopment, (point) => point.sold)
    const seasonTicketsRevenue = sumBy(seasonTicketDevelopment, (point) => point.revenue)
    const ticketsSold = sumBy(ticketDevelopment, (point) => point.total.count)
    const ticketsRevenue = sumBy(ticketDevelopment, (point) => point.total.revenue)
    const ticketsEventCount = sumBy(ticketDevelopment, (point) => point.eventCount)

    const emailDelivered = sumBy(emailDevelopment, (point) => point.delivered)
    const emailOpened = sumBy(emailDevelopment, (point) => point.openedUnique ?? 0)
    const emailClicked = sumBy(emailDevelopment, (point) => point.clickedUnique ?? 0)
    const pushDelivered = sumBy(pushDevelopment, (point) => point.delivered)
    const pushFailed = sumBy(pushDevelopment, (point) => point.failed)
    const smsDelivered = sumBy(smsDevelopment, (point) => point.delivered)
    const smsFailed = sumBy(smsDevelopment, (point) => point.failed)

    const emailOpenRate = emailDelivered ? (emailOpened / emailDelivered) * 100 : 0
    const emailClickRate = emailDelivered ? (emailClicked / emailDelivered) * 100 : 0
    const pushTotal = pushDelivered + pushFailed
    const pushFailureRate = pushTotal ? (pushFailed / pushTotal) * 100 : 0
    const currentAdvertisingSpaces = advertisingDevelopment.at(-1)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Monthly results overview"
                description="A concise overview of audience growth and ticketing performance."
                itemsClassName="lg:grid-cols-3"
                items={[
                    {
                        title: 'Organization',
                        value: meta.organizationName,
                    },
                    {
                        title: 'Report period',
                        value: `${dateFormatter.format(from)} – ${dateFormatter.format(to)}`,
                    },
                    {
                        title: 'Generated',
                        value: dateTimeFormatter.format(new Date(meta.generatedAt)),
                    },
                ]}
            />

            <section className="grid gap-4 md:grid-cols-3" aria-label="Report overview">
                <KpiCard
                    label="Visitors"
                    icon={<ContactRoundIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={numberFormatter.format(lastFanPoint?.total ?? 0)}
                    content={[
                        {
                            label: 'Blocked',
                            value: numberFormatter.format(lastFanPoint?.blocked ?? 0),
                        },
                    ]}
                    trend={{
                        direction: fanNetGrowth >= 0 ? 'up' : 'down',
                        delta: `${fanNetGrowth >= 0 ? '+' : ''}${numberFormatter.format(fanNetGrowth)}`,
                        hint: 'Net growth',
                    }}
                />
                <KpiCard
                    label="Season tickets"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={currencyFormatter.format(seasonTicketsRevenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: numberFormatter.format(seasonTicketsSold),
                        },
                        {
                            label: 'Average price',
                            value: currencyFormatter.format(
                                seasonTicketsSold
                                    ? seasonTicketsRevenue / seasonTicketsSold
                                    : 0,
                            ),
                        },
                    ]}
                />
                <KpiCard
                    label="Tickets"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={currencyFormatter.format(ticketsRevenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: numberFormatter.format(ticketsSold),
                        },
                        {
                            label: 'Events',
                            value: numberFormatter.format(ticketsEventCount),
                        },
                    ]}
                />
            </section>

            <ChartTableSection
                title="Development of revenue from tickets sold"
                description="Revenue by sales channel in the selected period."
                rows={toTicketRevenueRows(ticketDevelopment)}
                columns={TICKET_REVENUE_COLUMNS}
                series={TICKET_CHANNEL_SERIES}
                periodKey={periodKey}
                stacked
                emptyMessage="No ticket sales data for the selected period."
                queryKey="management-ticket-revenue-view"
            />

            <ChartTableSection
                title="Number of tickets sold"
                description="Ticket volume by sales channel in the selected period."
                rows={toTicketCountRows(ticketDevelopment)}
                columns={TICKET_COUNT_COLUMNS}
                series={TICKET_CHANNEL_SERIES}
                periodKey={periodKey}
                stacked
                emptyMessage="No ticket sales data for the selected period."
                queryKey="management-ticket-count-view"
            />

            <ChartTableSection
                title="Development of the total number of visitors"
                description="Total number of visitors at the end of each month in the selected period."
                rows={fanDevelopment}
                columns={VISITOR_TOTAL_COLUMNS}
                series={VISITOR_TOTAL_SERIES}
                periodKey={periodKey}
                showTotals={false}
                emptyMessage="No visitor data for the selected period."
                queryKey="management-visitor-total-view"
            />

            <ChartTableSection
                title="Growth in the number of visitors"
                description="New and removed visitors in the selected period."
                rows={fanDevelopment}
                columns={VISITOR_GROWTH_COLUMNS}
                series={VISITOR_GROWTH_SERIES}
                periodKey={periodKey}
                emptyMessage="No visitor growth data for the selected period."
                queryKey="management-visitor-growth-view"
            />

            <section
                className="grid gap-4 md:grid-cols-3"
                aria-label="Communication overview"
            >
                <KpiCard
                    label="E-mail"
                    icon={<MailIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={numberFormatter.format(emailDelivered)}
                    content={[
                        {
                            label: 'Uniquely opened',
                            value: `${emailOpenRate.toFixed(1)} %`,
                        },
                        {
                            label: 'Unique click through',
                            value: `${emailClickRate.toFixed(1)} %`,
                        },
                    ]}
                />
                <KpiCard
                    label="Push"
                    icon={<SendIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={numberFormatter.format(pushDelivered)}
                    content={[
                        {
                            label: 'Not delivered',
                            value: `${pushFailureRate.toFixed(1)} %`,
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(pushFailed),
                        },
                    ]}
                />
                <KpiCard
                    label="SMS"
                    icon={<MessageSquareTextIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={numberFormatter.format(smsDelivered)}
                    content={[
                        {
                            label: 'Delivered',
                            value: numberFormatter.format(smsDelivered),
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(smsFailed),
                        },
                    ]}
                />
            </section>

            <ChartTableSection
                title="Statistics of delivered e-mails"
                description="Delivered e-mails in the selected period."
                rows={emailDevelopment}
                columns={DELIVERED_COLUMNS}
                series={[
                    { key: 'delivered', label: 'Delivered', color: 'var(--chart-1)' },
                ]}
                periodKey={periodKey}
                emptyMessage="No e-mails data for the selected period."
                queryKey="management-delivered-e-mails-view"
            />

            <ChartTableSection
                title="Statistics of delivered push notifications"
                description="Delivered push notifications in the selected period."
                rows={pushDevelopment}
                columns={DELIVERED_COLUMNS}
                series={[
                    { key: 'delivered', label: 'Delivered', color: 'var(--chart-2)' },
                ]}
                periodKey={periodKey}
                emptyMessage="No push notifications data for the selected period."
                queryKey="management-delivered-push-notifications-view"
            />

            <ChartTableSection
                title="Statistics of delivered SMS"
                description="Delivered SMS in the selected period."
                rows={smsDevelopment}
                columns={DELIVERED_COLUMNS}
                series={[
                    { key: 'delivered', label: 'Delivered', color: 'var(--chart-3)' },
                ]}
                periodKey={periodKey}
                emptyMessage="No SMS data for the selected period."
                queryKey="management-delivered-SMS-view"
            />

            <DataVisulaizationCard
                title="Ratio of available and taken advertising spaces"
                description={`Current state as of ${dateFormatter.format(to)}.`}
                queryKey="management-advertising-spaces"
            >
                {currentAdvertisingSpaces ? (
                    <PieChart
                        key={`advertising-spaces-${periodKey}`}
                        data={[
                            {
                                name: 'occupied',
                                value: currentAdvertisingSpaces.occupied,
                                fill: 'var(--color-occupied)',
                            },
                            {
                                name: 'free',
                                value: currentAdvertisingSpaces.free,
                                fill: 'var(--color-free)',
                            },
                        ]}
                        config={ADVERTISING_SPACES_CONFIG}
                        className="max-h-64"
                        innerRadius={56}
                    />
                ) : (
                    <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                        No advertising space data for the selected period.
                    </div>
                )}
            </DataVisulaizationCard>

            <ChartTableSection
                title="Total volume of business cases won in Kč"
                description="Value of won business cases in the selected period."
                rows={wonBusinessCasesDevelopment}
                columns={WON_BUSINESS_CASE_COLUMNS}
                series={WON_BUSINESS_CASE_SERIES}
                periodKey={periodKey}
                emptyMessage="No won business case data for the selected period."
                queryKey="management-won-business-cases-view"
            />

            <ChartTableSection
                title="Number of business cases created by status"
                description="Created business cases grouped by status in the selected period."
                rows={toBusinessCaseStatusRows(businessCaseDevelopment)}
                columns={BUSINESS_CASE_STATUS_COLUMNS}
                series={BUSINESS_CASE_STATUS_SERIES}
                periodKey={periodKey}
                emptyMessage="No business case data for the selected period."
                queryKey="management-business-case-status-view"
            />
        </div>
    )
}
