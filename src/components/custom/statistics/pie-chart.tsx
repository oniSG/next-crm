'use client'

import { Pie, PieChart as RechartsPieChart } from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export type PieChartProps = {
    data: { name: string; value: number; fill: string }[]
    config: ChartConfig
    className?: string
}

export function PieChart({ data, config, className }: PieChartProps) {
    return (
        <ChartContainer
            config={config}
            className={cn('mx-auto aspect-square max-h-[250px] w-full px-0', className)}
        >
            <RechartsPieChart>
                <ChartTooltip
                    content={<ChartTooltipContent hideLabel nameKey="name" />}
                />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    labelLine={false}
                    label={({ payload, ...props }) => {
                        const value =
                            typeof payload?.value === 'number' ? payload.value : 0

                        return (
                            <text
                                cx={props.cx}
                                cy={props.cy}
                                x={props.x}
                                y={props.y}
                                textAnchor={props.textAnchor}
                                dominantBaseline={props.dominantBaseline}
                                fill="var(--foreground)"
                                className="text-xs"
                            >
                                {value.toLocaleString('cs-CZ')}%
                            </text>
                        )
                    }}
                />
            </RechartsPieChart>
        </ChartContainer>
    )
}
