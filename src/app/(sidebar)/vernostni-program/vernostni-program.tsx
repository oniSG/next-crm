import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { BODY_BY_MONTH, BODY_CHART_CONFIG } from './data'

export function VernostniProgram() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Věrnostní program"
                description="Vývoj počtu bodů ve věrnostním programu po měsících."
            />

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Počet bodů"
                    description="Vývoj počtu bodů ve věrnostním programu po měsících."
                    className="w-full"
                    queryKey="loyalty-points"
                >
                    <LineChart
                        data={BODY_BY_MONTH}
                        config={BODY_CHART_CONFIG}
                        categoryKey="month"
                        series={['pocetBodu']}
                        showYAxis
                        xAxisLabel="Měsíc"
                        yAxisLabel="Počet bodů"
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
