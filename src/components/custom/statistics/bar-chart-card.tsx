'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
    Card,
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

export type BarChartCardProps = {
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    series: string[]
    orientation?: 'vertical' | 'horizontal'
    stacked?: boolean
    className?: string
}

function getBarRadius(
    index: number,
    total: number,
    stacked: boolean,
    orientation: 'vertical' | 'horizontal',
): number | [number, number, number, number] {
    if (!stacked || total === 1) return 4
    if (orientation === 'vertical') {
        if (index === 0) return [0, 0, 4, 4]
        if (index === total - 1) return [4, 4, 0, 0]
        return [0, 0, 0, 0]
    }
    if (index === 0) return [4, 0, 0, 4]
    if (index === total - 1) return [0, 4, 4, 0]
    return [0, 0, 0, 0]
}

export function BarChartCard({
    title,
    description,
    data,
    config,
    categoryKey,
    series,
    orientation = 'vertical',
    stacked = false,
    className,
}: BarChartCardProps) {
    const isHorizontal = orientation === 'horizontal'

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} className="max-h-75 w-full">
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout={isHorizontal ? 'vertical' : 'horizontal'}
                        margin={isHorizontal ? { left: -20 } : { left: 12, right: 12 }}
                    >
                        {isHorizontal ? (
                            <>
                                <CartesianGrid horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey={categoryKey}
                                    type="category"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                            </>
                        ) : (
                            <>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey={categoryKey}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                            </>
                        )}
                        <ChartTooltip content={<ChartTooltipContent />} />
                        {series.length > 1 && (
                            <ChartLegend content={<ChartLegendContent />} />
                        )}
                        {series.map((key, i) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={`var(--color-${key})`}
                                stackId={stacked ? 'a' : undefined}
                                radius={getBarRadius(
                                    i,
                                    series.length,
                                    stacked,
                                    orientation,
                                )}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
