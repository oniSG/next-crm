'use client'

import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import InfoTooltip from '@/components/custom/other/info-tooltip'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import {
    MOBILE_APP_ACTIVITY,
    MOBILE_APP_ACTIVITY_CONFIG,
    MOBILE_APP_ACTIVITY_SERIES,
    PUSH_NOTIFICATION_FLOW,
} from './data'

export function MobileApp() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Mobile app"
                description="Přehled push notifikací a aktivity v mobilní aplikaci."
            />

            <DataVisulaizationCard
                title="Flowchart push notifikací"
                queryKey="push-notification-flow"
            >
                <SankeyChart
                    data={PUSH_NOTIFICATION_FLOW}
                    className="h-56"
                    margin={{ top: 8, right: 120, bottom: 8, left: 16 }}
                />
            </DataVisulaizationCard>

            <DataVisulaizationCard
                title="Aktivita v mobilní aplikaci"
                queryKey="mobile-app-activity"
                action={
                    <InfoTooltip>
                        Počet přihlášení a unikátních přihlášení do mobilní aplikace v
                        čase.
                    </InfoTooltip>
                }
            >
                <LineChart
                    data={MOBILE_APP_ACTIVITY}
                    config={MOBILE_APP_ACTIVITY_CONFIG}
                    categoryKey="datum"
                    series={[...MOBILE_APP_ACTIVITY_SERIES]}
                    showYAxis
                    showDots
                    xAxisLabel="Datum"
                    yAxisLabel="Počet"
                    className="min-h-74"
                />
            </DataVisulaizationCard>
        </div>
    )
}
