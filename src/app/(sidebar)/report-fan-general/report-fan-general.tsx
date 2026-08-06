'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import {
    SimpleTable,
    type SimpleTableColumn,
} from '@/components/custom/statistics/simple-table'
import type { ChartConfig } from '@/components/ui/chart'

import {
    EMAIL_REPORT_BY_DAY,
    EMAIL_REPORT_CHART_CONFIG,
    EMAIL_REPORT_SERIES,
    PUSH_REPORT_BY_DAY,
    PUSH_REPORT_CHART_CONFIG,
    PUSH_REPORT_SERIES,
    SMS_REPORT_BY_DAY,
    SMS_REPORT_CHART_CONFIG,
    SMS_REPORT_SERIES,
    type Period,
} from './data'
import {
    aggregateByPeriod,
    filterByDateRange,
    useReportDateRange,
    useReportPeriod,
    type ChartRow,
} from './report-utils'

const numberFormatter = new Intl.NumberFormat('cs-CZ')

function periodColumnLabel(period: Period) {
    if (period === 'day') return 'Den'
    if (period === 'month') return 'Měsíc'
    return 'Rok'
}

function reportTableColumns(
    config: ChartConfig,
    series: readonly string[],
    period: Period,
): SimpleTableColumn<ChartRow>[] {
    return [
        {
            id: 'label',
            header: periodColumnLabel(period),
            cellClassName: 'font-medium',
            cell: (row) => row.label,
        },
        ...series.map((key) => ({
            id: key,
            header: config[key]?.label,
            headerClassName: 'text-right',
            cellClassName: 'text-right tabular-nums',
            cell: (row: ChartRow) =>
                numberFormatter.format(Number(row[key] ?? 0)),
        })),
    ]
}

export function ReportFanGeneral() {
    const [period] = useReportPeriod()
    const { dateRange } = useReportDateRange()

    const emailData = aggregateByPeriod(
        filterByDateRange(EMAIL_REPORT_BY_DAY, dateRange),
        EMAIL_REPORT_SERIES,
        period,
    )
    const smsData = aggregateByPeriod(
        filterByDateRange(SMS_REPORT_BY_DAY, dateRange),
        SMS_REPORT_SERIES,
        period,
    )
    const pushData = aggregateByPeriod(
        filterByDateRange(PUSH_REPORT_BY_DAY, dateRange),
        PUSH_REPORT_SERIES,
        period,
    )

    return (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4">
            <ReportHeaderCard
                title="Global analytics"
                description="Přehled metrik e-mailu, SMS a push notifikací."
            />

            <DataVisulaizationCard
                queryKey="view-email"
                title="E-mail"
                description="Přehled ve zvoleném období."
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={emailData}
                                config={EMAIL_REPORT_CHART_CONFIG}
                                categoryKey="label"
                                series={[...EMAIL_REPORT_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel={periodColumnLabel(period)}
                                yAxisLabel="Počet"
                                className="max-h-75 w-full"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={emailData}
                                columns={reportTableColumns(
                                    EMAIL_REPORT_CHART_CONFIG,
                                    EMAIL_REPORT_SERIES,
                                    period,
                                )}
                                getRowKey={(row) => String(row.label)}
                            />
                        ),
                    },
                ]}
            />
            <DataVisulaizationCard
                queryKey="view-sms"
                title="SMS"
                description="Přehled ve zvoleném období."
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={smsData}
                                config={SMS_REPORT_CHART_CONFIG}
                                categoryKey="label"
                                series={[...SMS_REPORT_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel={periodColumnLabel(period)}
                                yAxisLabel="Počet"
                                className="max-h-75 w-full"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={smsData}
                                columns={reportTableColumns(
                                    SMS_REPORT_CHART_CONFIG,
                                    SMS_REPORT_SERIES,
                                    period,
                                )}
                                getRowKey={(row) => String(row.label)}
                            />
                        ),
                    },
                ]}
            />
            <DataVisulaizationCard
                queryKey="view-push"
                title="Push notifikace"
                description="Přehled ve zvoleném období."
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={pushData}
                                config={PUSH_REPORT_CHART_CONFIG}
                                categoryKey="label"
                                series={[...PUSH_REPORT_SERIES]}
                                stacked
                                showYAxis
                                xAxisLabel={periodColumnLabel(period)}
                                yAxisLabel="Počet"
                                className="max-h-75 w-full"
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={pushData}
                                columns={reportTableColumns(
                                    PUSH_REPORT_CHART_CONFIG,
                                    PUSH_REPORT_SERIES,
                                    period,
                                )}
                                getRowKey={(row) => String(row.label)}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
