'use client'

import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'
import { BarChartCard } from '@/components/custom/statistics/bar-chart-card'
import { LabeledBarChartCard } from '@/components/custom/statistics/labeled-bar-chart-card'
import { LineChartCard } from '@/components/custom/statistics/line-chart-card'
import { PieChartCard } from '@/components/custom/statistics/pie-chart-card'
import { RadarChartCard } from '@/components/custom/statistics/radar-chart-card'

import type { StatsQuestion } from './data'

const chartClassName = 'w-full min-h-72 border-0 bg-transparent shadow-none ring-0'

export function SurveyChart({ question }: { question: StatsQuestion }) {
    switch (question.chartType) {
        case 'pie':
            return (
                <PieChartCard
                    title=" "
                    description={question.description}
                    data={question.pieData}
                    config={question.pieConfig}
                    className={chartClassName}
                />
            )
        case 'bar':
            return (
                <BarChartCard
                    title=" "
                    description={question.description}
                    data={question.barData}
                    config={question.barConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    stacked={question.stacked}
                    className={chartClassName}
                />
            )
        case 'line':
            return (
                <LineChartCard
                    title=" "
                    description={question.description}
                    data={question.lineData}
                    config={question.lineConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className={chartClassName}
                />
            )
        case 'area':
            return (
                <AreaChartCard
                    title=" "
                    description={question.description}
                    data={question.areaData}
                    config={question.areaConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className={chartClassName}
                />
            )
        case 'radar':
            return (
                <RadarChartCard
                    title=" "
                    description={question.description}
                    data={question.radarData}
                    config={question.radarConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className={chartClassName}
                />
            )
        case 'labeledBar':
            return (
                <LabeledBarChartCard
                    title=" "
                    description={question.description}
                    data={question.labeledBarData}
                    config={question.labeledBarConfig}
                    categoryKey={question.categoryKey}
                    valueKey={question.valueKey}
                    className={chartClassName}
                />
            )
    }
}
