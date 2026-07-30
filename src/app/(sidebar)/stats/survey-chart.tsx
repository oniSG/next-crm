import { AreaChart } from '@/components/custom/statistics/area-chart'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { GraphCard } from '@/components/custom/statistics/graph-card'
import { LabeledBarChart } from '@/components/custom/statistics/labeled-bar-chart'
import { LineChart } from '@/components/custom/statistics/line-chart'
import { PieChart } from '@/components/custom/statistics/pie-chart'
import { RadarChart } from '@/components/custom/statistics/radar-chart'

import type { StatsQuestion } from './data'

export function SurveyChart({
    question,
    title,
}: {
    question: StatsQuestion
    title: string
}) {
    switch (question.chartType) {
        case 'pie':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <PieChart
                        data={question.pieData}
                        config={question.pieConfig}
                    />
                </GraphCard>
            )
        case 'bar':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <BarChart
                        data={question.barData}
                        config={question.barConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                        stacked={question.stacked}
                    />
                </GraphCard>
            )
        case 'line':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <LineChart
                        data={question.lineData}
                        config={question.lineConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </GraphCard>
            )
        case 'area':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <AreaChart
                        data={question.areaData}
                        config={question.areaConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </GraphCard>
            )
        case 'radar':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <RadarChart
                        data={question.radarData}
                        config={question.radarConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </GraphCard>
            )
        case 'labeledBar':
            return (
                <GraphCard
                    title={title}
                    description={question.description}
                    className="w-full"
                >
                    <LabeledBarChart
                        data={question.labeledBarData}
                        config={question.labeledBarConfig}
                        categoryKey={question.categoryKey}
                        valueKey={question.valueKey}
                    />
                </GraphCard>
            )
    }
}
