'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import {
    SimpleTable,
    type SimpleTableColumn,
} from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import {
    SEASON_TICKETS_SOLD_USED_SERIES,
    SOLD_USED_COLUMNS,
    TICKETING_REPORT_DATA,
    TICKETS_BY_EVENT_SERIES,
    TICKETS_SOLD_USED_SERIES,
    TICKETS_VS_SEASON_TICKETS_COLUMNS,
    TICKETS_VS_SEASON_TICKETS_SERIES,
    toSoldUsedRows,
    toTicketsVsSeasonTicketsRows,
    toTopSoldUsedRows,
    type ReportChartSeries,
    type ReportSectionRow,
    type ReportTableColumn,
} from './data'

const numberFormatter = new Intl.NumberFormat('cs-CZ')

function formatValue(value: number) {
    return numberFormatter.format(value)
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
    emptyMessage,
    queryKey,
    categoryHeader,
    stacked = false,
    orientation = 'vertical',
    xAxisLabel,
    yAxisLabel = 'Počet',
    hideCategoryTicks = false,
    chartClassName = 'h-80',
}: {
    title: string
    description: string
    rows: ReportSectionRow[]
    columns: ReportTableColumn[]
    series: ReportChartSeries[]
    emptyMessage: string
    queryKey: string
    categoryHeader: string
    stacked?: boolean
    orientation?: 'vertical' | 'horizontal'
    xAxisLabel?: string
    yAxisLabel?: string
    hideCategoryTicks?: boolean
    chartClassName?: string
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
                key={`${queryKey}-chart`}
                data={rows}
                config={config}
                categoryKey="label"
                series={series.map((item) => item.key)}
                stacked={stacked}
                orientation={orientation}
                showYAxis
                hideCategoryTicks={hideCategoryTicks}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
                className={chartClassName}
            />
        ) : (
            <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                {emptyMessage}
            </div>
        )

    const tableColumns: SimpleTableColumn<ReportSectionRow>[] = [
        {
            id: 'label',
            header: categoryHeader,
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
            cell: (row: ReportSectionRow) => formatValue(Number(row[column.key] ?? 0)),
        })),
    ]

    const table = (
        <div key={`${queryKey}-table`}>
            {rows.length > 0 ? (
                <SimpleTable
                    data={rows}
                    columns={tableColumns}
                    getRowKey={(row) => row.period}
                    footer={[
                        'Celkem',
                        ...columns.map((column) => formatValue(totals[column.key])),
                    ]}
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
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: chart,
        },
        {
            name: 'Tabulka',
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

export function ReportTicketing() {
    const report = TICKETING_REPORT_DATA
    const ticketsByEvent = toTopSoldUsedRows(report.ticketsSoldUsedByEvent, 10)
    const ticketsVsSeasonTickets = toTicketsVsSeasonTicketsRows(
        report.ticketsVsSeasonTicketsBySeason,
    )
    const seasonTicketsBySeason = toSoldUsedRows(
        report.seasonTicketsSoldUsedBySeason,
    )
    const ticketsBySeason = toSoldUsedRows(report.ticketsSoldUsedBySeason)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Ticketing"
                description="Přehled prodaných a použitých vstupenek a permanentek."
            />

            <ChartTableSection
                title="Porovnání prodaných a použitých vstupenek na jednotlivých událostech"
                description="Top 10 událostí podle počtu prodaných vstupenek."
                rows={ticketsByEvent}
                columns={SOLD_USED_COLUMNS}
                series={TICKETS_BY_EVENT_SERIES}
                stacked
                orientation="horizontal"
                emptyMessage="Žádné výsledky!"
                queryKey="ticketing-tickets-by-event-view"
                categoryHeader="Událost"
                chartClassName="h-96"
            />

            <ChartTableSection
                title="Poměr vstupenek a permanentek za sezónu"
                description="Podíl vstupenek a permanentek v rámci sezóny."
                rows={ticketsVsSeasonTickets}
                columns={TICKETS_VS_SEASON_TICKETS_COLUMNS}
                series={TICKETS_VS_SEASON_TICKETS_SERIES}
                stacked
                emptyMessage="Žádné výsledky!"
                queryKey="ticketing-tickets-vs-season-tickets-view"
                categoryHeader="Sezóna"
                xAxisLabel="Sezóna"
            />

            <ChartTableSection
                title="Porovnání prodaných a použitých permanentek za sezónu"
                description="Počet prodaných a použitých permanentek podle sezóny."
                rows={seasonTicketsBySeason}
                columns={SOLD_USED_COLUMNS}
                series={SEASON_TICKETS_SOLD_USED_SERIES}
                stacked
                emptyMessage="Žádné výsledky!"
                queryKey="ticketing-season-tickets-by-season-view"
                categoryHeader="Sezóna"
                xAxisLabel="Sezóna"
            />

            <ChartTableSection
                title="Porovnání prodaných a použitých vstupenek za sezónu"
                description="Počet prodaných a použitých vstupenek podle sezóny."
                rows={ticketsBySeason}
                columns={SOLD_USED_COLUMNS}
                series={TICKETS_SOLD_USED_SERIES}
                stacked
                emptyMessage="Žádné výsledky!"
                queryKey="ticketing-tickets-by-season-view"
                categoryHeader="Sezóna"
                xAxisLabel="Sezóna"
            />
        </div>
    )
}
