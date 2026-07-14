import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'
import { BarChartCard } from '@/components/custom/statistics/bar-chart-card'
import InfoSheet from '@/components/custom/other/info-sheet'

import {
    EMAIL_DELIVERY_BY_MONTH,
    EMAIL_DELIVERY_CHART_CONFIG,
    EMAIL_STATS_BY_MONTH,
    EMAIL_STATS_CHART_CONFIG,
} from './data'

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

                <BarChartCard
                    title="Doručeno"
                    description="Doručeno, nedoručeno, bouncy a spam po měsících."
                    data={EMAIL_DELIVERY_BY_MONTH}
                    config={EMAIL_DELIVERY_CHART_CONFIG}
                    categoryKey="month"
                    series={['doruceno', 'nedoruceno', 'hardBounce', 'softBounce', 'spam']}
                    stacked
                    className="w-full"
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
                />
            </section>
        </div>
    )
}