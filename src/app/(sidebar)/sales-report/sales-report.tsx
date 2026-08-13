'use client'

import { KpiCard } from '@/components/custom/statistics/kpi-card'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { getSalesReportKpis } from './data'

export function SalesReport() {
    const kpis = getSalesReportKpis()

    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Sales report"
                description="Přehled zlevněných vstupenek, slev a jejich využití."
            />

            <section
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Sales report KPI"
            >
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </section>
        </div>
    )
}
