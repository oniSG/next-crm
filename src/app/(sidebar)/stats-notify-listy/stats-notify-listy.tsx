import { AreaChart } from '@/components/custom/statistics/area-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'

import { NOTIFY_LISTY_STATS_BY_MONTH, NOTIFY_LISTY_STATS_CHART_CONFIG } from './data'

export function StatsNotifyListy() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Úspěšnost"
                    description="Doručeno po měsících."
                    className="w-full"
                    queryKey="notify-listy-success"
                >
                    <AreaChart
                        data={NOTIFY_LISTY_STATS_BY_MONTH}
                        config={NOTIFY_LISTY_STATS_CHART_CONFIG}
                        categoryKey="month"
                        series={['doruceno']}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
