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
    GLOBAL_REPORT_BY_MONTH,
    GLOBAL_REPORT_CHART_CONFIG,
    GLOBAL_REPORT_SERIES,
    PUSH_REPORT_BY_MONTH,
    PUSH_REPORT_CHART_CONFIG,
    PUSH_REPORT_SERIES,
    SMS_REPORT_BY_MONTH,
    SMS_REPORT_CHART_CONFIG,
    SMS_REPORT_SERIES,
} from './data'

const VIEW_TABS = [
    { name: 'Graf', icon: <ChartColumnIcon /> },
    { name: 'Tabulka', icon: <TableIcon /> },
]

export function ReportFanGeneral() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <TabbedCard
                    title="Globální report"
                    description="Přehled všech metrik po měsících."
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={GLOBAL_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={GLOBAL_REPORT_BY_MONTH}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
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
                                <TableHead>Měsíc</TableHead>
                                {GLOBAL_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {GLOBAL_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {GLOBAL_REPORT_BY_MONTH.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">
                                        {row.month}
                                    </TableCell>
                                    {GLOBAL_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {row[key].toLocaleString('cs-CZ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabbedCard>

                <TabbedCard
                    title="SMS"
                    description="Doručeno a nedoručeno po měsících."
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={SMS_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={SMS_REPORT_BY_MONTH}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
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
                                <TableHead>Měsíc</TableHead>
                                {SMS_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {SMS_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {SMS_REPORT_BY_MONTH.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">
                                        {row.month}
                                    </TableCell>
                                    {SMS_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {row[key].toLocaleString('cs-CZ')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabbedCard>

                <TabbedCard
                    title="Push notifikace"
                    description="Doručeno a nedoručeno po měsících."
                    tabs={VIEW_TABS}
                >
                    <ChartContainer
                        config={PUSH_REPORT_CHART_CONFIG}
                        className="max-h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={PUSH_REPORT_BY_MONTH}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
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
                                <TableHead>Měsíc</TableHead>
                                {PUSH_REPORT_SERIES.map((key) => (
                                    <TableHead key={key} className="text-right">
                                        {PUSH_REPORT_CHART_CONFIG[key].label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {PUSH_REPORT_BY_MONTH.map((row) => (
                                <TableRow key={row.month}>
                                    <TableCell className="font-medium">
                                        {row.month}
                                    </TableCell>
                                    {PUSH_REPORT_SERIES.map((key) => (
                                        <TableCell key={key} className="text-right">
                                            {row[key].toLocaleString('cs-CZ')}
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
