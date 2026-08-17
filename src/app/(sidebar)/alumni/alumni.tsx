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
import { toSparseCategoryChart } from '@/lib/statistics/sparse-category-chart'
import {
    ALUMNI_BY_UNIVERSITY_COLUMNS,
    ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS,
    ALUMNI_TOP_FIELDS_COLUMNS,
    buildAlumniByUniversityConfig,
    buildAlumniDegreeStructureColumns,
    buildAlumniDegreeStructureConfig,
    buildAlumniHighestDegreeConfig,
    buildAlumniTopFieldsConfig,
    filterAlumniRows,
    formatGraduationPercent,
    formatPlayerCount,
    getAlumniByUniversity,
    getAlumniByUniversityFaculty,
    getAlumniDegreeStructure,
    getAlumniDegreeStructureSeries,
    getAlumniHighestDegree,
    getAlumniTopFields,
    getAlumniTotals,
} from './data'

export function Alumni() {
    const { seasonFrom, seasonTo, teams, schools, faculties, fields, degrees } =
        useFilters()

    const filteredRows = useMemo(
        () =>
            filterAlumniRows(
                seasonFrom,
                seasonTo,
                teams,
                schools,
                faculties,
                fields,
                degrees,
            ),
        [seasonFrom, seasonTo, teams, schools, faculties, fields, degrees],
    )

    const totals = useMemo(() => getAlumniTotals(filteredRows), [filteredRows])

    const departures = totals.completed + totals.incomplete
    const graduationRate = rateFromDepartures(totals.completed, totals.incomplete)

    const topFields = useMemo(() => getAlumniTopFields(filteredRows), [filteredRows])

    const topFieldsConfig = useMemo(
        () => buildAlumniTopFieldsConfig(topFields),
        [topFields],
    )

    const topFieldsChart = useMemo(() => toSparseCategoryChart(topFields), [topFields])

    const degreeStructure = useMemo(
        () => getAlumniDegreeStructure(filteredRows),
        [filteredRows],
    )

    const degreeStructureSeries = useMemo(
        () => getAlumniDegreeStructureSeries(filteredRows),
        [filteredRows],
    )

    const degreeStructureConfig = useMemo(
        () => buildAlumniDegreeStructureConfig(degreeStructureSeries),
        [degreeStructureSeries],
    )

    const degreeStructureColumns = useMemo(
        () => buildAlumniDegreeStructureColumns(degreeStructureSeries),
        [degreeStructureSeries],
    )

    const byUniversity = useMemo(
        () => getAlumniByUniversity(filteredRows),
        [filteredRows],
    )

    const byUniversityConfig = useMemo(
        () => buildAlumniByUniversityConfig(byUniversity),
        [byUniversity],
    )

    const byUniversityChart = useMemo(
        () => toSparseCategoryChart(byUniversity),
        [byUniversity],
    )

    const byUniversityFaculty = useMemo(
        () => getAlumniByUniversityFaculty(filteredRows),
        [filteredRows],
    )

    const highestDegree = useMemo(
        () => getAlumniHighestDegree(filteredRows),
        [filteredRows],
    )

    const highestDegreeConfig = useMemo(
        () => buildAlumniHighestDegreeConfig(highestDegree),
        [highestDegree],
    )

    const alumniByUniversityChartHeight = Math.max(
        480,
        Math.max(byUniversity.length, 1) * 44 + 80,
    )
    const topFieldsChartHeight = Math.max(420, Math.max(topFields.length, 1) * 48 + 80)

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Alumni"
                description="Struktura alumni podle vzdělání, oborů a univerzit."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                aria-label="Alumni KPI"
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

            <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Nejvyšší dokončený stupeň"
                    queryKey="alumni-highest-degree-view"
                    className="h-full"
                    action={
                        <InfoTooltip>
                            Rozložení alumni podle nejvyššího dokončeného stupně vzdělání.
                        </InfoTooltip>
                    }
                >
                    <div className="flex min-h-80 w-full items-center justify-center">
                        <PieChart
                            data={highestDegree}
                            config={highestDegreeConfig}
                            innerRadius={70}
                            className="max-h-80"
                        />
                    </div>
                </DataVisulaizationCard>

                <DataVisulaizationCard
                    title="Top studijní obory"
                    queryKey="alumni-top-fields-view"
                    className="h-full"
                    action={
                        <InfoTooltip>Nejčastější studijní obory mezi alumni.</InfoTooltip>
                    }
                    tableExportable={{
                        filename: 'top-studijni-obory',
                        headers: ['Obor', 'Počet'],
                        rows: topFields.map((row) => [row.label, row.count]),
                    }}
                    tabs={[
                        {
                            name: 'Graf',
                            value: 'chart',
                            icon: <ChartColumnIcon />,
                            content: (
                                <div
                                    className="w-full"
                                    style={{ height: topFieldsChartHeight }}
                                >
                                    <BarChart
                                        data={topFieldsChart.data}
                                        config={topFieldsConfig}
                                        categoryKey="label"
                                        series={topFieldsChart.series}
                                        stacked
                                        orientation="horizontal"
                                        showYAxis
                                        categoryMaxLength={22}
                                        xAxisLabel="Počet"
                                        yAxisLabel="Obor"
                                        formatValue={formatPlayerCount}
                                        legendQueryKey="alumni-top-fields-muted"
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
                                    data={topFields}
                                    columns={ALUMNI_TOP_FIELDS_COLUMNS}
                                    getRowKey={(row) => row.label}
                                />
                            ),
                        },
                    ]}
                />
            </section>

            <DataVisulaizationCard
                title="Vývoj stupňové struktury alumni v čase"
                queryKey="alumni-degree-structure-view"
                action={
                    <InfoTooltip>
                        Vývoj podílu stupňů vzdělání mezi alumni podle sezón.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'vyvoj-stupnove-struktury-alumni',
                    headers: [
                        'Sezóna',
                        ...degreeStructureColumns
                            .slice(1)
                            .map((column) => String(column.header)),
                    ],
                    rows: degreeStructure.map((row) => [
                        row.label,
                        ...degreeStructureSeries.map((series) => row[series]),
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <BarChart
                                data={degreeStructure}
                                config={degreeStructureConfig}
                                categoryKey="label"
                                series={[...degreeStructureSeries]}
                                stacked
                                barCategoryGap={0}
                                showYAxis
                                yAxisMax={100}
                                angledXAxis
                                xAxisLabel="Sezóna"
                                yAxisLabel="Podíl (%)"
                                formatValue={(value) =>
                                    `${formatGraduationPercent(value)}`
                                }
                                legendQueryKey="alumni-degree-structure-muted"
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
                                data={degreeStructure}
                                columns={degreeStructureColumns}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Alumni podle univerzity"
                queryKey="alumni-by-university-view"
                action={<InfoTooltip>Počet alumni podle univerzity.</InfoTooltip>}
                tableExportable={{
                    filename: 'alumni-podle-univerzity',
                    headers: ['Univerzita', 'Počet alumni'],
                    rows: byUniversity.map((row) => [row.label, row.count]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <div
                                className="w-full"
                                style={{ height: alumniByUniversityChartHeight }}
                            >
                                <BarChart
                                    data={byUniversityChart.data}
                                    config={byUniversityConfig}
                                    categoryKey="label"
                                    series={byUniversityChart.series}
                                    stacked
                                    orientation="horizontal"
                                    showYAxis
                                    categoryMaxLength={28}
                                    xAxisLabel="Počet alumni"
                                    yAxisLabel="Univerzita"
                                    formatValue={formatPlayerCount}
                                    legendQueryKey="alumni-by-university-muted"
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
                                data={byUniversity}
                                columns={ALUMNI_BY_UNIVERSITY_COLUMNS}
                                getRowKey={(row) => row.label}
                            />
                        ),
                    },
                ]}
            />

            <DataVisulaizationCard
                title="Seznam podle univerzity a fakulty"
                queryKey="alumni-by-university-faculty"
                action={
                    <InfoTooltip>
                        Detailní přehled alumni podle školy, týmu a fakulty včetně podílu.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'seznam-podle-univerzity-a-fakulty',
                    headers: ['Škola', 'Tým', 'Fakulta', 'Počet alumni', 'Podíl'],
                    rows: byUniversityFaculty.map((row) => [
                        row.school,
                        row.team,
                        row.faculty,
                        row.count,
                        row.share,
                    ]),
                }}
            >
                <SimpleTable
                    data={byUniversityFaculty}
                    columns={ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </div>
    )
}
