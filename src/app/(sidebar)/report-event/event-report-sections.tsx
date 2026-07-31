'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
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
    EVENT_REPORT_CHART_SERIES,
    EVENT_SALES_BY_DAY_CONFIG,
    EVENT_SALES_BY_PRICE_CONFIG,
    EVENT_SALES_BY_SECTOR_CONFIG,
    type EventReportData,
} from './data'

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

export function SalesByDaySection({
    data,
    eventId,
}: {
    data: EventReportData['salesByDay']
    eventId: string
}) {
    const total = data.reduce(
        (result, point) => ({
            count: result.count + point.count,
            revenue: result.revenue + (point.revenue ?? 0),
        }),
        { count: 0, revenue: 0 },
    )

    const chart =
        data.length > 0 ? (
            <BarChart
                key={`sales-by-day-${eventId}`}
                data={data}
                config={EVENT_SALES_BY_DAY_CONFIG}
                categoryKey="label"
                series={[...EVENT_REPORT_CHART_SERIES]}
                showYAxis
                className="h-80"
            />
        ) : (
            <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
                No ticket sales data for the selected event.
            </div>
        )

    const table = (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead className="text-right">Tickets sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((point) => (
                        <TableRow key={point.date}>
                            <TableCell className="font-medium">{point.label}</TableCell>
                            <TableCell className="text-right tabular-nums">
                                {numberFormatter.format(point.count)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {currencyFormatter.format(point.revenue ?? 0)}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={3}
                            className="text-muted-foreground h-24 text-center"
                        >
                            No ticket sales data for the selected event.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {data.length > 0 && (
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right tabular-nums">
                            {numberFormatter.format(total.count)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                            {currencyFormatter.format(total.revenue)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </Table>
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
            title="Sales by days"
            description="Number of tickets sold on individual sales days."
            tabs={tabs}
            queryKey="event-sales-by-day-view"
        />
    )
}

export function SalesByPriceSection({
    data,
    eventId,
}: {
    data: EventReportData['salesByPrice']
    eventId: string
}) {
    const total = data.reduce(
        (result, point) => ({
            count: result.count + point.count,
            revenue: result.revenue + (point.revenue ?? 0),
        }),
        { count: 0, revenue: 0 },
    )

    const chart =
        data.length > 0 ? (
            <BarChart
                key={`sales-by-price-${eventId}`}
                data={data}
                config={EVENT_SALES_BY_PRICE_CONFIG}
                categoryKey="label"
                series={[...EVENT_REPORT_CHART_SERIES]}
                showYAxis
                className="h-80"
            />
        ) : (
            <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
                No ticket price data for the selected event.
            </div>
        )

    const table = (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Tickets sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((point) => (
                        <TableRow key={point.price}>
                            <TableCell className="font-medium">{point.label}</TableCell>
                            <TableCell className="text-right tabular-nums">
                                {numberFormatter.format(point.count)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {currencyFormatter.format(point.revenue ?? 0)}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={3}
                            className="text-muted-foreground h-24 text-center"
                        >
                            No ticket price data for the selected event.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {data.length > 0 && (
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right tabular-nums">
                            {numberFormatter.format(total.count)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                            {currencyFormatter.format(total.revenue)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </Table>
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
            title="Number of tickets sold by price"
            description="Ticket volume grouped by price level."
            tabs={tabs}
            queryKey="event-sales-by-price-view"
        />
    )
}

export function SeasonTicketOverviewSection({
    data,
    eventId,
}: {
    data: EventReportData['seasonTicketFlow']
    eventId: string
}) {
    const hasData = data.nodes.length > 1 && data.links.length > 0

    return (
        <DataVisulaizationCard
            title="Overview of season tickets"
            description="Flow of season-ticket attendance, forwarding, gifting and resale."
            queryKey="event-season-ticket-overview"
        >
            {hasData ? (
                <SankeyChart
                    key={`season-ticket-flow-${eventId}`}
                    data={data}
                    className="h-160"
                    nodePadding={48}
                    margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                />
            ) : (
                <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
                    No season ticket data for the selected event.
                </div>
            )}
        </DataVisulaizationCard>
    )
}

export function TicketSalesOverviewSection({
    data,
    eventId,
}: {
    data: EventReportData['ticketSalesFlow']
    eventId: string
}) {
    const hasData = data.nodes.length > 1 && data.links.length > 0

    return (
        <DataVisulaizationCard
            title="Ticket sales overview"
            description="Paid and free tickets grouped by sales channel."
            queryKey="event-ticket-sales-overview"
        >
            {hasData ? (
                <SankeyChart
                    key={`ticket-sales-flow-${eventId}`}
                    data={data}
                    className="h-120"
                    nodePadding={28}
                    margin={{ top: 16, right: 180, bottom: 16, left: 16 }}
                />
            ) : (
                <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
                    No ticket sales data for the selected event.
                </div>
            )}
        </DataVisulaizationCard>
    )
}

export function SalesBySectorSection({
    data,
    eventId,
}: {
    data: EventReportData['salesBySector']
    eventId: string
}) {
    const total = data.reduce((sum, point) => sum + point.count, 0)

    const tabs: GraphCardTab[] = [
        {
            value: 'chart',
            name: 'Chart',
            icon: <ChartColumnIcon />,
            content: data.length ? (
                <BarChart
                    key={`event-sales-by-sector-${eventId}`}
                    data={data}
                    config={EVENT_SALES_BY_SECTOR_CONFIG}
                    categoryKey="label"
                    series={[...EVENT_REPORT_CHART_SERIES]}
                    showYAxis
                    className="h-80"
                />
            ) : (
                <div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
                    No sector sales data for the selected event.
                </div>
            ),
        },
        {
            value: 'table',
            name: 'Table',
            icon: <TableIcon />,
            content: (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sector</TableHead>
                            <TableHead className="text-right">Tickets sold</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((point) => (
                                <TableRow key={point.sector}>
                                    <TableCell className="font-medium">
                                        {point.label}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums">
                                        {numberFormatter.format(point.count)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="text-muted-foreground h-24 text-center"
                                >
                                    No sector sales data for the selected event.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {data.length > 0 && (
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell className="text-right tabular-nums">
                                    {numberFormatter.format(total)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            ),
        },
    ]

    return (
        <DataVisulaizationCard
            title="Tickets sold by sector"
            description="Ticket volume grouped by venue sector."
            tabs={tabs}
            queryKey="event-sales-by-sector-view"
        />
    )
}
