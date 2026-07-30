import { AreaChart } from '@/components/custom/statistics/area-chart'
import { GraphCard } from '@/components/custom/statistics/graph-card'

import { SMS_STATS_BY_MONTH, SMS_STATS_CHART_CONFIG } from './data'

export function StatsSms() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <GraphCard
                    title="Úspěšnost"
                    description="Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících."
                    className="w-full"
                >
                    <AreaChart
                        data={SMS_STATS_BY_MONTH}
                        config={SMS_STATS_CHART_CONFIG}
                        categoryKey="month"
                        series={[
                            'doruceno',
                            'rozkliknuto',
                            'nedoruceno',
                            'odhlaseno',
                        ]}
                    />
                </GraphCard>
            </section>
        </div>
    )
}
