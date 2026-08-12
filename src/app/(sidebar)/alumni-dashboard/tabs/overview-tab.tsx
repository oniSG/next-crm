'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    formatGraduationPercent,
    LEAGUE_GRADUATION_COLUMNS,
    LEAGUE_GRADUATION_CONFIG,
    LEAGUE_GRADUATION_RATE,
    LEAGUE_GRADUATION_SERIES,
    OVERVIEW_KPIS,
    TEAM_COMPARISON,
    TEAM_COMPARISON_COLUMNS,
    TEAM_COMPARISON_CONFIG,
    TEAM_COMPARISON_SERIES,
} from '../data'

export function OverviewTab() {
    return (
        <>
            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                aria-label="Přehled KPI"
            >
                {OVERVIEW_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Vývoj celoligové graduation rate"
                    queryKey="alumni-league-graduation-view"
                    action={
                        <InfoTooltip>
                            Vývoj průměrné graduation rate napříč ligou podle sezón.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'vyvoj-celoligove-graduation-rate',
                        headers: ['Sezóna', 'Graduation rate (%)'],
                        rows: LEAGUE_GRADUATION_RATE.map((row) => [row.label, row.rate]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <LineChart
                                    data={LEAGUE_GRADUATION_RATE}
                                    config={LEAGUE_GRADUATION_CONFIG}
                                    categoryKey="label"
                                    series={[...LEAGUE_GRADUATION_SERIES]}
                                    showYAxis
                                    angledXAxis
                                    showDots
                                    xAxisLabel="Sezóna"
                                    yAxisLabel="Graduation rate (%)"
                                    formatValue={formatGraduationPercent}
                                    legendQueryKey="alumni-league-graduation-muted"
                                    className="h-72"
                                />
                            ),
                        },
                        {
                            name: 'Tabulka',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
                                    data={LEAGUE_GRADUATION_RATE}
                                    columns={LEAGUE_GRADUATION_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />

                <DataVisulaizationCard
                    title="Srovnání týmů"
                    queryKey="alumni-team-comparison-view"
                    action={
                        <InfoTooltip>
                            Srovnání graduation rate jednotlivých týmů.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'srovnani-tymu',
                        headers: ['Tým', 'Graduation rate (%)'],
                        rows: TEAM_COMPARISON.map((row) => [row.label, row.rate]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={TEAM_COMPARISON}
                                    config={TEAM_COMPARISON_CONFIG}
                                    categoryKey="label"
                                    series={[...TEAM_COMPARISON_SERIES]}
                                    showYAxis
                                    angledXAxis
                                    categoryMaxLength={16}
                                    xAxisLabel="Tým"
                                    yAxisLabel="Graduation rate (%)"
                                    formatValue={formatGraduationPercent}
                                    legendQueryKey="alumni-team-comparison-muted"
                                    className="h-72"
                                />
                            ),
                        },
                        {
                            name: 'Tabulka',
                            value: 'table',
                            icon: <TableIcon />,
                            content: (
                                <SimpleTable
                                    data={TEAM_COMPARISON}
                                    columns={TEAM_COMPARISON_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />
            </section>
        </>
    )
}
