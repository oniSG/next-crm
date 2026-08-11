'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    formatSalesCurrency,
    periodColumnLabel,
    REVENUE_BY_CHANNEL_COLUMNS,
    REVENUE_BY_CHANNEL_CONFIG,
    REVENUE_BY_DATE_CONFIG,
    REVENUE_CHART_SERIES,
    revenueByDateColumns,
    SALES_REPORT_DATA,
    sumRevenue,
} from './data'
import {
    aggregateByPeriod,
    filterByDateRange,
    scaleChannelsToPeriodTotal,
    useReportDateRange,
    useReportPeriod,
} from './report-utils'

export function ReportSales() {
    const [period] = useReportPeriod()
    const { dateRange } = useReportDateRange()

    const report = SALES_REPORT_DATA
    const filteredByDate = filterByDateRange(report.revenueByDate, dateRange)
    const revenueByDate = aggregateByPeriod(filteredByDate, period)
    const dateTotal = sumRevenue(revenueByDate)
    const revenueByChannel = scaleChannelsToPeriodTotal(
        report.revenueByChannel,
        dateTotal,
    )
    const channelTotal = sumRevenue(revenueByChannel)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Prodeje vstupenek"
                description="Statistika příjmu z prodeje vstupenek."
            />

            <DataVisulaizationCard
                title="Statistika příjmu z prodeje vstupenek podle prodejních kanálů"
                description="Příjem podle prodejního kanálu ve zvoleném období."
                queryKey="sales-revenue-by-channel-view"
                tableExportable={{
                    filename: 'prijem-z-prodeje-vstupenek-podle-kanalu',
                    headers: ['Prodejní kanál', 'Příjem'],
                    rows: revenueByChannel.map((row) => [
                        row.label,
                        row.revenue,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={revenueByChannel}
                                config={REVENUE_BY_CHANNEL_CONFIG}
                                categoryKey="label"
                                series={[...REVENUE_CHART_SERIES]}
                                showYAxis
                                xAxisLabel="Prodejní kanál"
                                yAxisLabel="Příjem"
                                formatValue={formatSalesCurrency}
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
                                data={revenueByChannel}
                                columns={REVENUE_BY_CHANNEL_COLUMNS}
                                getRowKey={(row) => row.id}
                                footer={['Celkem', formatSalesCurrency(channelTotal)]}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Statistika příjmu z prodeje vstupenek"
                description="Příjem z prodeje vstupenek ve zvoleném období."
                queryKey="sales-revenue-by-date-view"
                tableExportable={{
                    filename: 'prijem-z-prodeje-vstupenek',
                    headers: [periodColumnLabel(period), 'Příjem'],
                    rows: revenueByDate.map((row) => [row.label, row.revenue]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={revenueByDate}
                                config={REVENUE_BY_DATE_CONFIG}
                                categoryKey="label"
                                series={[...REVENUE_CHART_SERIES]}
                                showYAxis
                                angledXAxis={period === 'day'}
                                xAxisLabel={periodColumnLabel(period)}
                                yAxisLabel="Příjem"
                                formatValue={formatSalesCurrency}
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
                                data={revenueByDate}
                                columns={revenueByDateColumns(period)}
                                getRowKey={(row) => row.id}
                                footer={['Celkem', formatSalesCurrency(dateTotal)]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
