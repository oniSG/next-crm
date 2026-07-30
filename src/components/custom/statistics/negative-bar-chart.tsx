'use client'

import { Bar, BarChart as RechartsBarChart, CartesianGrid, LabelList } from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type NegativeBarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    valueKey: string
    positiveColor?: string
    negativeColor?: string
    className?: string
}

export function NegativeBarChart({
    data,
    config,
    categoryKey,
    valueKey,
    positiveColor = 'var(--chart-1)',
    negativeColor = 'var(--chart-3)',
    className,
}: NegativeBarChartProps) {
    const withFill = data.map((d) => {
        const record = d as Record<string, unknown>
        const value = record[valueKey]
        const fill =
            typeof value === 'number' && value < 0 ? negativeColor : positiveColor
        return { ...record, fill }
    })

    return (
        <ChartContainer
            config={config}
            className={cn('max-h-75 w-full', className)}
        >
            <RechartsBarChart accessibilityLayer data={withFill}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Bar dataKey={valueKey} radius={4}>
                    <LabelList
                        dataKey={categoryKey}
                        position="top"
                        fillOpacity={1}
                        fontSize={12}
                    />
                </Bar>
            </RechartsBarChart>
        </ChartContainer>
    )
}
