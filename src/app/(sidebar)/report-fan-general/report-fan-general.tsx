'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

import { GLOBAL_REPORT_BY_MONTH, GLOBAL_REPORT_CHART_CONFIG } from './data'

const SERIES = [
    'doruceno',
    'unikatniOtevreni',
    'unikatniProklik',
    'nedoruceno',
    'odhlaseno',
    'hardBounce',
    'softBounce',
    'spam',
] as const

export function ReportFanGeneral() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <TabbedCard
                    title="Globální report"
                    description="Přehled všech metrik po měsících."
                    tabs={[
                        { name: 'Graf', icon: <ChartColumnIcon /> },
                        { name: 'Tabulka', icon: <TableIcon /> },
                    ]}
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
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {SERIES.map((key, i) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`var(--color-${key})`}
                                    stackId="a"
                                    radius={
                                        i === 0
                                            ? [0, 0, 4, 4]
                                            : i === SERIES.length - 1
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
                                {SERIES.map((key) => (
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
                                    {SERIES.map((key) => (
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
