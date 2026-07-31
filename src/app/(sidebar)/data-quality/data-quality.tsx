'use client'

import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { KpiTrendFooter } from '@/components/custom/statistics/kpi-card'
import InfoTooltip from '@/components/custom/other/info-tooltip'

import { DATA_QUALITY_KPIS } from './data'

export function DataQuality() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Data quality overview"
            >
                {DATA_QUALITY_KPIS.map((kpi) => (
                    <DataVisulaizationCard
                        key={kpi.id}
                        title={kpi.label}
                        queryKey={`data-quality-${kpi.id}`}
                        action={
                            <InfoTooltip>{kpi.getTooltip(kpi.percent)}</InfoTooltip>
                        }
                        footer={<KpiTrendFooter trend={kpi.trend} />}
                    >
                        <div className="flex items-baseline justify-between gap-4 py-2">
                            <span className="text-3xl font-medium tabular-nums">
                                {kpi.percent}
                            </span>
                            <div className="text-muted-foreground flex items-baseline gap-1.5 text-sm">
                                <span>{kpi.countLabel}</span>
                                <span aria-hidden>—</span>
                                <span className="tabular-nums">{kpi.count}</span>
                            </div>
                        </div>
                    </DataVisulaizationCard>
                ))}
            </section>
        </div>
    )
}
