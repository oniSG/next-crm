import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'

import { POPUP_STATS_BY_MONTH, POPUP_STATS_CHART_CONFIG } from './data'

export function PrehledPopup() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <AreaChartCard
                    title="Úspěšnost"
                    description="Doručeno po měsících."
                    data={POPUP_STATS_BY_MONTH}
                    config={POPUP_STATS_CHART_CONFIG}
                    categoryKey="month"
                    series={['doruceno']}
                    className="w-full"
                />
            </section>
        </div>
    )
}
