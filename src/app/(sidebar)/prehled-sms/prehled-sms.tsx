import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'

import { SMS_STATS_BY_MONTH, SMS_STATS_CHART_CONFIG } from './data'

export function PrehledSms() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <AreaChartCard
                    title="Úspěšnost"
                    description="Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících."
                    data={SMS_STATS_BY_MONTH}
                    config={SMS_STATS_CHART_CONFIG}
                    categoryKey="month"
                    series={['doruceno', 'rozkliknuto', 'nedoruceno', 'odhlaseno']}
                    className="w-full"
                />
            </section>
        </div>
    )
}
