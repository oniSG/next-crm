'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    filterSoldUsedByDateRange,
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
import { useFilters } from './use-filters'

export function ReportTicketing() {
    const { today, eventDateRange, setEventDateRange } = useFilters()

    const report = TICKETING_REPORT_DATA
    const ticketsByEvent = topSoldUsedByTotal(
        filterSoldUsedByDateRange(report.ticketsSoldUsedByEvent, eventDateRange),
    )
    const ticketsByEventTotal = sumSoldUsed(ticketsByEvent)
    const ticketsByEventChartHeight = Math.max(384, ticketsByEvent.length * 36 + 64)
    const ticketsVsSeasonTickets = report.ticketsVsSeasonTicketsBySeason
    const ticketsVsSeasonTicketsTotal = sumTicketsVsSeasonTickets(ticketsVsSeasonTickets)
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
                queryKey="ticketing-tickets-by-event-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru mezi prodanými a použitými vstupenkami
                        na jednotlivé události, identifikované podle jejich ID.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'prodane-a-pouzite-vstupenky-na-udalostech',
                    headers: ['Název', 'Prodané', 'Použité'],
                    rows: ticketsByEvent.map((row) => [row.label, row.sold, row.used]),
                }}
                dateRange={{
                    value: eventDateRange,
                    today,
                    onChange: setEventDateRange,
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <div
                                className="w-full"
                                style={{ height: ticketsByEventChartHeight }}
                            >
                                <BarChart
                                    data={ticketsByEvent}
                                    config={TICKETS_BY_EVENT_CONFIG}
                                    categoryKey="label"
                                    series={[...SOLD_USED_SERIES]}
                                    orientation="horizontal"
                                    showYAxis
                                    categoryMaxLength={18}
                                    xAxisLabel="Počet"
                                    yAxisLabel="Událost"
                                    legendQueryKey="ticketing-tickets-by-event-muted"
                                    className="h-full"
                                />
                            </div>
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
                queryKey="ticketing-tickets-vs-season-tickets-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru mezi prodanými vstupenkami a
                        permanentkami za poslední sezónu. Pokud se vám graf nezobrazuje /
                        nezobrazuje správně, nemáte definované sezóny v záložce nastavení.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'pomer-vstupenek-a-permanentek-za-sezonu',
                    headers: ['Sezóna', 'Vstupenky', 'Permanentky'],
                    rows: ticketsVsSeasonTickets.map((row) => [
                        row.label,
                        row.tickets,
                        row.seasonTickets,
                    ]),
                }}
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
                                legendQueryKey="ticketing-tickets-vs-season-muted"
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
                queryKey="ticketing-season-tickets-by-season-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru mezi prodanými a použitými
                        permanentkami v jednotlivých sezónách.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'prodane-a-pouzite-permanentky-za-sezonu',
                    headers: ['Název', 'Prodané', 'Použité'],
                    rows: seasonTicketsBySeason.map((row) => [
                        row.label,
                        row.sold,
                        row.used,
                    ]),
                }}
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
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
                                legendQueryKey="ticketing-season-tickets-muted"
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
                                    formatTicketingCount(seasonTicketsBySeasonTotal.sold),
                                    formatTicketingCount(seasonTicketsBySeasonTotal.used),
                                ]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Porovnání prodaných a použitých vstupenek za sezónu"
                queryKey="ticketing-tickets-by-season-view"
                action={
                    <InfoTooltip>
                        Grafické znázornění poměru mezi prodanými a použitými vstupenkami
                        v jednotlivých sezónách.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'prodane-a-pouzite-vstupenky-za-sezonu',
                    headers: ['Název', 'Prodané', 'Použité'],
                    rows: ticketsBySeason.map((row) => [row.label, row.sold, row.used]),
                }}
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
                                showYAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Počet"
                                legendQueryKey="ticketing-tickets-by-season-muted"
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
