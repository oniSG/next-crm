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

import {
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    ALUMNI_TEAM_OPTIONS,
    filterByOptionLabel,
    filterBySeasonRange,
    TEAM_FILTER_OPTIONS,
} from '@/lib/alumni/filters'
import { useFilterParam } from '@/lib/alumni/use-filter-param'
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
} from './data'

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues = TEAM_FILTER_OPTIONS.map((option) => option.value)

export function AlumniPrehled() {
    const [seasonFrom] = useFilterParam(
        'seasonFrom',
        seasonValues,
        ALUMNI_FILTER_DEFAULTS.seasonFrom,
    )
    const [seasonTo] = useFilterParam(
        'seasonTo',
        seasonValues,
        ALUMNI_FILTER_DEFAULTS.seasonTo,
    )
    const [team] = useFilterParam(
        'team',
        teamValues,
        ALUMNI_FILTER_DEFAULTS.team,
    )

    const leagueGraduation = useMemo(
        () => filterBySeasonRange(LEAGUE_GRADUATION_RATE, seasonFrom, seasonTo),
        [seasonFrom, seasonTo],
    )
    const teamComparison = useMemo(
        () =>
            filterByOptionLabel(
                TEAM_COMPARISON,
                (row) => row.label,
                team,
                ALUMNI_TEAM_OPTIONS,
            ),
        [team],
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
                        rows: leagueGraduation.map((row) => [row.label, row.rate]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <LineChart
                                    data={leagueGraduation}
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
                                    data={leagueGraduation}
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
                        rows: teamComparison.map((row) => [row.label, row.rate]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <BarChart
                                    data={teamComparison}
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
