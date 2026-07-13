'use client'

import { Bar, BarChart, CartesianGrid, LabelList } from 'recharts'

import {
    Card,
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

export type NegativeBarChartCardProps = {
    title: string
    description?: string
    data: object[]
    config: ChartConfig
    categoryKey: string
    valueKey: string
    positiveColor?: string
    negativeColor?: string
    className?: string
}

export function NegativeBarChartCard({
    title,
    description,
    data,
    config,
    categoryKey,
    valueKey,
    positiveColor = 'var(--chart-1)',
    negativeColor = 'var(--chart-3)',
    className,
}: NegativeBarChartCardProps) {
    const withFill = data.map((d) => {
        const record = d as Record<string, unknown>
        const value = record[valueKey]
        const fill =
            typeof value === 'number' && value < 0 ? negativeColor : positiveColor
        return { ...record, fill }
    })

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} className="max-h-75 w-full">
                    <BarChart accessibilityLayer data={withFill}>
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
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
