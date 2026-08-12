'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    ACTIVE_PLAYERS_DETAIL,
    ACTIVE_PLAYERS_DETAIL_COLUMNS,
    ACTIVE_PLAYERS_KPIS,
    formatPlayerCount,
    PLAYERS_BY_TEAM,
    PLAYERS_BY_TEAM_COLUMNS,
    PLAYERS_BY_TEAM_CONFIG,
    PLAYERS_BY_TEAM_SERIES,
    PLAYERS_BY_YEAR_DEGREE,
    STUDY_LEVEL,
    STUDY_LEVEL_CONFIG,
    YEAR_DEGREE_COLUMNS,
    YEAR_DEGREE_CONFIG,
    YEAR_DEGREE_SERIES,
} from '../data'

export function ActivePlayersTab() {
    return (
        <>
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
                        data={STUDY_LEVEL}
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
                        rows: PLAYERS_BY_TEAM.map((row) => [row.label, row.count]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={PLAYERS_BY_TEAM}
                                    config={PLAYERS_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[...PLAYERS_BY_TEAM_SERIES]}
                                    showYAxis
                                    angledXAxis
                                    categoryMaxLength={16}
                                    xAxisLabel="Tým"
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
                                    data={PLAYERS_BY_TEAM}
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
                                    series={[...YEAR_DEGREE_SERIES]}
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
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={[]}
                                    config={PLAYERS_BY_TEAM_CONFIG}
                                    categoryKey="label"
                                    series={[...PLAYERS_BY_TEAM_SERIES]}
                                    emptyMessage="Tento graf neobsahuje žádné údaje"
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
                                    data={[]}
                                    columns={PLAYERS_BY_TEAM_COLUMNS}
                                    getRowKey={(row) => row.label}
                                    emptyMessage="Tento graf neobsahuje žádné údaje"
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
                    rows: ACTIVE_PLAYERS_DETAIL.map((row) => [
                        row.team,
                        row.faculty,
                        row.degree,
                        row.year,
                    ]),
                }}
            >
                <SimpleTable
                    data={ACTIVE_PLAYERS_DETAIL}
                    columns={ACTIVE_PLAYERS_DETAIL_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </>
    )
}
