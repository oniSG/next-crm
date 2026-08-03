import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { RELATOO_INDEX_KPIS } from './data'

export function RelatooIndex() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Relatoo index"
                description="Detailní přehled Relatoo indexu."
            />

            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Relatoo index overview"
            >
                {RELATOO_INDEX_KPIS.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>
        </div>
    )
}
