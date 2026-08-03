'use client'

import { KpiCard } from '@/components/custom/statistics/kpi-card'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { DATA_QUALITY_KPIS } from './data'

export function DataQuality() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Data quality"
                description="Přehled kvality dat fanoušků."
            />

            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Data quality overview"
            >
                {DATA_QUALITY_KPIS.map((kpi) => (
                    <KpiCard
                        key={kpi.id}
                        label={kpi.label}
                        value={kpi.percent}
                        metric={{ label: kpi.countLabel, value: kpi.count }}
                        trend={kpi.trend}
                        action={
                            <InfoTooltip>
                                {kpi.getTooltip(kpi.percent)}
                            </InfoTooltip>
                        }
                    />
                ))}
            </section>
        </div>
    )
}
