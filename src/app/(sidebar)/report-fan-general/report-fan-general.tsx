'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
    DataVisulaizationCard,
    type GraphCardTab,
} from '@/components/custom/statistics/data-visualization-card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import {
    EMAIL_REPORT_BY_DAY,
    EMAIL_REPORT_CHART_CONFIG,
    EMAIL_REPORT_SERIES,
    PUSH_REPORT_BY_DAY,
    PUSH_REPORT_CHART_CONFIG,
    PUSH_REPORT_SERIES,
    SMS_REPORT_BY_DAY,
    SMS_REPORT_CHART_CONFIG,
    SMS_REPORT_SERIES,
    type Period,
} from './data'
import {
    aggregateByPeriod,
    filterByDateRange,
    useReportDateRange,
    useReportPeriod,
    type ChartRow,
} from './report-utils'

function periodColumnLabel(period: Period) {
    if (period === 'day') return 'Den'
    if (period === 'month') return 'Měsíc'
    return 'Rok'
}

function ReportChart({
    config,
    series,
    data,
    period,
}: {
    config: ChartConfig
    series: readonly string[]
    data: ChartRow[]
    period: Period
}) {
    return (
        <ChartContainer config={config} className="max-h-75 w-full">
            <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={period === 'day' ? 24 : 8}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={48}
                    tickFormatter={(value) => Number(value).toLocaleString('cs-CZ')}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {series.map((key, i) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={`var(--color-${key})`}
                        stackId="a"
                        radius={
                            i === 0
                                ? [0, 0, 4, 4]
                                : i === series.length - 1
                                  ? [4, 4, 0, 0]
                                  : [0, 0, 0, 0]
                        }
                    />
                ))}
            </BarChart>
        </ChartContainer>
    )
}

function ReportTable({
    config,
    series,
    data,
    period,
}: {
    config: ChartConfig
    series: readonly string[]
    data: ChartRow[]
    period: Period
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{periodColumnLabel(period)}</TableHead>
                    {series.map((key) => (
                        <TableHead key={key} className="text-right">
                            {config[key]?.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={String(row.label)}>
                        <TableCell className="font-medium">{row.label}</TableCell>
                        {series.map((key) => (
                            <TableCell key={key} className="text-right">
                                {Number(row[key]).toLocaleString('cs-CZ')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function ReportFanGeneral() {
    const [period] = useReportPeriod()
    const { dateRange } = useReportDateRange()

    const emailData = aggregateByPeriod(
        filterByDateRange(EMAIL_REPORT_BY_DAY, dateRange),
        EMAIL_REPORT_SERIES,
        period,
    )
    const smsData = aggregateByPeriod(
        filterByDateRange(SMS_REPORT_BY_DAY, dateRange),
        SMS_REPORT_SERIES,
        period,
    )
    const pushData = aggregateByPeriod(
        filterByDateRange(PUSH_REPORT_BY_DAY, dateRange),
        PUSH_REPORT_SERIES,
        period,
    )

    const VIEW_TABS_EMAIL: GraphCardTab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ReportChart
                    config={EMAIL_REPORT_CHART_CONFIG}
                    series={EMAIL_REPORT_SERIES}
                    data={emailData}
                    period={period}
                />
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <ReportTable
                    config={EMAIL_REPORT_CHART_CONFIG}
                    series={EMAIL_REPORT_SERIES}
                    data={emailData}
                    period={period}
                />
            ),
        },
    ]

    const VIEW_TABS_SMS: GraphCardTab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ReportChart
                    config={SMS_REPORT_CHART_CONFIG}
                    series={SMS_REPORT_SERIES}
                    data={smsData}
                    period={period}
                />
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <ReportTable
                    config={SMS_REPORT_CHART_CONFIG}
                    series={SMS_REPORT_SERIES}
                    data={smsData}
                    period={period}
                />
            ),
        },
    ]

    const VIEW_TABS_PUSH: GraphCardTab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ReportChart
                    config={PUSH_REPORT_CHART_CONFIG}
                    series={PUSH_REPORT_SERIES}
                    data={pushData}
                    period={period}
                />
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <ReportTable
                    config={PUSH_REPORT_CHART_CONFIG}
                    series={PUSH_REPORT_SERIES}
                    data={pushData}
                    period={period}
                />
            ),
        },
    ]

    return (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4">
            <ReportHeaderCard
                title="Global analytics"
                description="Přehled metrik e-mailu, SMS a push notifikací."
            />

            <DataVisulaizationCard
                queryKey="view-email"
                title="E-mail"
                description="Přehled ve zvoleném období."
                tabs={VIEW_TABS_EMAIL}
            />
            <DataVisulaizationCard
                queryKey="view-sms"
                title="SMS"
                description="Přehled ve zvoleném období."
                tabs={VIEW_TABS_SMS}
            />
            <DataVisulaizationCard
                queryKey="view-push"
                title="Push notifikace"
                description="Přehled ve zvoleném období."
                tabs={VIEW_TABS_PUSH}
            />
        </div>
    )
}
