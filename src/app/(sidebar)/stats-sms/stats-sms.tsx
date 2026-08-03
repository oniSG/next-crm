import { AreaChart } from '@/components/custom/statistics/area-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { SMS_STATS_BY_MONTH, SMS_STATS_CHART_CONFIG } from './data'

export function StatsSms() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Statistiky SMS"
                description="Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících."
            />

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Úspěšnost"
                    description="Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících."
                    className="w-full"
                    queryKey="sms-success"
                >
                    <AreaChart
                        data={SMS_STATS_BY_MONTH}
                        config={SMS_STATS_CHART_CONFIG}
                        categoryKey="month"
                        series={['doruceno', 'rozkliknuto', 'nedoruceno', 'odhlaseno']}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
