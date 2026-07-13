'use client'

import { Pie, PieChart } from 'recharts'

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

export type PieChartCardProps = {
    title: string
    description?: string
    data: { name: string; value: number; fill: string }[]
    config: ChartConfig
    className?: string
}

export function PieChartCard({
    title,
    description,
    data,
    config,
    className,
}: PieChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={config}
                    className="mx-auto aspect-square max-h-65"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="name" />}
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            strokeWidth={4}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            verticalAlign="bottom"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
