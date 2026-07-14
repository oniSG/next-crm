import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'

import { PUSH_STATS_BY_MONTH, PUSH_STATS_CHART_CONFIG } from './data'

export function StatsPush() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <AreaChartCard
                    title="Úspěšnost"
                    description="Doručeno a nedoručeno po měsících."
                    data={PUSH_STATS_BY_MONTH}
                    config={PUSH_STATS_CHART_CONFIG}
                    categoryKey="month"
                    series={['doruceno', 'nedoruceno']}
                    className="w-full"
                />
            </section>
        </div>
    )
}
