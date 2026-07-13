'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

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

export type LineChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    className?: string
}

export function LineChartCard({
    action,
    title,
    description,
    data,
    config,
    categoryKey,
    series,
    className,
}: LineChartCardProps) {
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
                    <LineChart
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
                            <Line
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={`var(--color-${key})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
