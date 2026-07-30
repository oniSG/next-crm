import InfoSheet from '@/components/custom/other/info-sheet'
import { AreaChart } from '@/components/custom/statistics/area-chart'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'

import {
    EMAIL_DELIVERY_BY_MONTH,
    EMAIL_DELIVERY_CHART_CONFIG,
    EMAIL_STATS_BY_MONTH,
    EMAIL_STATS_CHART_CONFIG,
} from './data'

export function StatsEmail() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Úspěšnost"
                    description="Doručeno, otevřeno a kliknuto po měsících."
                    className="w-full"
                    queryKey="email-success"
                >
                    <AreaChart
                        data={EMAIL_STATS_BY_MONTH}
                        config={EMAIL_STATS_CHART_CONFIG}
                        categoryKey="month"
                        series={['doruceno', 'otevreno', 'kliknuto']}
                    />
                </DataVisulaizationCard>

                <DataVisulaizationCard
                    title="Doručeno"
                    description="Doručeno, nedoručeno, bouncy a spam po měsících."
                    className="w-full"
                    queryKey="email-delivery"
                    action={
                        <InfoSheet>
                            <h2>Doručeno</h2>
                            <p>
                                Přehled výsledků doručení rozdělený podle stavu: úspěšně
                                doručené, nedoručené, hard bounce, soft bounce a označené
                                jako spam.
                            </p>
                        </InfoSheet>
                    }
                >
                    <BarChart
                        data={EMAIL_DELIVERY_BY_MONTH}
                        config={EMAIL_DELIVERY_CHART_CONFIG}
                        categoryKey="month"
                        series={[
                            'doruceno',
                            'nedoruceno',
                            'hardBounce',
                            'softBounce',
                            'spam',
                        ]}
                        stacked
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
