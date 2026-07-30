'use client'

import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { OverviewKpiCard } from '@/components/custom/statistics/overview-kpi-card'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    COMMUNICATION_CHANNELS,
    COMMUNICATION_CHANNELS_CONFIG,
    EMAIL_CAMPAIGN_FLOW,
    EMAIL_CAMPAIGN_STATS,
    EMAIL_CAMPAIGN_STATS_CONFIG,
    EMAIL_CAMPAIGN_STATS_SERIES,
    EVENT_LISTS,
    GDPR_OPTOUT_COUNTS,
    GDPR_OPTOUT_COUNTS_CONFIG,
    GDPR_UNSUBSCRIBE_STATS,
    GDPR_UNSUBSCRIBE_STATS_CONFIG,
    GDPR_UNSUBSCRIBE_STATS_SERIES,
    NOTICEBOARD_DETAIL,
    NOTICEBOARD_METRIC,
    UNDELIVERED_EMAILS,
    UNDELIVERED_EMAILS_CONFIG,
} from './data'

export function NoticeboardMarketing() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-stretch">
                <div className="grid grid-cols-1 gap-4">
                    <OverviewKpiCard
                        label={NOTICEBOARD_DETAIL.title}
                        metrics={NOTICEBOARD_DETAIL.rows}
                        className="h-full"
                    />
                    <OverviewKpiCard
                        label={NOTICEBOARD_METRIC.title}
                        value={NOTICEBOARD_METRIC.value}
                        className="h-full"
                    />
                </div>

                <DataVisulaizationCard
                    title="Flowchart e-mailových kampaní"
                    className="lg:col-span-3"
                    queryKey="email-campaign-flow"
                >
                    <SankeyChart
                        data={EMAIL_CAMPAIGN_FLOW}
                        className="h-80"
                        margin={{ top: 8, right: 120, bottom: 8, left: 16 }}
                    />
                </DataVisulaizationCard>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="flex h-full min-h-0 flex-col gap-4 lg:col-span-2">
                    <DataVisulaizationCard
                        title="Statistika e-mailových kampaní"
                        description="Doručeno, otevřeno, kliknuto a odhlášeno po dnech."
                        queryKey="email-campaign-stats"
                    >
                        <LineChart
                            data={EMAIL_CAMPAIGN_STATS}
                            config={EMAIL_CAMPAIGN_STATS_CONFIG}
                            categoryKey="datum"
                            series={[...EMAIL_CAMPAIGN_STATS_SERIES]}
                            showYAxis
                            angledXAxis
                            showDots
                            className="min-h-72 flex-1"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Statistika odhlášení GDPR souhlasů"
                        queryKey="gdpr-unsubscribe-stats"
                    >
                        <LineChart
                            data={GDPR_UNSUBSCRIBE_STATS}
                            config={GDPR_UNSUBSCRIBE_STATS_CONFIG}
                            categoryKey="datum"
                            series={[...GDPR_UNSUBSCRIBE_STATS_SERIES]}
                            showYAxis
                            showDots
                            className="min-h-72 flex-1"
                        />
                    </DataVisulaizationCard>
                </div>

                <div className="flex h-full min-h-0 flex-col gap-4">
                    <DataVisulaizationCard
                        title="Komunikační kanály"
                        queryKey="communication-channels"
                    >
                        <PieChart
                            data={COMMUNICATION_CHANNELS}
                            config={COMMUNICATION_CHANNELS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Nedoručené e-maily"
                        queryKey="undelivered-emails"
                    >
                        <PieChart
                            data={UNDELIVERED_EMAILS}
                            config={UNDELIVERED_EMAILS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>

                    <DataVisulaizationCard
                        title="Počty odhlášených GDPR"
                        queryKey="gdpr-optout-counts"
                    >
                        <PieChart
                            data={GDPR_OPTOUT_COUNTS}
                            config={GDPR_OPTOUT_COUNTS_CONFIG}
                            className="max-h-44"
                        />
                    </DataVisulaizationCard>
                </div>
            </div>

            <DataVisulaizationCard title="Seznamy událostí" queryKey="event-lists">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-0">Jméno seznamu</TableHead>
                            <TableHead>Události</TableHead>
                            <TableHead>ID seznamu událostí</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {EVENT_LISTS.map((list) => (
                            <TableRow key={list.id}>
                                <TableCell className="pl-0 font-medium">
                                    {list.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground max-w-md truncate">
                                    {list.events.length > 0
                                        ? `[${list.events.join(', ')}]`
                                        : '[]'}
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                    {list.id}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DataVisulaizationCard>
        </div>
    )
}
