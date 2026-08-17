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
    buildGraduationByTeamColumns,
    COMPLETED_VS_NOT_COLUMNS,
    COMPLETED_VS_NOT_CONFIG,
    COMPLETED_VS_NOT_SERIES,
    filterGraduationRows,
    formatGraduationPercent,
    formatPlayerCount,
    getAverageByTeam,
    getCompletedVsNot,
    getGraduationByTeamSeason,
    getGraduationByTeamSeries,
    GRADUATION_AVERAGE_BY_TEAM_COLUMNS,
    GRADUATION_BY_TEAM_SEASON_CONFIG,
} from './data'

export function AlumniGraduationRate() {
    const { seasonFrom, seasonTo, teams } = useFilters()

    const filteredRows = useMemo(
        () => filterGraduationRows(seasonFrom, seasonTo, teams),
        [seasonFrom, seasonTo, teams],
    )

    const totals = useMemo(
        () => sumAlumniMetrics(filteredRows),
        [filteredRows],
    )

    const departures = totals.completed + totals.incomplete
    const graduationRate = rateFromDepartures(
        totals.completed,
        totals.incomplete,
    )

    const byTeamSeason = useMemo(
        () => getGraduationByTeamSeason(filteredRows),
        [filteredRows],
    )

    const teamSeasonSeries = useMemo(
        () => getGraduationByTeamSeries(filteredRows),
        [filteredRows],
    )

    const rateOverTimeColumns = useMemo(
        () => buildGraduationByTeamColumns(teamSeasonSeries),
        [teamSeasonSeries],
    )

    const completedVsNot = useMemo(
        () => getCompletedVsNot(filteredRows),
        [filteredRows],
    )

    const averageByTeam = useMemo(
        () => getAverageByTeam(filteredRows),
        [filteredRows],
    )

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Graduation rate"
                description="Přehled úspěšnosti dokončení studia."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                aria-label="Graduation rate KPI"
            >
                <KpiCard
                    label="Hráči ve výběru"
                    value={numberFormatter.format(totals.playersInSelection)}
                    action={
                        <InfoTooltip>
                            Všichni hráči, kterých se filtry v období{' '}
                            {seasonFrom} – {seasonTo} týkají.
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
                            Alumni v týmech odpovídajících filtrům v období{' '}
                            {seasonFrom} – {seasonTo}.
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

            <DataVisulaizationCard
                title="Vývoj graduation rate v čase"
                queryKey="graduation-rate-over-time-view"
                action={
                    <InfoTooltip>
                        Vývoj graduation rate jednotlivých týmů napříč sezónami.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-graduation-rate-v-case',
                    headers: [
                        'Sezóna',
                        ...teamSeasonSeries.map(
                            (key) => GRADUATION_BY_TEAM_SEASON_CONFIG[key].label,
                        ),
                    ],
                    rows: byTeamSeason.map((row) => [
                        row.label,
                        ...teamSeasonSeries.map((key) => row[key]),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={byTeamSeason}
                                config={GRADUATION_BY_TEAM_SEASON_CONFIG}
                                categoryKey="label"
                                series={teamSeasonSeries}
                                showYAxis
                                angledXAxis
                                showDots
                                showAverage={teamSeasonSeries.length > 1}
                                xAxisLabel="Sezóna"
                                yAxisLabel="Graduation rate (%)"
                                formatValue={formatGraduationPercent}
                                legendQueryKey="graduation-rate-over-time-muted"
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
                                data={byTeamSeason}
                                columns={rateOverTimeColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Dokončili vs. nedokončili"
                    queryKey="graduation-completed-vs-not-view"
                    action={
                        <InfoTooltip>
                            Počet hráčů, kteří při odchodu dokončili nebo
                            nedokončili studium, podle sezón.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'completed-vs-incomplete',
                        headers: ['Sezóna', 'Dokončili', 'Nedokončili'],
                        rows: completedVsNot.map((row) => [
                            row.label,
                            row.completed,
                            row.incomplete,
                        ]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={completedVsNot}
                                    config={COMPLETED_VS_NOT_CONFIG}
                                    categoryKey="label"
                                    series={[...COMPLETED_VS_NOT_SERIES]}
                                    showYAxis
                                    showAverage
                                    showAverageInLegend={false}
                                    angledXAxis
                                    xAxisLabel="Sezóna"
                                    yAxisLabel="Počet"
                                    formatValue={formatPlayerCount}
                                    legendQueryKey="graduation-completed-vs-not-muted"
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
                                    data={completedVsNot}
                                    columns={COMPLETED_VS_NOT_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />

                <DataVisulaizationCard
                    title="Průměr za období"
                    queryKey="graduation-average-by-team"
                    action={
                        <InfoTooltip>
                            Počet odchodů a graduation rate podle týmu za
                            zvolené období.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'prumer-za-obdobi',
                        headers: ['Tým', 'Odchody', 'Graduation rate'],
                        rows: averageByTeam.map((row) => [
                            row.team,
                            row.departures,
                            row.rate,
                        ]),
                    }}
                >
                    <SimpleTable
                        data={averageByTeam}
                        columns={GRADUATION_AVERAGE_BY_TEAM_COLUMNS}
                        getRowKey={(row) => row.id}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
