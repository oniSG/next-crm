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
    innerRadius?: number
}

export function PieChart({ data, config, className, innerRadius }: PieChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <ChartContainer
            config={config}
            className={cn('mx-auto aspect-square max-h-[250px] w-full px-0', className)}
        >
            <RechartsPieChart>
                <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) {
                            return null
                        }

                        const item = payload[0]
                        const num =
                            typeof item.value === 'number'
                                ? item.value
                                : Number(item.value)
                        const percent = total > 0 ? Math.round((num / total) * 100) : 0

                        return (
                            <ChartTooltipContent
                                active={active}
                                hideIndicator
                                hideLabel
                                payload={[
                                    {
                                        ...item,
                                        name: 'Hodnota',
                                        value: num,
                                        dataKey: 'value',
                                    },
                                    {
                                        ...item,
                                        name: 'Procenta',
                                        value: `${percent}%`,
                                        dataKey: 'percent',
                                    },
                                ]}
                            />
                        )
                    }}
                />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={innerRadius}
                    labelLine={false}
                    label={({ payload, ...props }) => {
                        const value =
                            typeof payload?.value === 'number' ? payload.value : 0
                        const percent = total > 0 ? Math.round((value / total) * 100) : 0

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
                                {`${value.toLocaleString('cs-CZ')} (${percent}%)`}
                            </text>
                        )
                    }}
                />
            </RechartsPieChart>
        </ChartContainer>
    )
}
