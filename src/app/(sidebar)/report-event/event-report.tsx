'use client'

import {
    ChartColumnIcon,
    CircleDollarSignIcon,
    ScanLineIcon,
    TableIcon,
    TicketCheckIcon,
} from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    EVENT_REPORT_CHART_SERIES,
    EVENT_SALES_BY_DAY_CONFIG,
    EVENT_SALES_BY_PRICE_CONFIG,
    EVENT_SALES_BY_SECTOR_CONFIG,
    EVENT_SOLD_USED_CONFIG,
    formatEventCount,
    formatEventCurrency,
    getEventSoldUsedRows,
    REPORT_EVENT,
    SALES_BY_DAY_COLUMNS,
    SALES_BY_PRICE_COLUMNS,
    SALES_BY_SECTOR_COLUMNS,
    SOLD_USED_COLUMNS,
    type EventReportChartPoint,
} from './data'

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
    useQueryState(
        'event',
        parseAsString.withDefault(REPORT_EVENT.id).withOptions({ clearOnDefault: false }),
    )
    const event = REPORT_EVENT

    const salesByDayTotal = sumSales(event.salesByDay)
    const salesByPriceTotal = sumSales(event.salesByPrice)
    const salesBySectorTotal = event.salesBySector.reduce(
        (sum, point) => sum + point.count,
        0,
    )
    const soldUsedRows = getEventSoldUsedRows(event)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title={event.name}
                description="Overview of ticket sales, entrances and revenue for this event."
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
                    title="Počty prodaných vstupenek dle dní"
                    queryKey="event-sales-by-day-view"
                    action={
                        <InfoTooltip>
                            Přehled počtu vstupenek na událost prodaných v jednotlivé dny.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'sales-by-days',
                        headers: ['Day', 'Tickets sold', 'Revenue'],
                        rows: event.salesByDay.map((row) => [
                            row.label,
                            row.count,
                            row.revenue ?? 0,
                        ]),
                    }}
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
                                    xAxisLabel="Datum"
                                    yAxisLabel="Počet"
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
                    title="Počty prodaných vstupenek dle ceny"
                    queryKey="event-sales-by-price-view"
                    action={
                        <InfoTooltip>
                            Přehled počtu prodaných vstupenek v určených cenových
                            kategoriích.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'number-of-tickets-sold-by-price',
                        headers: ['Price', 'Tickets sold', 'Revenue'],
                        rows: event.salesByPrice.map((row) => [
                            row.label,
                            row.count,
                            row.revenue ?? 0,
                        ]),
                    }}
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
                                    xAxisLabel="Cenová kategorie"
                                    yAxisLabel="Počet"
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
                    title="Přehled využití permanentek"
                    queryKey="event-season-ticket-overview"
                    action={
                        <InfoTooltip>
                            Vizuální reprezentace využití permanentek na vstup na danou
                            událost.
                        </InfoTooltip>
                    }
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
                    title="Přehled prodeje vstupenek"
                    queryKey="event-ticket-sales-overview"
                    action={
                        <InfoTooltip>
                            Vizuální reprezentace poměrů prodeje vstupenek podle ceny a
                            prodejního kanálu.
                        </InfoTooltip>
                    }
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
                    title="Prodané vstupenky po sektorech"
                    queryKey="event-sales-by-sector-view"
                    action={
                        <InfoTooltip>
                            Přehled prodaných vstupenek v jednotlivých sektorech.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'tickets-sold-by-sector',
                        headers: ['Sector', 'Tickets sold'],
                        rows: event.salesBySector.map((row) => [row.label, row.count]),
                    }}
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
                                    xAxisLabel="Sektor"
                                    yAxisLabel="Počet"
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

            <section>
                <DataVisulaizationCard
                    title="Přehled využití permanentek"
                    queryKey="event-sold-used-view"
                    action={
                        <InfoTooltip>
                            Vizuální reprezentace využití permanentek na vstup na danou
                            událost.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'pomer-prodanych-a-vyuzitych-vstupenek',
                        headers: ['Kategorie', 'Počet'],
                        rows: soldUsedRows.map((row) => [row.label, row.count]),
                    }}
                    tabs={[
                        {
                            name: 'Chart',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    key={`sold-used-${event.id}`}
                                    data={soldUsedRows}
                                    config={EVENT_SOLD_USED_CONFIG}
                                    categoryKey="label"
                                    series={[...EVENT_REPORT_CHART_SERIES]}
                                    orientation="horizontal"
                                    showYAxis
                                    xAxisLabel="Počet"
                                    yAxisLabel="Kategorie"
                                    className="h-56"
                                />
                            ),
                        },
                        {
                            name: 'Table',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
                                    data={soldUsedRows}
                                    columns={SOLD_USED_COLUMNS}
                                    getRowKey={(row) => row.id}
                                />
                            ),
                        },
                    ]}
                />
            </section>
        </div>
    )
}
