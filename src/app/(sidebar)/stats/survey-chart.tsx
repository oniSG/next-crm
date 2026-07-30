import { AreaChart } from '@/components/custom/statistics/area-chart'
import { BarChart } from '@/components/custom/statistics/bar-chart'
import { DataVisulaizationCard } from '@/components/custom/statistics/data-visualization-card'
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
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <PieChart data={question.pieData} config={question.pieConfig} />
                </DataVisulaizationCard>
            )
        case 'bar':
            return (
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <BarChart
                        data={question.barData}
                        config={question.barConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                        stacked={question.stacked}
                    />
                </DataVisulaizationCard>
            )
        case 'line':
            return (
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <LineChart
                        data={question.lineData}
                        config={question.lineConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </DataVisulaizationCard>
            )
        case 'area':
            return (
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <AreaChart
                        data={question.areaData}
                        config={question.areaConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </DataVisulaizationCard>
            )
        case 'radar':
            return (
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <RadarChart
                        data={question.radarData}
                        config={question.radarConfig}
                        categoryKey={question.categoryKey}
                        series={question.series}
                    />
                </DataVisulaizationCard>
            )
        case 'labeledBar':
            return (
                <DataVisulaizationCard
                    title={title}
                    description={question.description}
                    className="w-full"
                    queryKey={question.chartType}
                >
                    <LabeledBarChart
                        data={question.labeledBarData}
                        config={question.labeledBarConfig}
                        categoryKey={question.categoryKey}
                        valueKey={question.valueKey}
                    />
                </DataVisulaizationCard>
            )
    }
}
