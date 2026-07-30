'use client'

import { MoreHorizontalIcon } from 'lucide-react'

import { DetailCard } from '@/components/custom/statistics/detail-card'
import { GraphCard } from '@/components/custom/statistics/graph-card'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { ValueCard } from '@/components/custom/statistics/value-card'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
    NOTICEBOARD_DETAILS,
    NOTICEBOARD_METRICS,
    UNDELIVERED_EMAILS,
    UNDELIVERED_EMAILS_CONFIG,
} from './data'

export function NoticeboardMarketing() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-stretch">
                <div className="grid grid-cols-1 gap-4">
                    {NOTICEBOARD_DETAILS.map((detail) => (
                        <DetailCard
                            key={detail.title}
                            title={detail.title}
                            rows={detail.rows}
                            className="h-full"
                        />
                    ))}
                    {NOTICEBOARD_METRICS.map((metric) => (
                        <ValueCard
                            key={metric.title}
                            title={metric.title}
                            value={metric.value}
                            className="h-full"
                        />
                    ))}
                </div>

                <GraphCard
                    title="Flowchart e-mailových kampaní"
                    className="lg:col-span-3"
                >
                    <SankeyChart
                        data={EMAIL_CAMPAIGN_FLOW}
                        className="h-80"
                        margin={{ top: 8, right: 120, bottom: 8, left: 16 }}
                    />
                </GraphCard>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="flex h-full min-h-0 flex-col gap-4 lg:col-span-2">
                    <GraphCard title="Statistika e-mailových kampaní">
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
                    </GraphCard>

                    <GraphCard title="Statistika odhlášení GDPR souhlasů">
                        <LineChart
                            data={GDPR_UNSUBSCRIBE_STATS}
                            config={GDPR_UNSUBSCRIBE_STATS_CONFIG}
                            categoryKey="datum"
                            series={[...GDPR_UNSUBSCRIBE_STATS_SERIES]}
                            showYAxis
                            showDots
                            className="min-h-72 flex-1"
                        />
                    </GraphCard>
                </div>

                <div className="flex h-full min-h-0 flex-col gap-4">
                    <GraphCard title="Komunikační kanály">
                        <PieChart
                            data={COMMUNICATION_CHANNELS}
                            config={COMMUNICATION_CHANNELS_CONFIG}
                            className="max-h-44"
                            innerRadius={40}
                        />
                    </GraphCard>

                    <GraphCard title="Nedoručené e-maily">
                        <PieChart
                            data={UNDELIVERED_EMAILS}
                            config={UNDELIVERED_EMAILS_CONFIG}
                            className="max-h-44"
                            innerRadius={40}
                        />
                    </GraphCard>

                    <GraphCard title="Počty odhlášených GDPR">
                        <PieChart
                            data={GDPR_OPTOUT_COUNTS}
                            config={GDPR_OPTOUT_COUNTS_CONFIG}
                            className="max-h-44"
                            innerRadius={40}
                        />
                    </GraphCard>
                </div>
            </div>

            <GraphCard title="Seznamy událostí">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Jméno seznamu</TableHead>
                            <TableHead>Události</TableHead>
                            <TableHead>ID seznamu událostí</TableHead>
                            <TableHead className="w-12 text-right">
                                Akce
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {EVENT_LISTS.map((list) => (
                            <TableRow key={list.id}>
                                <TableCell className="font-medium">
                                    {list.name}
                                </TableCell>
                                <TableCell className="max-w-md truncate text-muted-foreground">
                                    {list.events.length > 0
                                        ? `[${list.events.join(', ')}]`
                                        : '[]'}
                                </TableCell>
                                <TableCell className="font-mono text-xs">
                                    {list.id}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-muted-foreground"
                                                    aria-label={`Akce pro ${list.name}`}
                                                />
                                            }
                                        >
                                            <MoreHorizontalIcon />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Upravit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Duplikovat
                                            </DropdownMenuItem>
                                            <DropdownMenuItem variant="destructive">
                                                Smazat
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <p className="text-muted-foreground mt-3 text-right text-xs">
                    {EVENT_LISTS.length} řádků
                </p>
            </GraphCard>
        </div>
    )
}
