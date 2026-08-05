'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    formatSalesCurrency,
    REVENUE_BY_CHANNEL_COLUMNS,
    REVENUE_BY_CHANNEL_CONFIG,
    REVENUE_BY_DATE_COLUMNS,
    REVENUE_BY_DATE_CONFIG,
    REVENUE_CHART_SERIES,
    SALES_REPORT_DATA,
    sumRevenue,
} from './data'

export function ReportSales() {
    const report = SALES_REPORT_DATA
    const channelTotal = sumRevenue(report.revenueByChannel)
    const dateTotal = sumRevenue(report.revenueByDate)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Prodeje"
                description="Statistika příjmu z prodeje vstupenek."
            />

            <DataVisulaizationCard
                title="Statistika příjmu z prodeje vstupenek podle prodejních kanálů"
                description="Příjem podle prodejního kanálu."
                queryKey="sales-revenue-by-channel-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={report.revenueByChannel}
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
                                data={report.revenueByChannel}
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
                description="Denní příjem z prodeje vstupenek."
                queryKey="sales-revenue-by-date-view"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={report.revenueByDate}
                                config={REVENUE_BY_DATE_CONFIG}
                                categoryKey="label"
                                series={[...REVENUE_CHART_SERIES]}
                                showYAxis
                                showDots
                                angledXAxis
                                xAxisLabel="Datum"
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
                                data={report.revenueByDate}
                                columns={REVENUE_BY_DATE_COLUMNS}
                                getRowKey={(row) => row.period}
                                footer={['Celkem', formatSalesCurrency(dateTotal)]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
