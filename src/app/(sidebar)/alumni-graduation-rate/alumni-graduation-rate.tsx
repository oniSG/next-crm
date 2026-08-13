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
    isAllFilter,
    TEAM_FILTER_OPTIONS,
} from '@/lib/alumni/filters'
import { useFilterParam } from '@/lib/alumni/use-filter-param'
import {
    COMPLETED_VS_NOT,
    COMPLETED_VS_NOT_COLUMNS,
    COMPLETED_VS_NOT_CONFIG,
    COMPLETED_VS_NOT_SERIES,
    formatGraduationPercent,
    formatPlayerCount,
    GRADUATION_AVERAGE_BY_TEAM,
    GRADUATION_AVERAGE_BY_TEAM_COLUMNS,
    GRADUATION_BY_TEAM_SEASON,
    GRADUATION_BY_TEAM_SEASON_COLUMNS,
    GRADUATION_BY_TEAM_SEASON_CONFIG,
    GRADUATION_BY_TEAM_SEASON_SERIES,
    GRADUATION_RATE_KPIS,
    GRADUATION_RATE_OVER_TIME,
    GRADUATION_RATE_OVER_TIME_COLUMNS,
    GRADUATION_RATE_OVER_TIME_CONFIG,
    GRADUATION_RATE_OVER_TIME_SERIES,
} from './data'

const TEAM_SERIES_BY_VALUE = {
    sparta: 'sparta',
    kometa: 'kometa',
    trinec: 'trinec',
} as const

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const teamValues = TEAM_FILTER_OPTIONS.map((option) => option.value)

export function AlumniGraduationRate() {
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

    const rateOverTime = useMemo(
        () =>
            filterBySeasonRange(GRADUATION_RATE_OVER_TIME, seasonFrom, seasonTo),
        [seasonFrom, seasonTo],
    )

    const completedVsNot = useMemo(
        () => filterBySeasonRange(COMPLETED_VS_NOT, seasonFrom, seasonTo),
        [seasonFrom, seasonTo],
    )

    const averageByTeam = useMemo(
        () =>
            filterByOptionLabel(
                GRADUATION_AVERAGE_BY_TEAM,
                (row) => row.team,
                team,
                ALUMNI_TEAM_OPTIONS,
            ),
        [team],
    )

    const byTeamSeason = useMemo(
        () =>
            filterBySeasonRange(GRADUATION_BY_TEAM_SEASON, seasonFrom, seasonTo),
        [seasonFrom, seasonTo],
    )

    const teamSeasonSeries = useMemo((): string[] => {
        if (isAllFilter(team)) {
            return [...GRADUATION_BY_TEAM_SEASON_SERIES]
        }
        const seriesKey =
            TEAM_SERIES_BY_VALUE[team as keyof typeof TEAM_SERIES_BY_VALUE]
        return seriesKey ? [seriesKey] : [...GRADUATION_BY_TEAM_SEASON_SERIES]
    }, [team])

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
                {GRADUATION_RATE_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <DataVisulaizationCard
                title="Vývoj graduation rate v čase"
                queryKey="graduation-rate-over-time-view"
                action={
                    <InfoTooltip>
                        Vývoj graduation rate napříč sezónami.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-graduation-rate-v-case',
                    headers: ['Sezóna', 'Graduation rate (%)'],
                    rows: rateOverTime.map((row) => [row.label, row.rate]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={rateOverTime}
                                config={GRADUATION_RATE_OVER_TIME_CONFIG}
                                categoryKey="label"
                                series={[...GRADUATION_RATE_OVER_TIME_SERIES]}
                                showYAxis
                                angledXAxis
                                showDots
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
                                data={rateOverTime}
                                columns={GRADUATION_RATE_OVER_TIME_COLUMNS}
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
                        filename: 'dokoncili-vs-nedokoncili',
                        headers: ['Sezóna', 'Dokončili', 'Nedokončili'],
                        rows: completedVsNot.map((row) => [
                            row.label,
                            row.dokoncili,
                            row.nedokoncili,
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
                            Průměrný počet odchodů a graduation rate podle týmu
                            za zvolené období.
                        </InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'prumer-za-obdobi',
                        headers: ['Tým', 'Odchody', 'Graduation rate'],
                        rows: averageByTeam.map((row) => [
                            row.team,
                            row.odchody,
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

            <DataVisulaizationCard
                title="Graduation rate podle týmu a sezóny"
                queryKey="graduation-by-team-season-view"
                action={
                    <InfoTooltip>
                        Graduation rate vybraných týmů v jednotlivých sezónách.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'graduation-rate-podle-tymu-a-sezony',
                    headers: [
                        'Sezóna',
                        'HC Sparta Praha',
                        'HC Kometa Brno',
                        'HC Oceláři Třinec',
                    ],
                    rows: byTeamSeason.map((row) => [
                        row.label,
                        row.sparta,
                        row.kometa,
                        row.trinec,
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
                                xAxisLabel="Sezóna"
                                yAxisLabel="Graduation rate (%)"
                                formatValue={formatGraduationPercent}
                                legendQueryKey="graduation-by-team-season-muted"
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
                                data={byTeamSeason}
                                columns={GRADUATION_BY_TEAM_SEASON_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />
        </div>
    )
}
