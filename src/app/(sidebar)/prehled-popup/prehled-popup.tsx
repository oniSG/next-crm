import { AreaChart } from '@/components/custom/statistics/area-chart'
import { GraphCard } from '@/components/custom/statistics/graph-card'

import { POPUP_STATS_BY_MONTH, POPUP_STATS_CHART_CONFIG } from './data'

export function PrehledPopup() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <GraphCard
                    title="Úspěšnost"
                    description="Doručeno po měsících."
                    className="w-full"
                    queryKey="prehled-popup-success"
                    content={
                        <AreaChart
                            data={POPUP_STATS_BY_MONTH}
                            config={POPUP_STATS_CHART_CONFIG}
                            categoryKey="month"
                            series={['doruceno']}
                        />
                    }
                />
            </section>
        </div>
    )
}
