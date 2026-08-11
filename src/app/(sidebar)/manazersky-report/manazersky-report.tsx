'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import { parseAsIsoDate, useQueryState } from 'nuqs'

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
    DEFAULT_FROM,
    DEFAULT_TO,
    filterByPeriodRange,
    formatCurrency,
    formatValue,
    MANAGEMENT_REPORT_DATA,
    sumBy,
    TICKET_CHANNEL_SERIES,
    TICKET_COUNT_COLUMNS,
    TICKET_REVENUE_COLUMNS,
    toTicketCountRows,
    toTicketRevenueRows,
    VISITOR_GROWTH_COLUMNS,
    VISITOR_GROWTH_SERIES,
    VISITOR_TOTAL_COLUMNS,
    VISITOR_TOTAL_SERIES,
    type ReportChartSeries,
    type ReportSectionRow,
    type ReportTableColumn,
} from './data'

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
    xAxisLabel = 'Měsíc',
    yAxisLabel = 'Počet',
    formatChartValue,
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
    xAxisLabel?: string
    yAxisLabel?: string
    formatChartValue?: (value: number) => string
}) {
    const config = Object.fromEntries(
        series.map((item) => [item.key, { label: item.label, color: item.color }]),
    ) satisfies ChartConfig
    const totals = columns.reduce<Record<string, number>>((result, column) => {
        result[column.key] = sumBy(rows, (row) => Number(row[column.key] ?? 0))
        return result
    }, {})
    const seriesKeys = series.map((item) => item.key)

    const chart =
        rows.length > 0 ? (
            <BarChart
                key={`${queryKey}-chart-${periodKey}`}
                data={rows}
                config={config}
                categoryKey="label"
                series={seriesKeys}
                stacked={stacked}
                showYAxis
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
                formatValue={formatChartValue}
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
            header: 'Měsíc',
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
                                  'Celkem',
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

export function ManazerskyReport() {
    const { tickets, fans } = MANAGEMENT_REPORT_DATA
    const [from] = useQueryState(
        'from',
        parseAsIsoDate.withDefault(DEFAULT_FROM),
    )
    const [to] = useQueryState('to', parseAsIsoDate.withDefault(DEFAULT_TO))
    const dateRange = { from, to }
    const periodKey = `${from.toISOString()}-${to.toISOString()}`
    const inRange = <T extends { period: string }>(data: T[]) =>
        filterByPeriodRange(data, dateRange)

    const ticketDevelopment = inRange(tickets.development)
    const fanDevelopment = inRange(fans.development)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Manažerský report"
                description="Přehled klíčových manažerských metrik."
            />

            <ChartTableSection
                title="Vývoj tržeb za prodané vstupenky"
                description="Tržby podle prodejního kanálu ve zvoleném období."
                rows={toTicketRevenueRows(ticketDevelopment)}
                columns={TICKET_REVENUE_COLUMNS}
                series={TICKET_CHANNEL_SERIES}
                periodKey={periodKey}
                stacked
                yAxisLabel="Kč"
                formatChartValue={formatCurrency}
                emptyMessage="Žádná data o prodeji vstupenek pro zvolené období."
                queryKey="manazersky-ticket-revenue-view"
            />

            <ChartTableSection
                title="Počet prodaných vstupenek"
                description="Počet vstupenek podle prodejního kanálu ve zvoleném období."
                rows={toTicketCountRows(ticketDevelopment)}
                columns={TICKET_COUNT_COLUMNS}
                series={TICKET_CHANNEL_SERIES}
                periodKey={periodKey}
                stacked
                emptyMessage="Žádná data o prodeji vstupenek pro zvolené období."
                queryKey="manazersky-ticket-count-view"
            />

            <ChartTableSection
                title="Vývoj celkového počtu návštěvníků"
                description="Celkový počet návštěvníků na konci každého měsíce ve zvoleném období."
                rows={fanDevelopment}
                columns={VISITOR_TOTAL_COLUMNS}
                series={VISITOR_TOTAL_SERIES}
                periodKey={periodKey}
                showTotals={false}
                emptyMessage="Žádná data o návštěvnících pro zvolené období."
                queryKey="manazersky-visitor-total-view"
            />

            <ChartTableSection
                title="Přírůstky počtu návštěvníků"
                description="Noví a odebraní návštěvníci ve zvoleném období."
                rows={fanDevelopment}
                columns={VISITOR_GROWTH_COLUMNS}
                series={VISITOR_GROWTH_SERIES}
                periodKey={periodKey}
                emptyMessage="Žádná data o přírůstcích návštěvníků pro zvolené období."
                queryKey="manazersky-visitor-growth-view"
            />
        </div>
    )
}
