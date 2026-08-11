'use client'

import {
    ChartColumnIcon,
    MailIcon,
    MessageSquareTextIcon,
    SendIcon,
    TableIcon,
} from 'lucide-react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    ADVERTISING_SPACES_CONFIG,
    BUSINESS_CASE_STATUS_COLUMNS,
    BUSINESS_CASE_STATUS_SERIES,
    DELIVERED_COLUMNS,
    getManagementReportPeriodView,
    MANAGEMENT_REPORT_DATA,
    TICKET_CHANNEL_SERIES,
    TICKET_COUNT_COLUMNS,
    TICKET_REVENUE_COLUMNS,
    toBusinessCaseStatusRows,
    toChartConfig,
    toSectionFooter,
    toSectionTableColumns,
    toTicketCountRows,
    toTicketRevenueRows,
    VISITOR_GROWTH_COLUMNS,
    VISITOR_GROWTH_SERIES,
    VISITOR_TOTAL_COLUMNS,
    VISITOR_TOTAL_SERIES,
    WON_BUSINESS_CASE_COLUMNS,
    WON_BUSINESS_CASE_SERIES,
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
const WON_BUSINESS_CASE_CONFIG = toChartConfig(WON_BUSINESS_CASE_SERIES)
const WON_BUSINESS_CASE_KEYS = WON_BUSINESS_CASE_SERIES.map((item) => item.key)
const BUSINESS_CASE_STATUS_CONFIG = toChartConfig(BUSINESS_CASE_STATUS_SERIES)
const BUSINESS_CASE_STATUS_KEYS = BUSINESS_CASE_STATUS_SERIES.map(
    (item) => item.key,
)
const EMAIL_DELIVERED_SERIES = [
    { key: 'delivered', label: 'Delivered', color: 'var(--chart-1)' },
] as const
const PUSH_DELIVERED_SERIES = [
    { key: 'delivered', label: 'Delivered', color: 'var(--chart-2)' },
] as const
const SMS_DELIVERED_SERIES = [
    { key: 'delivered', label: 'Delivered', color: 'var(--chart-3)' },
] as const
const EMAIL_DELIVERED_CONFIG = toChartConfig([...EMAIL_DELIVERED_SERIES])
const PUSH_DELIVERED_CONFIG = toChartConfig([...PUSH_DELIVERED_SERIES])
const SMS_DELIVERED_CONFIG = toChartConfig([...SMS_DELIVERED_SERIES])

export function ReportManagement() {
    const { meta } = MANAGEMENT_REPORT_DATA
    const [from] = useQueryState('from', parseAsIsoDate.withDefault(defaultFrom))
    const [to] = useQueryState('to', parseAsIsoDate.withDefault(defaultTo))
    const dateRange = { from, to }
    const periodKey = `${from.toISOString()}-${to.toISOString()}`
    const {
        fanDevelopment,
        ticketDevelopment,
        emailDevelopment,
        pushDevelopment,
        smsDevelopment,
        wonBusinessCasesDevelopment,
        businessCaseDevelopment,
        lastFanPoint,
        fanNetGrowth,
        seasonTicketsSold,
        seasonTicketsRevenue,
        ticketsSold,
        ticketsRevenue,
        ticketsEventCount,
        emailDelivered,
        emailOpenRate,
        emailClickRate,
        pushDelivered,
        pushFailed,
        pushFailureRate,
        smsDelivered,
        smsFailed,
        currentAdvertisingSpaces,
    } = getManagementReportPeriodView(MANAGEMENT_REPORT_DATA, dateRange)

    const ticketRevenueRows = toTicketRevenueRows(ticketDevelopment)
    const ticketCountRows = toTicketCountRows(ticketDevelopment)
    const businessCaseStatusRows = toBusinessCaseStatusRows(
        businessCaseDevelopment,
    )

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
                        value: dateTimeFormatter.format(new Date(meta.generatedAt)),
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
                            label: 'Počet událostí (zápasů,...)',
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
                                    columns={toSectionTableColumns(
                                        TICKET_COUNT_COLUMNS,
                                    )}
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
                                    columns={toSectionTableColumns(
                                        VISITOR_TOTAL_COLUMNS,
                                    )}
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

            <DataVisulaizationCard
                title="Statistics of delivered e-mails"
                description="Delivered e-mails in the selected period."
                queryKey="management-delivered-e-mails-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            emailDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-delivered-emails-chart-${periodKey}`}
                                    data={emailDevelopment}
                                    config={EMAIL_DELIVERED_CONFIG}
                                    categoryKey="label"
                                    series={['delivered']}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No e-mails data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            emailDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-delivered-emails-table-${periodKey}`}
                                    data={emailDevelopment}
                                    columns={toSectionTableColumns(DELIVERED_COLUMNS)}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        emailDevelopment,
                                        DELIVERED_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No e-mails data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Statistics of delivered push notifications"
                description="Delivered push notifications in the selected period."
                queryKey="management-delivered-push-notifications-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            pushDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-delivered-push-chart-${periodKey}`}
                                    data={pushDevelopment}
                                    config={PUSH_DELIVERED_CONFIG}
                                    categoryKey="label"
                                    series={['delivered']}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No push notifications data for the selected
                                    period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            pushDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-delivered-push-table-${periodKey}`}
                                    data={pushDevelopment}
                                    columns={toSectionTableColumns(DELIVERED_COLUMNS)}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        pushDevelopment,
                                        DELIVERED_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No push notifications data for the selected
                                    period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Statistics of delivered SMS"
                description="Delivered SMS in the selected period."
                queryKey="management-delivered-SMS-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            smsDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-delivered-sms-chart-${periodKey}`}
                                    data={smsDevelopment}
                                    config={SMS_DELIVERED_CONFIG}
                                    categoryKey="label"
                                    series={['delivered']}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No SMS data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            smsDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-delivered-sms-table-${periodKey}`}
                                    data={smsDevelopment}
                                    columns={toSectionTableColumns(DELIVERED_COLUMNS)}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        smsDevelopment,
                                        DELIVERED_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No SMS data for the selected period.
                                </div>
                            ),
                    },
                ]}
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

            <DataVisulaizationCard
                title="Total volume of business cases won in Kč"
                description="Value of won business cases in the selected period."
                queryKey="management-won-business-cases-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            wonBusinessCasesDevelopment.length > 0 ? (
                                <BarChart
                                    key={`management-won-business-cases-chart-${periodKey}`}
                                    data={wonBusinessCasesDevelopment}
                                    config={WON_BUSINESS_CASE_CONFIG}
                                    categoryKey="label"
                                    series={WON_BUSINESS_CASE_KEYS}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="CZK"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No won business case data for the selected
                                    period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            wonBusinessCasesDevelopment.length > 0 ? (
                                <SimpleTable
                                    key={`management-won-business-cases-table-${periodKey}`}
                                    data={wonBusinessCasesDevelopment}
                                    columns={toSectionTableColumns(
                                        WON_BUSINESS_CASE_COLUMNS,
                                    )}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        wonBusinessCasesDevelopment,
                                        WON_BUSINESS_CASE_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No won business case data for the selected
                                    period.
                                </div>
                            ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Number of business cases created by status"
                description="Created business cases grouped by status in the selected period."
                queryKey="management-business-case-status-view"
                tabs={[
                    {
                        name: 'Chart',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content:
                            businessCaseStatusRows.length > 0 ? (
                                <BarChart
                                    key={`management-business-case-status-chart-${periodKey}`}
                                    data={businessCaseStatusRows}
                                    config={BUSINESS_CASE_STATUS_CONFIG}
                                    categoryKey="label"
                                    series={BUSINESS_CASE_STATUS_KEYS}
                                    showYAxis
                                    xAxisLabel="Month"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                                    No business case data for the selected period.
                                </div>
                            ),
                    },
                    {
                        name: 'Table',
                        value: 'table',
                        icon: <TableIcon />,
                        content:
                            businessCaseStatusRows.length > 0 ? (
                                <SimpleTable
                                    key={`management-business-case-status-table-${periodKey}`}
                                    data={businessCaseStatusRows}
                                    columns={toSectionTableColumns(
                                        BUSINESS_CASE_STATUS_COLUMNS,
                                    )}
                                    getRowKey={(row) => row.period}
                                    footer={toSectionFooter(
                                        businessCaseStatusRows,
                                        BUSINESS_CASE_STATUS_COLUMNS,
                                    )}
                                />
                            ) : (
                                <div className="text-muted-foreground flex h-24 items-center justify-center text-sm">
                                    No business case data for the selected period.
                                </div>
                            ),
                    },
                ]}
            />
        </div>
    )
}
