import { LineChartCard } from '@/components/custom/statistics/line-chart-card'

import { BODY_BY_MONTH, BODY_CHART_CONFIG } from './data'

export function VernostniProgram() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <LineChartCard
                    title="Počet bodů"
                    description="Vývoj počtu bodů ve věrnostním programu po měsících."
                    data={BODY_BY_MONTH}
                    config={BODY_CHART_CONFIG}
                    categoryKey="month"
                    series={['pocetBodu']}
                    className="w-full"
                />
            </section>
        </div>
    )
}
