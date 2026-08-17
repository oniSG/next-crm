'use client'

import { useMemo } from 'react'
import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { useFilters } from './use-filters'
import {
    numberFormatter,
    percentFormatter,
    rateFromDepartures,
} from '@/lib/alumni/metrics'
import {
    ACTIVE_PLAYERS_DETAIL_COLUMNS,
    buildPlayersByFieldConfig,
    buildPlayersByTeamConfig,
    buildYearDegreeColumns,
    filterActivePlayerRows,
    formatPlayerCount,
    getActivePlayersDetail,
    getActivePlayerTotals,
    getPlayersByField,
    getPlayersByTeam,
    getPlayersByYearDegree,
    getStudyLevel,
    PLAYERS_BY_FIELD_COLUMNS,
    PLAYERS_BY_TEAM_COLUMNS,
    STUDY_LEVEL_CONFIG,
    toSparseCategoryChart,
    YEAR_DEGREE_CONFIG,
    YEAR_DEGREE_SERIES,
} from './data'

export function AlumniAktivniHraci() {
    const { seasonFrom, seasonTo, teams, faculties, fields, degrees } = useFilters()

    const filteredRows = useMemo(
        () =>
            filterActivePlayerRows(
                seasonFrom,
                seasonTo,
                teams,
                faculties,
                fields,
                degrees,
            ),
        [seasonFrom, seasonTo, teams, faculties, fields, degrees],
    )

    const totals = useMemo(() => getActivePlayerTotals(filteredRows), [filteredRows])

    const departures = totals.completed + totals.incomplete
    const graduationRate = rateFromDepartures(totals.completed, totals.incomplete)

    const playersByTeam = useMemo(() => getPlayersByTeam(filteredRows), [filteredRows])

    const playersByTeamConfig = useMemo(
        () => buildPlayersByTeamConfig(playersByTeam),
        [playersByTeam],
    )

    const playersByTeamChart = useMemo(
        () => toSparseCategoryChart(playersByTeam),
        [playersByTeam],
    )

    const playersByField = useMemo(() => getPlayersByField(filteredRows), [filteredRows])

    const playersByFieldConfig = useMemo(
        () => buildPlayersByFieldConfig(playersByField),
        [playersByField],
    )

    const playersByFieldChart = useMemo(
        () => toSparseCategoryChart(playersByField),
        [playersByField],
    )

    const studyLevel = useMemo(() => getStudyLevel(filteredRows), [filteredRows])

    const yearDegree = useMemo(() => getPlayersByYearDegree(filteredRows), [filteredRows])

    const yearDegreeSeries = useMemo((): (typeof YEAR_DEGREE_SERIES)[number][] => {
        if (degrees.length === 0) return [...YEAR_DEGREE_SERIES]
        return YEAR_DEGREE_SERIES.filter((key) => degrees.includes(key))
    }, [degrees])

    const yearDegreeColumns = useMemo(
        () => buildYearDegreeColumns(yearDegreeSeries),
        [yearDegreeSeries],
    )

    const detail = useMemo(() => getActivePlayersDetail(filteredRows), [filteredRows])

    const byFieldChartHeight = Math.max(288, Math.max(playersByField.length, 1) * 44 + 80)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Aktivní hráči"
                description="Přehled aktivních hráčů a jejich vzdělání."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                aria-label="Aktivní hráči KPI"
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

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Stupeň studia"
                    queryKey="alumni-study-level-view"
                    action={
                        <InfoTooltip>
                            Rozložení aktivních hráčů podle stupně studia.
                        </InfoTooltip>
                    }
                >
                    <PieChart
                        data={studyLevel}
                        config={STUDY_LEVEL_CONFIG}
                        innerRadius={60}
                        className="max-h-72"
                    />
                </DataVisulaizationCard>

                <DataVisulaizationCard
                    title="Aktivní hráči podle týmu"
                    queryKey="alumni-players-by-team-view"
                    action={
                        <InfoTooltip>
                            Počet aktivních hráčů v jednotlivých týmech.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'aktivni-hraci-podle-tymu',
                        headers: ['Tým', 'Počet'],
                        rows: playersByTeam.map((row) => [row.label, row.count]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={playersByTeamChart.data}
                                    config={playersByTeamConfig}
                                    categoryKey="label"
                                    series={playersByTeamChart.series}
                                    stacked
                                    showYAxis
                                    angledXAxis
                                    categoryMaxLength={16}
                                    yAxisLabel="Počet"
                                    formatValue={formatPlayerCount}
                                    legendQueryKey="alumni-players-by-team-muted"
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
                                    data={playersByTeam}
                                    columns={PLAYERS_BY_TEAM_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />

                <DataVisulaizationCard
                    title="Ročník + stupeň"
                    queryKey="alumni-year-degree-view"
                    className="lg:col-span-2"
                    action={
                        <InfoTooltip>
                            Počet aktivních hráčů podle ročníku a stupně studia.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'rocnik-stupen',
                        headers: [
                            'Ročník',
                            ...yearDegreeSeries.map(
                                (key) => YEAR_DEGREE_CONFIG[key].label,
                            ),
                        ],
                        rows: yearDegree.map((row) => [
                            row.label,
                            ...yearDegreeSeries.map((key) => row[key]),
                        ]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={yearDegree}
                                    config={YEAR_DEGREE_CONFIG}
                                    categoryKey="label"
                                    series={yearDegreeSeries}
                                    stacked
                                    showYAxis
                                    xAxisLabel="Ročník"
                                    yAxisLabel="Počet"
                                    formatValue={formatPlayerCount}
                                    legendQueryKey="alumni-year-degree-muted"
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
                                    data={yearDegree}
                                    columns={yearDegreeColumns}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />

                <DataVisulaizationCard
                    title="Aktivní hráči podle oboru"
                    queryKey="alumni-players-by-field-view"
                    className="lg:col-span-2"
                    action={
                        <InfoTooltip>
                            Počet aktivních hráčů podle studijního oboru.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'aktivni-hraci-podle-oboru',
                        headers: ['Obor', 'Počet'],
                        rows: playersByField.map((row) => [row.label, row.count]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <div
                                    className="w-full"
                                    style={{ height: byFieldChartHeight }}
                                >
                                    <BarChart
                                        data={playersByFieldChart.data}
                                        config={playersByFieldConfig}
                                        categoryKey="label"
                                        series={playersByFieldChart.series}
                                        stacked
                                        orientation="horizontal"
                                        showYAxis
                                        categoryMaxLength={22}
                                        xAxisLabel="Počet"
                                        yAxisLabel="Obor"
                                        formatValue={formatPlayerCount}
                                        legendQueryKey="alumni-players-by-field-muted"
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
                                    data={playersByField}
                                    columns={PLAYERS_BY_FIELD_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />
            </section>

            <DataVisulaizationCard
                title="Detail aktivních hráčů"
                queryKey="alumni-active-players-detail"
                action={
                    <InfoTooltip>
                        Přehled aktivních hráčů podle týmu, fakulty, stupně a ročníku.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'detail-aktivnich-hracu',
                    headers: ['Tým', 'Fakulta', 'Stupeň', 'Ročník', 'Počet'],
                    rows: detail.map((row) => [
                        row.team,
                        row.faculty,
                        row.degree,
                        row.year,
                        row.count,
                    ]),
                }}
            >
                <SimpleTable
                    data={detail}
                    columns={ACTIVE_PLAYERS_DETAIL_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </div>
    )
}
