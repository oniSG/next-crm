import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'

import { EMAIL_STATS_BY_MONTH, EMAIL_STATS_CHART_CONFIG } from './data'

export function PrehledEmailu() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <AreaChartCard
                    title="Úspěšnost"
                    description="Doručeno, otevřeno a kliknuto po měsících."
                    data={EMAIL_STATS_BY_MONTH}
                    config={EMAIL_STATS_CHART_CONFIG}
                    categoryKey="month"
                    series={['doruceno', 'otevreno', 'kliknuto']}
                    className="w-full"
                />
            </section>
        </div>
    )
}