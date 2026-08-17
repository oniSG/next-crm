'use client'

import { Bar, BarChart as RechartsBarChart, CartesianGrid, LabelList } from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

function rowHasVisibleValue(row: object, key: string) {
    const value = (row as Record<string, unknown>)[key]
    return typeof value === 'number' ? value !== 0 : value != null && value !== ''
}

export type NegativeBarChartProps = {
    data: object[]
    config: ChartConfig
    categoryKey: string
    valueKey: string
    positiveColor?: string
    negativeColor?: string
    className?: string
    emptyMessage?: string
}

export function NegativeBarChart({
    data,
    config,
    categoryKey,
    valueKey,
    positiveColor = 'var(--chart-1)',
    negativeColor = 'var(--chart-3)',
    className,
    emptyMessage = 'No data for the selected period.',
}: NegativeBarChartProps) {
    if (data.length === 0 || !data.some((row) => rowHasVisibleValue(row, valueKey))) {
        return (
            <div
                className={cn(
                    'text-muted-foreground flex max-h-75 min-h-56 w-full items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

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
