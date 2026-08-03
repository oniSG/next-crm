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
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import type { ChartConfig } from '@/components/ui/chart'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    ADVERTISING_SPACES_CONFIG,
    BUSINESS_CASE_STATUS_COLUMNS,
    BUSINESS_CASE_STATUS_SERIES,
    DELIVERED_COLUMNS,
    MANAGEMENT_REPORT_DATA,
    TICKET_CHANNEL_SERIES,
    TICKET_COUNT_COLUMNS,
    TICKET_REVENUE_COLUMNS,
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

function formatValue(value: number, format: ReportTableColumn['format']) {
    if (format === 'currency') return currencyFormatter.format(value)
    const formatted = numberFormatter.format(value)
    if (format === 'signed' && value >= 0) return `+${formatted}`
    return formatted
}

function ChartTableSection({
    title,
    description,
    rows,
    columns,
    series,
    periodKey,
    chartType = 'bar',
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
    chartType?: 'bar' | 'line'
    stacked?: boolean
    showTotals?: boolean
    emptyMessage: string
    queryKey: string
}) {
    const config = Object.fromEntries(
        series.map((item) => [item.key, { label: item.label, color: item.color }]),
    ) satisfies ChartConfig
    const totals = columns.reduce<Record<string, number>>((result, column) => {
        result[column.key] = rows.reduce(
            (sum, row) => sum + Number(row[column.key] ?? 0),
            0,
        )
        return result
    }, {})

    const chart =
        rows.length > 0 ? (
            chartType === 'line' ? (
                <LineChart
                    key={`${queryKey}-chart-${periodKey}`}
                    data={rows}
                    config={config}
                    categoryKey="label"
                    series={series.map((item) => item.key)}
                    showYAxis
                    showDots
                    className="h-80"
                />
            ) : (
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
            )
        ) : (
            <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                {emptyMessage}
            </div>
        )

    const table = (
        <div key={`${queryKey}-table-${periodKey}`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Month</TableHead>
                        {columns.map((column) => (
                            <TableHead key={column.key} className="text-right">
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={row.period}>
                                <TableCell className="font-medium">{row.label}</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className={
                                            column.emphasize
                                                ? 'text-right font-medium tabular-nums'
                                                : 'text-right tabular-nums'
                                        }
                                    >
                                        {formatValue(
                                            Number(row[column.key] ?? 0),
                                            column.format,
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + 1}
                                className="text-muted-foreground h-24 text-center"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                {showTotals && rows.length > 0 && (
                    <TableFooter>
                        <TableRow>
                            <TableCell>Total</TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    className="text-right tabular-nums"
                                >
                                    {formatValue(totals[column.key], column.format)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
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

function TicketRevenueSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Development of revenue from tickets sold"
            description="Revenue by sales channel in the selected period."
            columns={TICKET_REVENUE_COLUMNS}
            series={TICKET_CHANNEL_SERIES}
            stacked
            emptyMessage="No ticket sales data for the selected period."
            queryKey="management-ticket-revenue-view"
        />
    )
}

function TicketCountSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Number of tickets sold"
            description="Ticket volume by sales channel in the selected period."
            columns={TICKET_COUNT_COLUMNS}
            series={TICKET_CHANNEL_SERIES}
            stacked
            emptyMessage="No ticket sales data for the selected period."
            queryKey="management-ticket-count-view"
        />
    )
}

function VisitorTotalSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Development of the total number of visitors"
            description="Total number of visitors at the end of each month in the selected period."
            columns={VISITOR_TOTAL_COLUMNS}
            series={VISITOR_TOTAL_SERIES}
            chartType="line"
            showTotals={false}
            emptyMessage="No visitor data for the selected period."
            queryKey="management-visitor-total-view"
        />
    )
}

function VisitorGrowthSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Growth in the number of visitors"
            description="New and removed visitors in the selected period."
            columns={VISITOR_GROWTH_COLUMNS}
            series={VISITOR_GROWTH_SERIES}
            emptyMessage="No visitor growth data for the selected period."
            queryKey="management-visitor-growth-view"
        />
    )
}

function DeliveredSection({
    channel,
    color,
    ...props
}: {
    channel: 'e-mails' | 'push notifications' | 'SMS'
    color: string
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title={`Statistics of delivered ${channel}`}
            description={`Delivered ${channel} in the selected period.`}
            columns={DELIVERED_COLUMNS}
            series={[{ key: 'delivered', label: 'Delivered', color }]}
            emptyMessage={`No ${channel} data for the selected period.`}
            queryKey={`management-delivered-${channel.replaceAll(' ', '-')}-view`}
        />
    )
}

function DeliveredEmailSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return <DeliveredSection {...props} channel="e-mails" color="var(--chart-1)" />
}

function DeliveredPushSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return (
        <DeliveredSection
            {...props}
            channel="push notifications"
            color="var(--chart-2)"
        />
    )
}

function DeliveredSmsSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return <DeliveredSection {...props} channel="SMS" color="var(--chart-3)" />
}

function WonBusinessCasesSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Total volume of business cases won in Kč"
            description="Value of won business cases in the selected period."
            columns={WON_BUSINESS_CASE_COLUMNS}
            series={WON_BUSINESS_CASE_SERIES}
            emptyMessage="No won business case data for the selected period."
            queryKey="management-won-business-cases-view"
        />
    )
}

function BusinessCaseStatusSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Number of business cases created by status"
            description="Created business cases grouped by status in the selected period."
            columns={BUSINESS_CASE_STATUS_COLUMNS}
            series={BUSINESS_CASE_STATUS_SERIES}
            emptyMessage="No business case data for the selected period."
            queryKey="management-business-case-status-view"
        />
    )
}

function AdvertisingSpacesSection({
    occupied,
    free,
    dateLabel,
    periodKey,
}: {
    occupied?: number
    free?: number
    dateLabel: string
    periodKey: string
}) {
    const hasData = occupied !== undefined && free !== undefined
    const data = hasData
        ? [
              {
                  name: 'occupied',
                  value: occupied,
                  fill: 'var(--color-occupied)',
              },
              {
                  name: 'free',
                  value: free,
                  fill: 'var(--color-free)',
              },
          ]
        : []

    return (
        <DataVisulaizationCard
            title="Ratio of available and taken advertising spaces"
            description={`Current state as of ${dateLabel}.`}
            queryKey="management-advertising-spaces"
        >
            {hasData ? (
                <PieChart
                    key={`advertising-spaces-${periodKey}`}
                    data={data}
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
    )
}

function toPeriod(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function ReportManagement() {
    const { meta, fans, seasonTickets, tickets, communication } = MANAGEMENT_REPORT_DATA
    const [from] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(new Date(2026, 0, 1)),
    )
    const [to] = useQueryState(
        'to',
        parseAsIsoDate.withDefault(new Date(2026, 5, 30)),
    )
    const dateRange = { from, to }
    const periodFrom = toPeriod(from)
    const periodTo = toPeriod(to)
    const periodKey = `${periodFrom}-${periodTo}`

    const fanDevelopment = fans.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const seasonTicketDevelopment = seasonTickets.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const ticketDevelopment = tickets.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const emailDevelopment = communication.email.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const pushDevelopment = communication.push.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const smsDevelopment = communication.sms.development.filter(
        (point) => point.period >= periodFrom && point.period <= periodTo,
    )
    const advertisingDevelopment =
        MANAGEMENT_REPORT_DATA.business.advertisingSpaces.development.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )
    const wonBusinessCasesDevelopment =
        MANAGEMENT_REPORT_DATA.business.wonCases.development.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )
    const businessCaseDevelopment =
        MANAGEMENT_REPORT_DATA.business.caseDevelopment.filter(
            (point) => point.period >= periodFrom && point.period <= periodTo,
        )

    const lastFanPoint = fanDevelopment.at(-1)
    const currentFanCount = lastFanPoint?.total ?? 0
    const blockedFanCount = lastFanPoint?.blocked ?? 0
    const fanNetGrowth = fanDevelopment.reduce((sum, point) => sum + point.netChange, 0)
    const seasonTicketSummary = seasonTicketDevelopment.reduce(
        (summary, point) => ({
            sold: summary.sold + point.sold,
            revenue: summary.revenue + point.revenue,
        }),
        { sold: 0, revenue: 0 },
    )
    const ticketSummary = ticketDevelopment.reduce(
        (summary, point) => ({
            sold: summary.sold + point.total.count,
            revenue: summary.revenue + point.total.revenue,
            eventCount: summary.eventCount + point.eventCount,
        }),
        { sold: 0, revenue: 0, eventCount: 0 },
    )
    const ticketRevenueChartData = ticketDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.revenue,
        boxOffice: point.boxOffice.revenue,
        administration: point.administration.revenue,
        mobileApp: point.mobileApp.revenue,
        partner: point.partner.revenue,
        total: point.total.revenue,
    }))
    const ticketCountChartData = ticketDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        online: point.online.count,
        boxOffice: point.boxOffice.count,
        administration: point.administration.count,
        mobileApp: point.mobileApp.count,
        partner: point.partner.count,
        total: point.total.count,
    }))
    const emailSummary = emailDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
            openedUnique: summary.openedUnique + (point.openedUnique ?? 0),
            clickedUnique: summary.clickedUnique + (point.clickedUnique ?? 0),
        }),
        { delivered: 0, failed: 0, openedUnique: 0, clickedUnique: 0 },
    )
    const pushSummary = pushDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
        }),
        { delivered: 0, failed: 0 },
    )
    const smsSummary = smsDevelopment.reduce(
        (summary, point) => ({
            delivered: summary.delivered + point.delivered,
            failed: summary.failed + point.failed,
        }),
        { delivered: 0, failed: 0 },
    )
    const emailOpenRate = emailSummary.delivered
        ? (emailSummary.openedUnique / emailSummary.delivered) * 100
        : 0
    const emailClickRate = emailSummary.delivered
        ? (emailSummary.clickedUnique / emailSummary.delivered) * 100
        : 0
    const pushTotal = pushSummary.delivered + pushSummary.failed
    const pushFailureRate = pushTotal ? (pushSummary.failed / pushTotal) * 100 : 0
    const currentAdvertisingSpaces = advertisingDevelopment.at(-1)
    const businessCaseStatusData = businessCaseDevelopment.map((point) => ({
        period: point.period,
        label: point.label,
        won: point.won.count,
        open: point.open.count,
        cancelled: point.cancelled.count,
        total: point.won.count + point.open.count + point.cancelled.count,
    }))

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
                        value: `${dateFormatter.format(dateRange.from)} – ${dateFormatter.format(dateRange.to)}`,
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
                    value={numberFormatter.format(currentFanCount)}
                    content={[
                        {
                            label: 'Blocked',
                            value: numberFormatter.format(blockedFanCount),
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
                    value={currencyFormatter.format(seasonTicketSummary.revenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: numberFormatter.format(seasonTicketSummary.sold),
                        },
                        {
                            label: 'Average price',
                            value: currencyFormatter.format(
                                seasonTicketSummary.sold
                                    ? seasonTicketSummary.revenue /
                                          seasonTicketSummary.sold
                                    : 0,
                            ),
                        },
                    ]}
                />
                <KpiCard
                    label="Tickets"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={currencyFormatter.format(ticketSummary.revenue)}
                    content={[
                        {
                            label: 'Sold',
                            value: numberFormatter.format(ticketSummary.sold),
                        },
                        {
                            label: 'Events',
                            value: numberFormatter.format(ticketSummary.eventCount),
                        },
                    ]}
                />
            </section>

            <TicketRevenueSection rows={ticketRevenueChartData} periodKey={periodKey} />

            <TicketCountSection rows={ticketCountChartData} periodKey={periodKey} />

            <VisitorTotalSection rows={fanDevelopment} periodKey={periodKey} />

            <VisitorGrowthSection rows={fanDevelopment} periodKey={periodKey} />

            <section
                className="grid gap-4 md:grid-cols-3"
                aria-label="Communication overview"
            >
                <KpiCard
                    label="E-mail"
                    icon={<MailIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={numberFormatter.format(emailSummary.delivered)}
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
                    value={numberFormatter.format(pushSummary.delivered)}
                    content={[
                        {
                            label: 'Not delivered',
                            value: `${pushFailureRate.toFixed(1)} %`,
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(pushSummary.failed),
                        },
                    ]}
                />
                <KpiCard
                    label="SMS"
                    icon={<MessageSquareTextIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={numberFormatter.format(smsSummary.delivered)}
                    content={[
                        {
                            label: 'Delivered',
                            value: numberFormatter.format(smsSummary.delivered),
                        },
                        {
                            label: 'Failed',
                            value: numberFormatter.format(smsSummary.failed),
                        },
                    ]}
                />
            </section>

            <DeliveredEmailSection rows={emailDevelopment} periodKey={periodKey} />

            <DeliveredPushSection rows={pushDevelopment} periodKey={periodKey} />

            <DeliveredSmsSection rows={smsDevelopment} periodKey={periodKey} />

            <AdvertisingSpacesSection
                occupied={currentAdvertisingSpaces?.occupied}
                free={currentAdvertisingSpaces?.free}
                dateLabel={dateFormatter.format(dateRange.to)}
                periodKey={periodKey}
            />

            {/* Fulfillment of business plans remains intentionally hidden. */}

            <WonBusinessCasesSection
                rows={wonBusinessCasesDevelopment}
                periodKey={periodKey}
            />

            <BusinessCaseStatusSection
                rows={businessCaseStatusData}
                periodKey={periodKey}
            />
        </div>
    )
}
