'use client'

import {
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type LabeledBarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    valueKey: string
    className?: string
}

export function LabeledBarChart({
    data,
    config,
    categoryKey,
    valueKey,
    className,
}: LabeledBarChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('max-h-75 w-full', className)}
        >
            <RechartsBarChart
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
            </RechartsBarChart>
        </ChartContainer>
    )
}
