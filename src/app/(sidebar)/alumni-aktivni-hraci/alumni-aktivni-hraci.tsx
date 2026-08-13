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

import {
    ALUMNI_DEGREE_OPTIONS,
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
    matchesAnyDegree,
    matchesAnyField,
    matchesAnyTeam,
} from '@/lib/alumni/filters'
import { useMultiFilterParam } from '@/lib/alumni/use-filter-param'
import {
    ACTIVE_PLAYERS_DETAIL,
    ACTIVE_PLAYERS_DETAIL_COLUMNS,
    ACTIVE_PLAYERS_KPIS,
    formatPlayerCount,
    PLAYERS_BY_FIELD,
    PLAYERS_BY_FIELD_COLUMNS,
    PLAYERS_BY_FIELD_CONFIG,
    PLAYERS_BY_TEAM,
    PLAYERS_BY_TEAM_COLUMNS,
    PLAYERS_BY_TEAM_CONFIG,
    PLAYERS_BY_YEAR_DEGREE,
    STUDY_LEVEL,
    STUDY_LEVEL_CONFIG,
    toSparseCategoryChart,
    YEAR_DEGREE_COLUMNS,
    YEAR_DEGREE_CONFIG,
    YEAR_DEGREE_SERIES,
} from './data'

const teamValues = ALUMNI_TEAM_OPTIONS.map((option) => option.value)
const fieldValues = ALUMNI_FIELD_OPTIONS.map((option) => option.value)
const degreeValues = ALUMNI_DEGREE_OPTIONS.map((option) => option.value)

export function AlumniAktivniHraci() {
    const [teams] = useMultiFilterParam('team', teamValues)
    const [fields] = useMultiFilterParam('field', fieldValues)
    const [degrees] = useMultiFilterParam('degree', degreeValues)

    const playersByTeam = useMemo(() => {
        if (teams.length === 0) return PLAYERS_BY_TEAM
        return PLAYERS_BY_TEAM.filter((row) => matchesAnyTeam(row.label, teams))
    }, [teams])

    const playersByTeamChart = useMemo(
        () => toSparseCategoryChart(playersByTeam),
        [playersByTeam],
    )

    const playersByField = useMemo(() => {
        if (fields.length === 0) return PLAYERS_BY_FIELD
        return PLAYERS_BY_FIELD.filter((row) => matchesAnyField(row.label, fields))
    }, [fields])

    const playersByFieldChart = useMemo(
        () => toSparseCategoryChart(playersByField),
        [playersByField],
    )

    const studyLevel = useMemo(() => {
        if (degrees.length === 0) return STUDY_LEVEL
        return STUDY_LEVEL.filter((row) => degrees.includes(row.name))
    }, [degrees])

    const yearDegreeSeries = useMemo((): string[] => {
        if (degrees.length === 0) return [...YEAR_DEGREE_SERIES]
        return YEAR_DEGREE_SERIES.filter((key) => degrees.includes(key))
    }, [degrees])

    const detail = useMemo(
        () =>
            ACTIVE_PLAYERS_DETAIL.filter(
                (row) =>
                    matchesAnyTeam(row.team, teams) &&
                    matchesAnyDegree(row.degree, degrees),
            ),
        [teams, degrees],
    )

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
                {ACTIVE_PLAYERS_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
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
                                    config={PLAYERS_BY_TEAM_CONFIG}
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
                    action={
                        <InfoTooltip>
                            Počet aktivních hráčů podle ročníku a stupně studia.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'rocnik-stupen',
                        headers: ['Ročník', 'Bakalářské', 'Magisterské', 'Doktorské'],
                        rows: PLAYERS_BY_YEAR_DEGREE.map((row) => [
                            row.label,
                            row.bakalarske,
                            row.magisterske,
                            row.doktorske,
                        ]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={PLAYERS_BY_YEAR_DEGREE}
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
                                    data={PLAYERS_BY_YEAR_DEGREE}
                                    columns={YEAR_DEGREE_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />

                <DataVisulaizationCard
                    title="Podle oboru"
                    queryKey="alumni-by-field-view"
                    action={
                        <InfoTooltip>
                            Rozložení aktivních hráčů podle studijního oboru.
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
                                        config={PLAYERS_BY_FIELD_CONFIG}
                                        categoryKey="label"
                                        series={playersByFieldChart.series}
                                        stacked
                                        orientation="horizontal"
                                        showYAxis
                                        categoryMaxLength={22}
                                        xAxisLabel="Počet"
                                        yAxisLabel="Obor"
                                        formatValue={formatPlayerCount}
                                        legendQueryKey="alumni-by-field-muted"
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
                        Seznam aktivních hráčů s týmem, fakultou, stupněm a ročníkem.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'detail-aktivnich-hracu',
                    headers: ['Tým', 'Fakulta', 'Stupeň', 'Ročník'],
                    rows: detail.map((row) => [
                        row.team,
                        row.faculty,
                        row.degree,
                        row.year,
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
