import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { GLOBAL_REPORT_BY_MONTH, GLOBAL_REPORT_CHART_CONFIG } from './data'

export function GlobalReport() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <ReportHeaderCard
                title="Globální report"
                description="Přehled všech metrik po měsících."
            />

            <section className="grid grid-cols-1 gap-4">
                <DataVisulaizationCard
                    title="Globální report"
                    description="Přehled všech metrik po měsících."
                    queryKey="global-report"
                    className="w-full"
                >
                    <BarChart
                        data={GLOBAL_REPORT_BY_MONTH}
                        config={GLOBAL_REPORT_CHART_CONFIG}
                        categoryKey="month"
                        series={[
                            'doruceno',
                            'unikatniOtevreni',
                            'unikatniProklik',
                            'nedoruceno',
                            'odhlaseno',
                            'hardBounce',
                            'softBounce',
                            'spam',
                        ]}
                        stacked
                        showYAxis
                        xAxisLabel="Měsíc"
                        yAxisLabel="Počet"
                        className="h-80"
                    />
                </DataVisulaizationCard>
            </section>
        </div>
    )
}
