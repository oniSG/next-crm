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
    emptyMessage?: string
}

export function PieChart({
    data,
    config,
    className,
    innerRadius,
    emptyMessage = 'No data for the selected period.',
}: PieChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    if (data.length === 0 || total === 0) {
        return (
            <div
                className={cn(
                    'text-muted-foreground mx-auto flex aspect-square max-h-[280px] w-full items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

    return (
        <ChartContainer
            config={config}
            className={cn(
                'mx-auto aspect-square max-h-[280px] w-full overflow-visible px-0 [&_.recharts-legend-wrapper]:!bottom-0 [&_.recharts-legend-wrapper]:!h-auto [&_.recharts-legend-wrapper]:!w-full [&_.recharts-responsive-container]:overflow-visible [&_.recharts-surface]:overflow-visible',
                className,
            )}
        >
            <RechartsPieChart margin={{ top: 20, right: 28, bottom: 8, left: 28 }}>
                <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) {
                            return null
                        }

                        const item = payload[0]
                        const segmentKey =
                            typeof item.name === 'string'
                                ? item.name
                                : typeof item.payload?.name === 'string'
                                  ? item.payload.name
                                  : undefined
                        const segmentLabel =
                            (segmentKey && config[segmentKey]?.label) ||
                            segmentKey ||
                            ''
                        const num =
                            typeof item.value === 'number'
                                ? item.value
                                : Number(item.value)
                        const percent = total > 0 ? Math.round((num / total) * 100) : 0

                        return (
                            <ChartTooltipContent
                                active={active}
                                hideIndicator
                                label={segmentLabel}
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
                    outerRadius="68%"
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
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </RechartsPieChart>
        </ChartContainer>
    )
}
