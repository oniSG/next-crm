'use client'

import { useMemo } from 'react'
import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import {
    ALUMNI_FIELD_OPTIONS,
    ALUMNI_FILTER_DEFAULTS,
    ALUMNI_SEASON_OPTIONS,
    DEGREE_FILTER_OPTIONS,
    FACULTY_FILTER_OPTIONS,
    FIELD_FILTER_OPTIONS,
    filterByOptionLabel,
    filterBySeasonRange,
    isAllFilter,
    matchesFaculty,
    matchesSchool,
    SCHOOL_FILTER_OPTIONS,
} from '@/lib/alumni/filters'
import { useFilterParam } from '@/lib/alumni/use-filter-param'
import { toSparseCategoryChart } from '@/lib/alumni/sparse-category-chart'
import {
    ALUMNI_BY_UNIVERSITY,
    ALUMNI_BY_UNIVERSITY_COLUMNS,
    ALUMNI_BY_UNIVERSITY_CONFIG,
    ALUMNI_BY_UNIVERSITY_FACULTY,
    ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS,
    ALUMNI_DEGREE_STRUCTURE,
    ALUMNI_DEGREE_STRUCTURE_COLUMNS,
    ALUMNI_DEGREE_STRUCTURE_CONFIG,
    ALUMNI_DEGREE_STRUCTURE_SERIES,
    ALUMNI_HIGHEST_DEGREE,
    ALUMNI_HIGHEST_DEGREE_CONFIG,
    ALUMNI_KPIS,
    ALUMNI_TOP_FIELDS,
    ALUMNI_TOP_FIELDS_COLUMNS,
    ALUMNI_TOP_FIELDS_CONFIG,
    formatGraduationPercent,
    formatPlayerCount,
} from './data'

const seasonValues = ALUMNI_SEASON_OPTIONS.map((option) => option.value)
const schoolValues = SCHOOL_FILTER_OPTIONS.map((option) => option.value)
const facultyValues = FACULTY_FILTER_OPTIONS.map((option) => option.value)
const fieldValues = FIELD_FILTER_OPTIONS.map((option) => option.value)
const degreeValues = DEGREE_FILTER_OPTIONS.map((option) => option.value)

export function Alumni() {
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
    const [school] = useFilterParam(
        'school',
        schoolValues,
        ALUMNI_FILTER_DEFAULTS.school,
    )
    const [faculty] = useFilterParam(
        'faculty',
        facultyValues,
        ALUMNI_FILTER_DEFAULTS.faculty,
    )
    const [field] = useFilterParam(
        'field',
        fieldValues,
        ALUMNI_FILTER_DEFAULTS.field,
    )
    const [degree] = useFilterParam(
        'degree',
        degreeValues,
        ALUMNI_FILTER_DEFAULTS.degree,
    )

    const topFields = useMemo(
        () =>
            filterByOptionLabel(
                ALUMNI_TOP_FIELDS,
                (row) => row.label,
                field,
                ALUMNI_FIELD_OPTIONS,
            ),
        [field],
    )

    const topFieldsChart = useMemo(
        () => toSparseCategoryChart(topFields),
        [topFields],
    )

    const degreeStructure = useMemo(
        () => filterBySeasonRange(ALUMNI_DEGREE_STRUCTURE, seasonFrom, seasonTo),
        [seasonFrom, seasonTo],
    )

    const byUniversity = useMemo(
        () => ALUMNI_BY_UNIVERSITY.filter((row) => matchesSchool(row.label, school)),
        [school],
    )

    const byUniversityChart = useMemo(
        () => toSparseCategoryChart(byUniversity),
        [byUniversity],
    )

    const byUniversityFaculty = useMemo(
        () =>
            ALUMNI_BY_UNIVERSITY_FACULTY.filter(
                (row) =>
                    matchesSchool(row.school, school) &&
                    matchesFaculty(row.faculty, faculty),
            ),
        [school, faculty],
    )

    const highestDegree = useMemo(() => {
        if (isAllFilter(degree)) return ALUMNI_HIGHEST_DEGREE
        // Mock pie only has středoškolské; hide when filtering university degrees
        return []
    }, [degree])

    const alumniByUniversityChartHeight = Math.max(
        480,
        Math.max(byUniversity.length, 1) * 44 + 80,
    )
    const topFieldsChartHeight = Math.max(
        420,
        Math.max(topFields.length, 1) * 48 + 80,
    )

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
                {ALUMNI_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Nejvyšší dokončený stupeň"
                    queryKey="alumni-highest-degree-view"
                    className="h-full"
                    action={
                        <InfoTooltip>
                            Rozložení alumni podle nejvyššího dokončeného stupně
                            vzdělání.
                        </InfoTooltip>
                    }
                >
                    <div
                        className="flex w-full items-center justify-center"
                        style={{ minHeight: topFieldsChartHeight }}
                    >
                        <PieChart
                            data={highestDegree}
                            config={ALUMNI_HIGHEST_DEGREE_CONFIG}
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
                        <InfoTooltip>
                            Nejčastější studijní obory mezi alumni.
                        </InfoTooltip>
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
                                        config={ALUMNI_TOP_FIELDS_CONFIG}
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
                    headers: ['Sezóna', 'Středoškolské (%)'],
                    rows: degreeStructure.map((row) => [
                        row.label,
                        row.stredoskolske,
                    ]),
                }}
                tabs={[
                    {
                        name: 'Graf',
                        value: 'chart',
                        icon: <ChartColumnIcon />,
                        content: (
                            <LineChart
                                data={degreeStructure}
                                config={ALUMNI_DEGREE_STRUCTURE_CONFIG}
                                categoryKey="label"
                                series={[...ALUMNI_DEGREE_STRUCTURE_SERIES]}
                                showYAxis
                                angledXAxis
                                showDots
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
                                columns={ALUMNI_DEGREE_STRUCTURE_COLUMNS}
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
                                    config={ALUMNI_BY_UNIVERSITY_CONFIG}
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
                        Detailní přehled alumni podle školy a fakulty včetně podílu.
                    </InfoTooltip>
                }
                tableExportable={{
                    filename: 'seznam-podle-univerzity-a-fakulty',
                    headers: ['Škola | Tým', 'Fakulta', 'Počet alumni', 'Podíl'],
                    rows: byUniversityFaculty.map((row) => [
                        row.school,
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
