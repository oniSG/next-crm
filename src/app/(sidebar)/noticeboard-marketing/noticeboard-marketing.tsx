'use client'

import { MoreHorizontalIcon } from 'lucide-react'

import { DetailCard } from '@/components/custom/statistics/detail-card'
import { SankeyChart } from '@/components/custom/statistics/sankey-chart'
import { ValueCard } from '@/components/custom/statistics/value-card'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { EMAIL_CAMPAIGN_FLOW, NOTICEBOARD_DETAILS, NOTICEBOARD_METRICS } from './data'

export function NoticeboardMarketing() {
    return (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-4 lg:items-stretch">
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

            <Card className="gap-0 lg:col-span-3">
                <CardHeader className="pb-2">
                    <CardTitle className="truncate text-sm font-medium">
                        Flowchart e-mailových kampaní
                    </CardTitle>
                    <CardAction>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground"
                            aria-label="Další možnosti"
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <SankeyChart
                        data={EMAIL_CAMPAIGN_FLOW}
                        className="h-80"
                        margin={{ top: 8, right: 120, bottom: 8, left: 16 }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
