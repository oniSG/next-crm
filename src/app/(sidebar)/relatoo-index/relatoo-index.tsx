'use client'

import { ChartColumnIcon, ChartPieIcon, TableIcon } from 'lucide-react'

import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    BEST_SEND_DAY_BY_WEEKDAY,
    BEST_SEND_DAY_CHART_CONFIG,
    BEST_SEND_DAY_COLUMNS,
    BEST_SEND_DAY_SERIES,
    BEST_SEND_TIME_BY_SLOT,
    BEST_SEND_TIME_CHART_CONFIG,
    BEST_SEND_TIME_COLUMNS,
    BEST_SEND_TIME_SERIES,
    EMAIL_METRICS_COLUMNS,
    EMAIL_METRICS_PIE,
    EMAIL_METRICS_PIE_CONFIG,
    EMAIL_METRICS_STAGES,
    formatExpertCount,
    RELATOO_INDEX_KPIS,
} from './data'

export function RelatooIndex() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Postřehy relatoo"
                description="Relatoo index a expertní přehledy odesílání e-mailů."
            />

            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Relatoo index overview"
            >
                {RELATOO_INDEX_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <DataVisulaizationCard
                title="Nejlepší čas na odesílání e-mailů"
                description="Průměr unikátně otevřených za 90 dní."
                queryKey="view-best-send-time"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={BEST_SEND_TIME_BY_SLOT}
                                config={BEST_SEND_TIME_CHART_CONFIG}
                                categoryKey="label"
                                series={[...BEST_SEND_TIME_SERIES]}
                                showYAxis
                                angledXAxis
                                xAxisLabel="Čas"
                                yAxisLabel="Počet"
                                formatValue={formatExpertCount}
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
                                data={BEST_SEND_TIME_BY_SLOT}
                                columns={BEST_SEND_TIME_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Nejlepší den na odesílání e-mailů"
                description="Průměr unikátně otevřených za 90 dní."
                queryKey="view-best-send-day"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={BEST_SEND_DAY_BY_WEEKDAY}
                                config={BEST_SEND_DAY_CHART_CONFIG}
                                categoryKey="label"
                                series={[...BEST_SEND_DAY_SERIES]}
                                showYAxis
                                xAxisLabel="Den"
                                yAxisLabel="Počet"
                                formatValue={formatExpertCount}
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
                                data={BEST_SEND_DAY_BY_WEEKDAY}
                                columns={BEST_SEND_DAY_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="E-mailové metriky"
                description="Doručení, otevření, prokliky a odhlášení."
                queryKey="view-email-metrics"
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartPieIcon />,
                        content: (
                            <PieChart
                                data={EMAIL_METRICS_PIE}
                                config={EMAIL_METRICS_PIE_CONFIG}
                                className="max-h-72"
                                innerRadius={55}
                            />
                        ),
                    },
                    {
                        name: 'Tabulka',
                        value: 'table',
                        icon: <TableIcon />,
                        content: (
                            <SimpleTable
                                data={EMAIL_METRICS_STAGES}
                                columns={EMAIL_METRICS_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
