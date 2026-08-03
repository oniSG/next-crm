import { AreaChart } from '@/components/custom/statistics/area-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { PUSH_STATS_BY_MONTH, PUSH_STATS_CHART_CONFIG } from './data'

export function StatsPush() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Statistiky push"
                description="Doručeno a nedoručeno po měsících."
            />

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Úspěšnost"
                    description="Doručeno a nedoručeno po měsících."
                    className="w-full"
                    queryKey="push-success"
                >
                    <AreaChart
                        data={PUSH_STATS_BY_MONTH}
                        config={PUSH_STATS_CHART_CONFIG}
                        categoryKey="month"
                        series={['doruceno', 'nedoruceno']}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
