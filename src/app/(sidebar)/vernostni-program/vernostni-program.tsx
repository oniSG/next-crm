import { GraphCard } from '@/components/custom/statistics/graph-card'
import { LineChart } from '@/components/custom/statistics/line-chart'

import { BODY_BY_MONTH, BODY_CHART_CONFIG } from './data'

export function VernostniProgram() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <GraphCard
                    title="Počet bodů"
                    description="Vývoj počtu bodů ve věrnostním programu po měsících."
                    className="w-full"
                    queryKey="loyalty-points"
                    content={
                        <LineChart
                            data={BODY_BY_MONTH}
                            config={BODY_CHART_CONFIG}
                            categoryKey="month"
                            series={['pocetBodu']}
                        />
                    }
                />
            </section>
        </div>
    )
}
