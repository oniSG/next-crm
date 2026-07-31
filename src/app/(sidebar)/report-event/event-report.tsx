'use client'

import type { ReactNode } from 'react'
import {
    CalendarCheckIcon,
    CalendarRangeIcon,
    ChartColumnIcon,
    CircleDollarSignIcon,
    HashIcon,
    MapPinIcon,
    ScanLineIcon,
    TableIcon,
    TicketCheckIcon,
} from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'

import {
    EVENT_REPORT_CHART_SERIES,
    EVENT_SALES_BY_DAY_CONFIG,
    EVENT_SALES_BY_PRICE_CONFIG,
    EVENT_SALES_BY_SECTOR_CONFIG,
    formatEventCount,
    formatEventCurrency,
    getReportEvent,
    SALES_BY_DAY_COLUMNS,
    SALES_BY_PRICE_COLUMNS,
    SALES_BY_SECTOR_COLUMNS,
    type EventReportChartPoint,
    type EventSalesByDayRow,
    type EventSalesByPriceRow,
    type EventSalesBySectorRow,
} from './data'
import { useEventReportFilters } from './report-utils'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

function sumSales(data: EventReportChartPoint[]) {
    return data.reduce(
        (result, point) => ({
            count: result.count + point.count,
            revenue: result.revenue + (point.revenue ?? 0),
        }),
        { count: 0, revenue: 0 },
    )
}

function chartOrEmpty(hasData: boolean, chart: ReactNode, emptyMessage: string) {
    if (hasData) return chart
    return (
        <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
            {emptyMessage}
        </div>
    )
}

function chartTableTabs({
    chart,
    table,
}: {
    chart: ReactNode
    table: ReactNode
}): GraphCardTab[] {
    return [
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
}

function SalesBarChart({
    chartKey,
    data,
    config,
}: {
    chartKey: string
    data: EventReportChartPoint[]
    config: ChartConfig
}) {
    return (
        <BarChart
            key={chartKey}
            data={data}
            config={config}
            categoryKey="label"
            series={[...EVENT_REPORT_CHART_SERIES]}
            showYAxis
            className="h-80"
        />
    )
}

export function EventReport() {
    const { eventId } = useEventReportFilters()
    const event = getReportEvent(eventId)

    if (!event) {
        return (
            <div className="text-muted-foreground flex min-h-64 w-full max-w-6xl items-center justify-center text-sm">
                Select an event to display its report.
            </div>
        )
    }

    const salesByDayTotal = sumSales(event.salesByDay)
    const salesByPriceTotal = sumSales(event.salesByPrice)
    const salesBySectorTotal = event.salesBySector.reduce(
        (sum, point) => sum + point.count,
        0,
    )
    const hasSeasonTicketFlow =
        event.seasonTicketFlow.nodes.length > 1 &&
        event.seasonTicketFlow.links.length > 0
    const hasTicketSalesFlow =
        event.ticketSalesFlow.nodes.length > 1 &&
        event.ticketSalesFlow.links.length > 0

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <Card className="relative gap-0 overflow-hidden py-0">
                <CardHeader className="bg-primary/8 gap-3 border-b p-4 sm:grid-cols-[1fr_auto]">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">CRM+ relatoo</Badge>
                            <span className="text-muted-foreground text-xs">
                                Event report
                            </span>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl">
                            {event.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5">
                            <MapPinIcon className="size-3.5" />
                            {event.venue}
                        </CardDescription>
                    </div>
                    <CardAction className="hidden sm:block">
                        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                            <CalendarCheckIcon className="size-6" />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    <HeaderDetail
                        icon={<CalendarCheckIcon />}
                        label="Event date"
                        value={dateFormatter.format(
                            new Date(`${event.date}T00:00:00`),
                        )}
                    />
                    <HeaderDetail
                        icon={<HashIcon />}
                        label="Event ID"
                        value={event.id}
                    />
                    <HeaderDetail
                        icon={<TicketCheckIcon />}
                        label="Capacity"
                        value={`${formatEventCount(event.capacity)} seats`}
                    />
                    <HeaderDetail
                        icon={<CalendarRangeIcon />}
                        label="Sales started"
                        value={dateFormatter.format(
                            new Date(`${event.startOfSale}T00:00:00`),
                        )}
                    />
                </CardContent>
            </Card>

            <section
                className="grid gap-4 md:grid-cols-3"
                aria-label="Event overview"
            >
                <KpiCard
                    label="Tickets sold / capacity"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={`${formatEventCount(event.tickets.sold)} / ${formatEventCount(event.tickets.capacity)}`}
                    content={[
                        {
                            label: 'Paid',
                            value: `${formatEventCount(event.tickets.paid)} pcs`,
                        },
                        {
                            label: 'Free',
                            value: `${formatEventCount(event.tickets.free)} pcs`,
                        },
                    ]}
                />
                <KpiCard
                    label="Total entries incl. season tickets"
                    icon={<ScanLineIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={formatEventCount(event.entrances.total)}
                    content={[
                        {
                            label: 'Tickets',
                            value: `${formatEventCount(event.entrances.tickets)} pcs`,
                        },
                        {
                            label: 'Season tickets',
                            value: `${formatEventCount(event.entrances.seasonTickets)} pcs`,
                        },
                        ...(event.entrances.unassigned > 0
                            ? [
                                  {
                                      label: 'Unassigned',
                                      value: `${formatEventCount(event.entrances.unassigned)} pcs`,
                                  },
                              ]
                            : []),
                    ]}
                />
                <KpiCard
                    label="Total revenue"
                    icon={<CircleDollarSignIcon className="size-4" />}
                    iconClassName="bg-chart-4/10 text-chart-4"
                    value={formatEventCurrency(event.revenue.total)}
                    content={[
                        {
                            label: 'Ticket sales',
                            value: formatEventCurrency(event.revenue.tickets),
                        },
                        {
                            label: 'Forwarded season tickets',
                            value: formatEventCurrency(
                                event.revenue.forwardedSeasonTickets,
                            ),
                        },
                    ]}
                />
            </section>

            <section>
                <DataVisulaizationCard
                    title="Sales by days"
                    description="Number of tickets sold on individual sales days."
                    queryKey="event-sales-by-day-view"
                    tabs={chartTableTabs({
                        chart: chartOrEmpty(
                            event.salesByDay.length > 0,
                            <SalesBarChart
                                chartKey={`sales-by-day-${event.id}`}
                                data={event.salesByDay}
                                config={EVENT_SALES_BY_DAY_CONFIG}
                            />,
                            'No ticket sales data for the selected event.',
                        ),
                        table: (
                            <SimpleTable<EventSalesByDayRow>
                                data={event.salesByDay}
                                columns={SALES_BY_DAY_COLUMNS}
                                getRowKey={(row) => row.date}
                                footer={[
                                    'Total',
                                    formatEventCount(salesByDayTotal.count),
                                    formatEventCurrency(salesByDayTotal.revenue),
                                ]}
                            />
                        ),
                    })}
                />
            </section>

            <section>
                <DataVisulaizationCard
                    title="Number of tickets sold by price"
                    description="Ticket volume grouped by price level."
                    queryKey="event-sales-by-price-view"
                    tabs={chartTableTabs({
                        chart: chartOrEmpty(
                            event.salesByPrice.length > 0,
                            <SalesBarChart
                                chartKey={`sales-by-price-${event.id}`}
                                data={event.salesByPrice}
                                config={EVENT_SALES_BY_PRICE_CONFIG}
                            />,
                            'No ticket price data for the selected event.',
                        ),
                        table: (
                            <SimpleTable<EventSalesByPriceRow>
                                data={event.salesByPrice}
                                columns={SALES_BY_PRICE_COLUMNS}
                                getRowKey={(row) => String(row.price)}
                                footer={[
                                    'Total',
                                    formatEventCount(salesByPriceTotal.count),
                                    formatEventCurrency(
                                        salesByPriceTotal.revenue,
                                    ),
                                ]}
                            />
                        ),
                    })}
                />
            </section>

            <section>
                <DataVisulaizationCard
                    title="Overview of season tickets"
                    description="Flow of season-ticket attendance, forwarding, gifting and resale."
                    queryKey="event-season-ticket-overview"
                >
                    {chartOrEmpty(
                        hasSeasonTicketFlow,
                        <SankeyChart
                            key={`season-ticket-flow-${event.id}`}
                            data={event.seasonTicketFlow}
                            className="h-160"
                            nodePadding={48}
                            margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                        />,
                        'No season ticket data for the selected event.',
                    )}
                </DataVisulaizationCard>
            </section>

            <section>
                <DataVisulaizationCard
                    title="Ticket sales overview"
                    description="Paid and free tickets grouped by sales channel."
                    queryKey="event-ticket-sales-overview"
                >
                    {chartOrEmpty(
                        hasTicketSalesFlow,
                        <SankeyChart
                            key={`ticket-sales-flow-${event.id}`}
                            data={event.ticketSalesFlow}
                            className="h-120"
                            nodePadding={28}
                            margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                        />,
                        'No ticket sales data for the selected event.',
                    )}
                </DataVisulaizationCard>
            </section>

            <section>
                <DataVisulaizationCard
                    title="Tickets sold by sector"
                    description="Ticket volume grouped by venue sector."
                    queryKey="event-sales-by-sector-view"
                    tabs={chartTableTabs({
                        chart: chartOrEmpty(
                            event.salesBySector.length > 0,
                            <SalesBarChart
                                chartKey={`sales-by-sector-${event.id}`}
                                data={event.salesBySector}
                                config={EVENT_SALES_BY_SECTOR_CONFIG}
                            />,
                            'No sector sales data for the selected event.',
                        ),
                        table: (
                            <SimpleTable<EventSalesBySectorRow>
                                data={event.salesBySector}
                                columns={SALES_BY_SECTOR_COLUMNS}
                                getRowKey={(row) => row.sector}
                                footer={[
                                    'Total',
                                    formatEventCount(salesBySectorTotal),
                                ]}
                            />
                        ),
                    })}
                />
            </section>
        </div>
    )
}

function HeaderDetail({
    icon,
    label,
    value,
}: {
    icon: ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-muted-foreground mt-0.5 [&_svg]:size-4">
                {icon}
            </span>
            <div>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-medium tabular-nums">{value}</p>
            </div>
        </div>
    )
}
