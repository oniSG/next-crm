'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'

export type AreaChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    stacked?: boolean
    className?: string
}

export function AreaChartCard({
    action,
    title,
    description,
    data,
    config,
    categoryKey,
    series,
    stacked = true,
    className,
}: AreaChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
                <ChartContainer
                    config={config}
                    className="aspect-auto h-full min-h-56 w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={categoryKey}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {series.map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stackId={stacked ? 'a' : undefined}
                                stroke={`var(--color-${key})`}
                                fill={`var(--color-${key})`}
                                fillOpacity={0.4}
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
