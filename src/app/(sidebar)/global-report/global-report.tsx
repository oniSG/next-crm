import { BarChartCard } from '@/components/custom/statistics/bar-chart-card'

import { GLOBAL_REPORT_BY_MONTH, GLOBAL_REPORT_CHART_CONFIG } from './data'

export function GlobalReport() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <BarChartCard
                    title="Globální report"
                    description="Přehled všech metrik po měsících."
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
                    className="w-full"
                />
            </section>
        </div>
    )
}
