import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'
import { BarChartCard } from '@/components/custom/statistics/bar-chart-card'
import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { LabeledBarChartCard } from '@/components/custom/statistics/labeled-bar-chart-card'
import { LineChartCard } from '@/components/custom/statistics/line-chart-card'
import { NegativeBarChartCard } from '@/components/custom/statistics/negative-bar-chart-card'
import { PieChartCard } from '@/components/custom/statistics/pie-chart-card'
import { RadarChartCard } from '@/components/custom/statistics/radar-chart-card'

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
import InfoSheet from '@/components/custom/other/info-sheet'

export function ExampleDashboard() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <BarChartCard
                    title="Revenue Trend"
                    description="Desktop vs. mobile, monthly totals."
                    data={REVENUE_BY_MONTH}
                    config={REVENUE_CHART_CONFIG}
                    categoryKey="month"
                    series={['desktop', 'mobile']}
                    className="lg:col-span-2"
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
                />
                <PieChartCard
                    title="Customer Segments"
                    description="Share of revenue by plan tier."
                    data={CATEGORY_SHARE}
                    config={CATEGORY_CHART_CONFIG}
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <LineChartCard
                    title="Weekly Traffic"
                    description="Visits and signups by day."
                    data={VISITS_BY_DAY}
                    config={VISITS_CHART_CONFIG}
                    categoryKey="day"
                    series={['visits', 'signups']}
                />
                <AreaChartCard
                    title="MRR Growth"
                    description="New vs. expansion, stacked."
                    data={MRR_BY_MONTH}
                    config={MRR_CHART_CONFIG}
                    categoryKey="month"
                    series={['newMrr', 'expansion']}
                />
                <RadarChartCard
                    title="Team Performance"
                    description="Team score vs. target across metrics."
                    data={PERFORMANCE}
                    config={PERFORMANCE_CHART_CONFIG}
                    categoryKey="metric"
                    series={['team', 'target']}
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <BarChartCard
                    title="Visitors — Horizontal"
                    description="Last 6 months"
                    data={VISITORS_BY_MONTH}
                    config={VISITORS_CHART_CONFIG}
                    categoryKey="month"
                    series={['desktop']}
                    orientation="horizontal"
                />
                <BarChartCard
                    title="Revenue — Stacked"
                    description="Desktop + mobile stacked totals"
                    data={REVENUE_BY_MONTH}
                    config={REVENUE_STACKED_CHART_CONFIG}
                    categoryKey="month"
                    series={['desktop', 'mobile']}
                    stacked
                />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <LabeledBarChartCard
                    title="Sessions by Channel"
                    description="Last 30 days"
                    data={SESSIONS_BY_CHANNEL}
                    config={SESSIONS_CHART_CONFIG}
                    categoryKey="channel"
                    valueKey="sessions"
                />
                <NegativeBarChartCard
                    title="Net Income"
                    description="Monthly P&L, positive / negative"
                    data={NET_INCOME_MONTHLY}
                    config={NET_INCOME_CHART_CONFIG}
                    categoryKey="month"
                    valueKey="netIncome"
                    positiveColor="var(--chart-1)"
                    negativeColor="var(--chart-3)"
                />
            </section>
        </div>
    )
}
