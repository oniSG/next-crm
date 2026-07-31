import { KpiCard } from '@/components/custom/statistics/kpi-card'

import { DATA_QUALITY_KPIS } from './data'

export function DataQuality() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Data quality overview"
            >
                {DATA_QUALITY_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>
        </div>
    )
}
