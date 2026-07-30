'use client'

import { Pie, PieChart as RechartsPieChart } from 'recharts'

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type PieChartProps = {
    data: { name: string; value: number; fill: string }[]
    config: ChartConfig
    className?: string
    innerRadius?: number
}

export function PieChart({
    data,
    config,
    className,
    innerRadius = 55,
}: PieChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('mx-auto aspect-square max-h-65 w-full', className)}
        >
            <RechartsPieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="name" />}
                />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={innerRadius}
                    strokeWidth={4}
                />
                <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    verticalAlign="bottom"
                />
            </RechartsPieChart>
        </ChartContainer>
    )
}
