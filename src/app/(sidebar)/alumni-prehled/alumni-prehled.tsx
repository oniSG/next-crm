'use client'

import { useMemo } from 'react'
import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { useFilters } from './use-filters'
import {
    numberFormatter,
    percentFormatter,
    rateFromDepartures,
    sumAlumniMetrics,
} from '@/lib/alumni/metrics'
import {
    buildCategoryConfig,
    toSparseCategoryChart,
} from '@/lib/alumni/sparse-category-chart'
import {
    buildGraduationByTeamColumns,
    filterOverviewRows,
    formatGraduationPercent,
    getGraduationByTeamSeries,
    getLeagueGraduationRate,
    getTeamComparison,
    GRADUATION_BY_TEAM_CONFIG,
    TEAM_COMPARISON_COLUMNS,
} from './data'

export function AlumniPrehled() {
    const { seasonFrom, seasonTo, teams } = useFilters()

    const filteredRows = useMemo(
        () => filterOverviewRows(seasonFrom, seasonTo, teams),
        [seasonFrom, seasonTo, teams],
    )

    const totals = useMemo(() => sumAlumniMetrics(filteredRows), [filteredRows])

    const departures = totals.completed + totals.incomplete
    const graduationRate = rateFromDepartures(totals.completed, totals.incomplete)

    const leagueGraduation = useMemo(
        () => getLeagueGraduationRate(filteredRows),
        [filteredRows],
    )

    const graduationSeries = useMemo(
        () => getGraduationByTeamSeries(filteredRows),
        [filteredRows],
    )

    const graduationColumns = useMemo(
        () => buildGraduationByTeamColumns(graduationSeries),
        [graduationSeries],
    )

    const teamComparison = useMemo(() => getTeamComparison(filteredRows), [filteredRows])

    const teamComparisonConfig = useMemo(
        () => buildCategoryConfig(teamComparison),
        [teamComparison],
    )

    const teamComparisonChart = useMemo(
        () =>
            toSparseCategoryChart(
                teamComparison.map((row) => ({
                    label: row.label,
                    count: row.rate,
                })),
            ),
        [teamComparison],
    )

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Přehled"
                description="Souhrn alumni dat a klíčových ukazatelů."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                aria-label="Přehled KPI"
            >
                <KpiCard
                    label="Hráči ve výběru"
                    value={numberFormatter.format(totals.playersInSelection)}
                    action={
                        <InfoTooltip>
                            Všichni hráči, kterých se filtry v období {seasonFrom} –{' '}
                            {seasonTo} týkají.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Aktivní hráči"
                    value={numberFormatter.format(totals.activePlayers)}
                    action={
                        <InfoTooltip>
                            Aktivní hráči v týmech odpovídajících filtrům v období{' '}
                            {seasonFrom} – {seasonTo}.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Alumni"
                    value={numberFormatter.format(totals.alumni)}
                    action={
                        <InfoTooltip>
                            Alumni v týmech odpovídajících filtrům v období {seasonFrom} –{' '}
                            {seasonTo}.
                        </InfoTooltip>
                    }
                />
                <KpiCard
                    label="Odchody"
                    value={numberFormatter.format(departures)}
                    action={<InfoTooltip>Ve zvoleném období.</InfoTooltip>}
                />
                <KpiCard
                    label="Graduation rate"
                    value={`${percentFormatter.format(graduationRate)} %`}
                    action={
                        <InfoTooltip>
                            {numberFormatter.format(totals.completed)} z{' '}
                            {numberFormatter.format(departures)} odchodů
                        </InfoTooltip>
                    }
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Vývoj graduation rate podle týmu"
                    queryKey="alumni-league-graduation-view"
                    action={
                        <InfoTooltip>
                            Vývoj graduation rate jednotlivých týmů podle sezón.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'vyvoj-graduation-rate-podle-tymu',
                        headers: [
                            'Sezóna',
                            ...graduationSeries.map(
                                (key) => GRADUATION_BY_TEAM_CONFIG[key].label,
                            ),
                        ],
                        rows: leagueGraduation.map((row) => [
                            row.label,
                            ...graduationSeries.map((key) => row[key]),
                        ]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <LineChart
                                    data={leagueGraduation}
                                    config={GRADUATION_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[...graduationSeries]}
                                    showYAxis
                                    angledXAxis
                                    showDots
                                    showAverage
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
                                    data={leagueGraduation}
                                    columns={graduationColumns}
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
                        rows: teamComparison.map((row) => [row.label, row.rate]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={teamComparisonChart.data}
                                    config={teamComparisonConfig}
                                    categoryKey="label"
                                    series={teamComparisonChart.series}
                                    stacked
                                    orientation="horizontal"
                                    showYAxis
                                    showAverage
                                    showAverageInLegend={false}
                                    categoryMaxLength={22}
                                    xAxisLabel="Graduation rate (%)"
                                    yAxisLabel="Tým"
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
                                    data={teamComparison}
                                    columns={TEAM_COMPARISON_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />
            </section>
        </div>
    )
}
