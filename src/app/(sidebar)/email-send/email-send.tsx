import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { CLICK_RATE_BY_DAY, CLICK_RATE_CHART_CONFIG } from './data'

export function EmailSend() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Email send"
                description="Míra prokliků od pondělí do neděle."
            />

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Míra prokliků"
                    description="Míra prokliků od pondělí do neděle."
                    className="w-full"
                    queryKey="click-rate"
                >
                    <LineChart
                        data={CLICK_RATE_BY_DAY}
                        config={CLICK_RATE_CHART_CONFIG}
                        categoryKey="day"
                        series={['miraProkliku']}
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
