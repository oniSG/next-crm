'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { TabbedCard } from '@/components/custom/tabbed-card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    GLOBAL_REPORT_CHART_CONFIG,
    GLOBAL_REPORT_SERIES,
    PUSH_REPORT_CHART_CONFIG,
    PUSH_REPORT_SERIES,
    SMS_REPORT_CHART_CONFIG,
    SMS_REPORT_SERIES,
} from './data'
import { aggregateByPeriod, filterByDateRange, usePeriod } from './report-utils'
import {
    GLOBAL_REPORT_BY_DAY,
    PUSH_REPORT_BY_DAY,
    SMS_REPORT_BY_DAY,
} from './temp/mock-daily-data'

const VIEW_TABS = [
    { name: 'Graf', icon: <ChartColumnIcon /> },
    { name: 'Tabulka', icon: <TableIcon /> },
]

const PERIOD_DESCRIPTION = {
    day: 'Přehled po dnech ve zvoleném období.',
    month: 'Přehled po měsících ve zvoleném období.',
    year: 'Přehled po rocích ve zvoleném období.',
} as const

export function ReportFanGeneral() {
    const { period, dateRange } = usePeriod()

    const globalData = aggregateByPeriod(
        filterByDateRange(GLOBAL_REPORT_BY_DAY, dateRange),
        GLOBAL_REPORT_SERIES,
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

    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <TabbedCard
                    title="Globální report"
                    description={PERIOD_DESCRIPTION[period]}
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={GLOBAL_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={globalData}
                            margin={{ left: 12, right: 12 }}
                        >
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
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString('cs-CZ')
                                }
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {GLOBAL_REPORT_SERIES.map((key, i) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`var(--color-${key})`}
                                    stackId="a"
                                    radius={
                                        i === 0
                                            ? [0, 0, 4, 4]
                                            : i === GLOBAL_REPORT_SERIES.length - 1
                                              ? [4, 4, 0, 0]
                                              : [0, 0, 0, 0]
                                    }
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    {period === 'day'
                                        ? 'Den'
                                        : period === 'month'
                                          ? 'Měsíc'
                                          : 'Rok'}
                                </TableHead>
                                {GLOBAL_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {GLOBAL_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {globalData.map((row) => (
                                <TableRow key={String(row.label)}>
                                    <TableCell className="font-medium">
                                        {row.label}
                                    </TableCell>
                                    {GLOBAL_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {Number(row[key]).toLocaleString('cs-CZ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabbedCard>

                <TabbedCard
                    title="SMS"
                    description={PERIOD_DESCRIPTION[period]}
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={SMS_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={smsData}
                            margin={{ left: 12, right: 12 }}
                        >
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
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString('cs-CZ')
                                }
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {SMS_REPORT_SERIES.map((key, i) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`var(--color-${key})`}
                                    stackId="a"
                                    radius={
                                        i === 0
                                            ? [0, 0, 4, 4]
                                            : i === SMS_REPORT_SERIES.length - 1
                                              ? [4, 4, 0, 0]
                                              : [0, 0, 0, 0]
                                    }
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    {period === 'day'
                                        ? 'Den'
                                        : period === 'month'
                                          ? 'Měsíc'
                                          : 'Rok'}
                                </TableHead>
                                {SMS_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {SMS_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {smsData.map((row) => (
                                <TableRow key={String(row.label)}>
                                    <TableCell className="font-medium">
                                        {row.label}
                                    </TableCell>
                                    {SMS_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {Number(row[key]).toLocaleString('cs-CZ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabbedCard>

                <TabbedCard
                    title="Push notifikace"
                    description={PERIOD_DESCRIPTION[period]}
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={PUSH_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={pushData}
                            margin={{ left: 12, right: 12 }}
                        >
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
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString('cs-CZ')
                                }
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {PUSH_REPORT_SERIES.map((key, i) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`var(--color-${key})`}
                                    stackId="a"
                                    radius={
                                        i === 0
                                            ? [0, 0, 4, 4]
                                            : i === PUSH_REPORT_SERIES.length - 1
                                              ? [4, 4, 0, 0]
                                              : [0, 0, 0, 0]
                                    }
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    {period === 'day'
                                        ? 'Den'
                                        : period === 'month'
                                          ? 'Měsíc'
                                          : 'Rok'}
                                </TableHead>
                                {PUSH_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {PUSH_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pushData.map((row) => (
                                <TableRow key={String(row.label)}>
                                    <TableCell className="font-medium">
                                        {row.label}
                                    </TableCell>
                                    {PUSH_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {Number(row[key]).toLocaleString('cs-CZ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabbedCard>
            </section>
        </div>
    )
}
