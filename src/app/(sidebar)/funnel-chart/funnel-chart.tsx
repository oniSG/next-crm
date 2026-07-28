'use client'

import { Funnel, FunnelChart, LabelList } from 'recharts'

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
} from '@/components/ui/chart'

import { FUNNEL_CHART_CONFIG, FUNNEL_CHART_DATA } from './data'

export function FunnelChartPage() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Funnel chart</CardTitle>
                        <CardDescription>
                            Přehled konverzního trychtýře od zobrazení po objednávku.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={FUNNEL_CHART_CONFIG}
                            className="mx-auto aspect-video min-h-100 w-full"
                        >
                            <FunnelChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent hideLabel nameKey="name" />
                                    }
                                />
                                <Funnel
                                    dataKey="value"
                                    data={FUNNEL_CHART_DATA}
                                    nameKey="name"
                                    isAnimationActive={false}
                                >
                                    <LabelList
                                        position="right"
                                        fill="var(--foreground)"
                                        stroke="none"
                                        dataKey="name"
                                        fontSize={12}
                                    />
                                    <LabelList
                                        position="center"
                                        fill="white"
                                        stroke="none"
                                        dataKey="value"
                                    />
                                </Funnel>
                            </FunnelChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
