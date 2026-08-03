'use client'

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
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import {
    EVENT_REPORT_CHART_SERIES,
    EVENT_SALES_BY_DAY_CONFIG,
    EVENT_SALES_BY_PRICE_CONFIG,
    EVENT_SALES_BY_SECTOR_CONFIG,
    formatEventCount,
    formatEventCurrency,
    getReportEvent,
    REPORT_EVENT_OPTIONS,
    SALES_BY_DAY_COLUMNS,
    SALES_BY_PRICE_COLUMNS,
    SALES_BY_SECTOR_COLUMNS,
    type EventReportChartPoint,
} from './data'
import { filterEventsByDateRange, useEventReportFilters } from './report-utils'

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

export function EventReport() {
    const { dateRange, eventId, setEventId, headerVisible } = useEventReportFilters()
    const event = getReportEvent(eventId)
    const visibleEvents = filterEventsByDateRange(REPORT_EVENT_OPTIONS, dateRange)

    if (!event) {
        return (
            <div className="flex w-full max-w-6xl flex-col gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Select an event</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Choose an event to display its sales and attendance report.
                    </p>
                </div>

                {visibleEvents.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleEvents.map((option) => {
                            const eventData = getReportEvent(option.id)

                            return (
                                <KpiCard
                                    key={option.id}
                                    onClick={() => void setEventId(option.id)}
                                    ariaLabel={`Open report for ${option.name}`}
                                    className="min-h-48"
                                    label={`${dateFormatter.format(new Date(`${option.date}T00:00:00`))} · ${option.id}`}
                                    value={option.name}
                                    valueClassName="text-xl leading-snug"
                                    icon={<CalendarCheckIcon className="size-4" />}
                                    iconClassName="bg-primary/10 text-primary"
                                    content={[
                                        {
                                            label: 'Venue',
                                            value:
                                                eventData?.venue ?? 'Venue not specified',
                                        },
                                        {
                                            label: 'Capacity',
                                            value: `${formatEventCount(option.capacity)} seats`,
                                        },
                                    ]}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-muted-foreground flex min-h-48 items-center justify-center rounded-xl border border-dashed text-sm">
                        No events in the selected period.
                    </div>
                )}
            </div>
        )
    }

    const salesByDayTotal = sumSales(event.salesByDay)
    const salesByPriceTotal = sumSales(event.salesByPrice)
    const salesBySectorTotal = event.salesBySector.reduce(
        (sum, point) => sum + point.count,
        0,
    )

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                exportOnly
                title={event.name}
                description="Overview of ticket sales, entrances and revenue for this event."
                icon={<CalendarCheckIcon className="size-6" />}
                itemsClassName="lg:grid-cols-5"
                items={[
                    {
                        title: 'Event date',
                        value: dateFormatter.format(new Date(`${event.date}T00:00:00`)),
                    },
                    {
                        title: 'Event ID',
                        value: event.id,
                    },
                    {
                        title: 'Capacity',
                        value: `${formatEventCount(event.capacity)} seats`,
                    },
                    {
                        title: 'Sales started',
                        value: dateFormatter.format(
                            new Date(`${event.startOfSale}T00:00:00`),
                        ),
                    },
                    {
                        title: 'Venue',
                        value: event.venue,
                    },
                ]}
            />

            {!headerVisible && (
                <Card className="gap-0">
                    <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
                            className="sm:border-l sm:pl-6"
                        />
                        <HeaderDetail
                            icon={<TicketCheckIcon />}
                            label="Capacity"
                            value={`${formatEventCount(event.capacity)} seats`}
                            className="lg:border-l lg:pl-6"
                        />
                        <HeaderDetail
                            icon={<CalendarRangeIcon />}
                            label="Sales started"
                            value={dateFormatter.format(
                                new Date(`${event.startOfSale}T00:00:00`),
                            )}
                            className="sm:border-l sm:pl-6"
                        />
                        <HeaderDetail
                            icon={<MapPinIcon />}
                            label="Venue"
                            value={event.venue}
                            className="lg:border-l lg:pl-6"
                        />
                    </CardContent>
                </Card>
            )}

            <section className="grid gap-4 md:grid-cols-3" aria-label="Event overview">
                <KpiCard
                    label="Tickets sold"
                    icon={<TicketCheckIcon className="size-4" />}
                    iconClassName="bg-chart-1/10 text-chart-1"
                    value={`${((event.tickets.sold / event.tickets.capacity) * 100).toFixed(1)} %`}
                    metric={{
                        label: 'Počet',
                        value: formatEventCount(event.tickets.sold),
                    }}
                    content={[
                        {
                            label: 'Paid',
                            value: formatEventCount(event.tickets.paid),
                        },
                        {
                            label: 'Free',
                            value: formatEventCount(event.tickets.free),
                        },
                    ]}
                />
                <KpiCard
                    label="Total entries"
                    icon={<ScanLineIcon className="size-4" />}
                    iconClassName="bg-chart-2/10 text-chart-2"
                    value={formatEventCount(event.entrances.total)}
                    content={[
                        {
                            label: 'Tickets',
                            value: formatEventCount(event.entrances.tickets),
                        },
                        {
                            label: 'Season tickets',
                            value: formatEventCount(event.entrances.seasonTickets),
                        },
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
                    tabs={[
                        {
                            name: 'Chart',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    key={`sales-by-day-${event.id}`}
                                    data={event.salesByDay}
                                    config={EVENT_SALES_BY_DAY_CONFIG}
                                    categoryKey="label"
                                    series={[...EVENT_REPORT_CHART_SERIES]}
                                    showYAxis
                                    xAxisLabel="Date"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ),
                        },
                        {
                            name: 'Table',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
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
                        },
                    ]}
                />
            </section>

            <section>
                <DataVisulaizationCard
                    title="Number of tickets sold by price"
                    description="Ticket volume grouped by price level."
                    queryKey="event-sales-by-price-view"
                    tabs={[
                        {
                            name: 'Chart',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    key={`sales-by-price-${event.id}`}
                                    data={event.salesByPrice}
                                    config={EVENT_SALES_BY_PRICE_CONFIG}
                                    categoryKey="label"
                                    series={[...EVENT_REPORT_CHART_SERIES]}
                                    showYAxis
                                    xAxisLabel="Price category"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ),
                        },
                        {
                            name: 'Table',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
                                    data={event.salesByPrice}
                                    columns={SALES_BY_PRICE_COLUMNS}
                                    getRowKey={(row) => String(row.price)}
                                    footer={[
                                        'Total',
                                        formatEventCount(salesByPriceTotal.count),
                                        formatEventCurrency(salesByPriceTotal.revenue),
                                    ]}
                                />
                            ),
                        },
                    ]}
                />
            </section>

            <section>
                <DataVisulaizationCard
                    title="Overview of season tickets"
                    description="Flow of season-ticket attendance, forwarding, gifting and resale."
                    queryKey="event-season-ticket-overview"
                >
                    <SankeyChart
                        key={`season-ticket-flow-${event.id}`}
                        data={event.seasonTicketFlow}
                        className="h-160"
                        nodePadding={48}
                        margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                    />
                </DataVisulaizationCard>
            </section>

            <section>
                <DataVisulaizationCard
                    title="Ticket sales overview"
                    description="Paid and free tickets grouped by sales channel."
                    queryKey="event-ticket-sales-overview"
                >
                    <SankeyChart
                        key={`ticket-sales-flow-${event.id}`}
                        data={event.ticketSalesFlow}
                        className="h-120"
                        nodePadding={28}
                        margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                    />
                </DataVisulaizationCard>
            </section>

            <section>
                <DataVisulaizationCard
                    title="Tickets sold by sector"
                    description="Ticket volume grouped by venue sector."
                    queryKey="event-sales-by-sector-view"
                    tabs={[
                        {
                            name: 'Chart',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    key={`sales-by-sector-${event.id}`}
                                    data={event.salesBySector}
                                    config={EVENT_SALES_BY_SECTOR_CONFIG}
                                    categoryKey="label"
                                    series={[...EVENT_REPORT_CHART_SERIES]}
                                    showYAxis
                                    xAxisLabel="Sector"
                                    yAxisLabel="Count"
                                    className="h-80"
                                />
                            ),
                        },
                        {
                            name: 'Table',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
                                    data={event.salesBySector}
                                    columns={SALES_BY_SECTOR_COLUMNS}
                                    getRowKey={(row) => row.sector}
                                    footer={[
                                        'Total',
                                        formatEventCount(salesBySectorTotal),
                                    ]}
                                />
                            ),
                        },
                    ]}
                />
            </section>
        </div>
    )
}

function HeaderDetail({
    icon,
    label,
    value,
    className,
}: {
    icon: React.ReactNode
    label: string
    value: string
    className?: string
}) {
    return (
        <div className={cn('flex items-start gap-3', className)}>
            <span className="text-muted-foreground mt-0.5 [&_svg]:size-4">{icon}</span>
            <div>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-1 font-medium tabular-nums">{value}</p>
            </div>
        </div>
    )
}
