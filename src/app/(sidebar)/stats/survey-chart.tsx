import { AreaChartCard } from '@/components/custom/statistics/area-chart-card'
import { BarChartCard } from '@/components/custom/statistics/bar-chart-card'
import { LabeledBarChartCard } from '@/components/custom/statistics/labeled-bar-chart-card'
import { LineChartCard } from '@/components/custom/statistics/line-chart-card'
import { PieChartCard } from '@/components/custom/statistics/pie-chart-card'
import { RadarChartCard } from '@/components/custom/statistics/radar-chart-card'

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
                <PieChartCard
                    title={title}
                    description={question.description}
                    data={question.pieData}
                    config={question.pieConfig}
                    className="w-full"
                />
            )
        case 'bar':
            return (
                <BarChartCard
                    title={title}
                    description={question.description}
                    data={question.barData}
                    config={question.barConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    stacked={question.stacked}
                    className="w-full"
                />
            )
        case 'line':
            return (
                <LineChartCard
                    title={title}
                    description={question.description}
                    data={question.lineData}
                    config={question.lineConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className="w-full"
                />
            )
        case 'area':
            return (
                <AreaChartCard
                    title={title}
                    description={question.description}
                    data={question.areaData}
                    config={question.areaConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className="w-full"
                />
            )
        case 'radar':
            return (
                <RadarChartCard
                    title={title}
                    description={question.description}
                    data={question.radarData}
                    config={question.radarConfig}
                    categoryKey={question.categoryKey}
                    series={question.series}
                    className="w-full"
                />
            )
        case 'labeledBar':
            return (
                <LabeledBarChartCard
                    title={title}
                    description={question.description}
                    data={question.labeledBarData}
                    config={question.labeledBarConfig}
                    categoryKey={question.categoryKey}
                    valueKey={question.valueKey}
                    className="w-full"
                />
            )
    }
}
