import { AreaChart } from '@/components/custom/statistics/area-chart'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LabeledBarChart } from '@/components/custom/statistics/labeled-bar-chart'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { NegativeBarChart } from '@/components/custom/statistics/negative-bar-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { RadarChart } from '@/components/custom/statistics/radar-chart'
import InfoSheet from '@/components/custom/other/info-sheet'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import {
    CATEGORY_CHART_CONFIG,
    CATEGORY_SHARE,
    KPIS,
    MRR_BY_MONTH,
    MRR_CHART_CONFIG,
    NET_INCOME_CHART_CONFIG,
    NET_INCOME_MONTHLY,
    PERFORMANCE,
    PERFORMANCE_CHART_CONFIG,
    REVENUE_BY_MONTH,
    REVENUE_CHART_CONFIG,
    REVENUE_STACKED_CHART_CONFIG,
    SESSIONS_BY_CHANNEL,
    SESSIONS_CHART_CONFIG,
    VISITORS_BY_MONTH,
    VISITORS_CHART_CONFIG,
    VISITS_BY_DAY,
    VISITS_CHART_CONFIG,
} from './data'

export function ExampleDashboard() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Example Dashboard"
                description="This is an example dashboard for printing."
            />

            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <DataVisulaizationCard
                    title="Revenue Trend"
                    description="Desktop vs. mobile, monthly totals."
                    className="lg:col-span-2"
                    queryKey="revenue-trend"
                    action={
                        <InfoSheet>
                            <h2>What is kpi card?</h2>
                            <p>
                                The KPI card is a component that displays key performance
                                indicators (KPIs) in a concise and visually appealing
                                manner. It typically includes a label, value, delta
                                (change), and trend indicator to provide insights into the
                                performance of a specific metric.
                            </p>
                            <p>Add more...</p>
                        </InfoSheet>
                    }
                >
                    <BarChart
                        data={REVENUE_BY_MONTH}
                        config={REVENUE_CHART_CONFIG}
                        categoryKey="month"
                        series={['desktop', 'mobile']}
                    />
                </DataVisulaizationCard>
                <DataVisulaizationCard
                    title="Customer Segments"
                    description="Share of revenue by plan tier."
                    queryKey="customer-segments"
                >
                    <PieChart data={CATEGORY_SHARE} config={CATEGORY_CHART_CONFIG} />
                </DataVisulaizationCard>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <DataVisulaizationCard
                    title="Weekly Traffic"
                    description="Visits and signups by day."
                    queryKey="weekly-traffic"
                >
                    <LineChart
                        data={VISITS_BY_DAY}
                        config={VISITS_CHART_CONFIG}
                        categoryKey="day"
                        series={['visits', 'signups']}
                    />
                </DataVisulaizationCard>
                <DataVisulaizationCard
                    title="MRR Growth"
                    description="New vs. expansion, stacked."
                    queryKey="mrr-growth"
                >
                    <AreaChart
                        data={MRR_BY_MONTH}
                        config={MRR_CHART_CONFIG}
                        categoryKey="month"
                        series={['newMrr', 'expansion']}
                    />
                </DataVisulaizationCard>
                <DataVisulaizationCard
                    title="Team Performance"
                    description="Team score vs. target across metrics."
                    queryKey="team-performance"
                >
                    <RadarChart
                        data={PERFORMANCE}
                        config={PERFORMANCE_CHART_CONFIG}
                        categoryKey="metric"
                        series={['team', 'target']}
                    />
                </DataVisulaizationCard>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Visitors — Horizontal"
                    description="Last 6 months"
                    queryKey="visitors-horizontal"
                >
                    <BarChart
                        data={VISITORS_BY_MONTH}
                        config={VISITORS_CHART_CONFIG}
                        categoryKey="month"
                        series={['desktop']}
                        orientation="horizontal"
                    />
                </DataVisulaizationCard>
                <DataVisulaizationCard
                    title="Revenue — Stacked"
                    description="Desktop + mobile stacked totals"
                    queryKey="revenue-stacked"
                >
                    <BarChart
                        data={REVENUE_BY_MONTH}
                        config={REVENUE_STACKED_CHART_CONFIG}
                        categoryKey="month"
                        series={['desktop', 'mobile']}
                        stacked
                    />
                </DataVisulaizationCard>
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DataVisulaizationCard
                    title="Sessions by Channel"
                    description="Last 30 days"
                    queryKey="sessions-by-channel"
                >
                    <LabeledBarChart
                        data={SESSIONS_BY_CHANNEL}
                        config={SESSIONS_CHART_CONFIG}
                        categoryKey="channel"
                        valueKey="sessions"
                    />
                </DataVisulaizationCard>
                <DataVisulaizationCard
                    title="Net Income"
                    description="Monthly P&L, positive / negative"
                    queryKey="net-income"
                >
                    <NegativeBarChart
                        data={NET_INCOME_MONTHLY}
                        config={NET_INCOME_CHART_CONFIG}
                        categoryKey="month"
                        valueKey="netIncome"
                        positiveColor="var(--chart-1)"
                        negativeColor="var(--chart-3)"
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
