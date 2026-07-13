'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

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
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'

export type LabeledBarChartCardProps = {
    action?: React.ReactNode
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    valueKey: string
    className?: string
}

export function LabeledBarChartCard({
    action,
    title,
    description,
    data,
    config,
    categoryKey,
    valueKey,
    className,
}: LabeledBarChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {action && <CardAction>{action}</CardAction>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} className="max-h-75 w-full">
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{ right: 16 }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey={categoryKey}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <XAxis dataKey={valueKey} type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey={valueKey}
                            fill={`var(--color-${valueKey})`}
                            radius={4}
                        >
                            <LabelList
                                dataKey={categoryKey}
                                position="insideLeft"
                                offset={8}
                                className="fill-background"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey={valueKey}
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
