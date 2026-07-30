import { AreaChart } from '@/components/custom/statistics/area-chart'
import { GraphCard } from '@/components/custom/statistics/graph-card'

import { PUSH_STATS_BY_MONTH, PUSH_STATS_CHART_CONFIG } from './data'

export function PrehledPush() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <GraphCard
                    title="Úspěšnost"
                    description="Doručeno a nedoručeno po měsících."
                    className="w-full"
                    queryKey="prehled-push-success"
                    content={
                        <AreaChart
                            data={PUSH_STATS_BY_MONTH}
                            config={PUSH_STATS_CHART_CONFIG}
                            categoryKey="month"
                            series={['doruceno', 'nedoruceno']}
                        />
                    }
                />
            </section>
        </div>
    )
}
