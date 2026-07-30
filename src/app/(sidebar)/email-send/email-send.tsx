import { GraphCard } from '@/components/custom/statistics/graph-card'
import { LineChart } from '@/components/custom/statistics/line-chart'

import { CLICK_RATE_BY_DAY, CLICK_RATE_CHART_CONFIG } from './data'

export function EmailSend() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <GraphCard
                    title="Míra prokliků"
                    description="Míra prokliků od pondělí do neděle."
                    className="w-full"
                    queryKey="click-rate"
                    content={
                        <LineChart
                            data={CLICK_RATE_BY_DAY}
                            config={CLICK_RATE_CHART_CONFIG}
                            categoryKey="day"
                            series={['miraProkliku']}
                        />
                    }
                />
            </section>
        </div>
    )
}
