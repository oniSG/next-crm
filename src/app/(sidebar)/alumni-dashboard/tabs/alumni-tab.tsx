'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'

import InfoTooltip from '@/components/custom/other/info-tooltip'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SimpleTable } from '@/components/custom/statistics/simple-table'

import {
    ALUMNI_BY_UNIVERSITY,
    ALUMNI_BY_UNIVERSITY_COLUMNS,
    ALUMNI_BY_UNIVERSITY_CONFIG,
    ALUMNI_BY_UNIVERSITY_FACULTY,
    ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS,
    ALUMNI_BY_UNIVERSITY_SERIES,
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
    ALUMNI_TOP_FIELDS_SERIES,
    formatGraduationPercent,
    formatPlayerCount,
} from '../data'

export function AlumniTab() {
    const alumniByUniversityChartHeight = Math.max(
        480,
        ALUMNI_BY_UNIVERSITY.length * 44 + 80,
    )
    const topFieldsChartHeight = Math.max(
        420,
        ALUMNI_TOP_FIELDS.length * 48 + 80,
    )

    return (
        <>
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
                            data={ALUMNI_HIGHEST_DEGREE}
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
                        rows: ALUMNI_TOP_FIELDS.map((row) => [
                            row.label,
                            row.count,
                        ]),
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
                                        data={ALUMNI_TOP_FIELDS}
                                        config={ALUMNI_TOP_FIELDS_CONFIG}
                                        categoryKey="label"
                                        series={[...ALUMNI_TOP_FIELDS_SERIES]}
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
                                    data={ALUMNI_TOP_FIELDS}
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
                    rows: ALUMNI_DEGREE_STRUCTURE.map((row) => [
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
                                data={ALUMNI_DEGREE_STRUCTURE}
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
                                data={ALUMNI_DEGREE_STRUCTURE}
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
                    rows: ALUMNI_BY_UNIVERSITY.map((row) => [row.label, row.count]),
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
                                    data={ALUMNI_BY_UNIVERSITY}
                                    config={ALUMNI_BY_UNIVERSITY_CONFIG}
                                    categoryKey="label"
                                    series={[...ALUMNI_BY_UNIVERSITY_SERIES]}
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
                                data={ALUMNI_BY_UNIVERSITY}
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
                    rows: ALUMNI_BY_UNIVERSITY_FACULTY.map((row) => [
                        row.school,
                        row.faculty,
                        row.count,
                        row.share,
                    ]),
                }}
            >
                <SimpleTable
                    data={ALUMNI_BY_UNIVERSITY_FACULTY}
                    columns={ALUMNI_BY_UNIVERSITY_FACULTY_COLUMNS}
                    getRowKey={(row) => row.id}
                />
            </DataVisulaizationCard>
        </>
    )
}
