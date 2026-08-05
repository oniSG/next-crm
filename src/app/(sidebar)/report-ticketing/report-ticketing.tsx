'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    formatTicketingCount,
    SEASON_TICKETS_SOLD_USED_CONFIG,
    SOLD_USED_COLUMNS,
    SOLD_USED_SERIES,
    sumSoldUsed,
    sumTicketsVsSeasonTickets,
    TICKETING_REPORT_DATA,
    TICKETS_BY_EVENT_CONFIG,
    TICKETS_SOLD_USED_CONFIG,
    TICKETS_VS_SEASON_TICKETS_COLUMNS,
    TICKETS_VS_SEASON_TICKETS_CONFIG,
    TICKETS_VS_SEASON_TICKETS_SERIES,
    topSoldUsedByTotal,
} from './data'

export function ReportTicketing() {
    const report = TICKETING_REPORT_DATA
    const ticketsByEvent = topSoldUsedByTotal(report.ticketsSoldUsedByEvent, 10)
    const ticketsByEventTotal = sumSoldUsed(ticketsByEvent)
    const ticketsVsSeasonTickets = report.ticketsVsSeasonTicketsBySeason
    const ticketsVsSeasonTicketsTotal =
        sumTicketsVsSeasonTickets(ticketsVsSeasonTickets)
    const seasonTicketsBySeason = report.seasonTicketsSoldUsedBySeason
    const seasonTicketsBySeasonTotal = sumSoldUsed(seasonTicketsBySeason)
    const ticketsBySeason = report.ticketsSoldUsedBySeason
    const ticketsBySeasonTotal = sumSoldUsed(ticketsBySeason)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Ticketing"
                description="Přehled prodaných a použitých vstupenek a permanentek."
            />

            <DataVisulaizationCard
                title="Porovnání prodaných a použitých vstupenek na jednotlivých událostech"
                description="Top 10 událostí podle počtu prodaných vstupenek."
                queryKey="ticketing-tickets-by-event-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={ticketsByEvent}
                                config={TICKETS_BY_EVENT_CONFIG}
                                categoryKey="label"
                                series={[...SOLD_USED_SERIES]}
                                stacked
                                orientation="horizontal"
                                showYAxis
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
                                data={ticketsByEvent}
                                columns={SOLD_USED_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatTicketingCount(ticketsByEventTotal.sold),
                                    formatTicketingCount(ticketsByEventTotal.used),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Poměr vstupenek a permanentek za sezónu"
                description="Podíl vstupenek a permanentek v rámci sezóny."
                queryKey="ticketing-tickets-vs-season-tickets-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={ticketsVsSeasonTickets}
                                config={TICKETS_VS_SEASON_TICKETS_CONFIG}
                                categoryKey="label"
                                series={[...TICKETS_VS_SEASON_TICKETS_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
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
                                data={ticketsVsSeasonTickets}
                                columns={TICKETS_VS_SEASON_TICKETS_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatTicketingCount(
                                        ticketsVsSeasonTicketsTotal.tickets,
                                    ),
                                    formatTicketingCount(
                                        ticketsVsSeasonTicketsTotal.seasonTickets,
                                    ),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Porovnání prodaných a použitých permanentek za sezónu"
                description="Počet prodaných a použitých permanentek podle sezóny."
                queryKey="ticketing-season-tickets-by-season-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={seasonTicketsBySeason}
                                config={SEASON_TICKETS_SOLD_USED_CONFIG}
                                categoryKey="label"
                                series={[...SOLD_USED_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
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
                                data={seasonTicketsBySeason}
                                columns={SOLD_USED_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatTicketingCount(
                                        seasonTicketsBySeasonTotal.sold,
                                    ),
                                    formatTicketingCount(
                                        seasonTicketsBySeasonTotal.used,
                                    ),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Porovnání prodaných a použitých vstupenek za sezónu"
                description="Počet prodaných a použitých vstupenek podle sezóny."
                queryKey="ticketing-tickets-by-season-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={ticketsBySeason}
                                config={TICKETS_SOLD_USED_CONFIG}
                                categoryKey="label"
                                series={[...SOLD_USED_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
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
                                data={ticketsBySeason}
                                columns={SOLD_USED_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={[
                                    'Celkem',
                                    formatTicketingCount(ticketsBySeasonTotal.sold),
                                    formatTicketingCount(ticketsBySeasonTotal.used),
                                ]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
