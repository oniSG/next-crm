'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from 'recharts'

import { TabbedCard, type Tab } from '@/components/custom/tabbed-card'
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
    BEST_SEND_DAY_BY_WEEKDAY,
    BEST_SEND_DAY_CHART_CONFIG,
    BEST_SEND_DAY_SERIES,
    BEST_SEND_TIME_BY_SLOT,
    BEST_SEND_TIME_CHART_CONFIG,
    BEST_SEND_TIME_SERIES,
    EMAIL_METRICS_PIE,
    EMAIL_METRICS_PIE_CONFIG,
    EMAIL_METRICS_STAGES,
} from './data'

export function ReportExpert() {
    const VIEW_TABS_BEST_SEND_TIME: Tab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ChartContainer
                    config={BEST_SEND_TIME_CHART_CONFIG}
                    className="max-h-75 w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={BEST_SEND_TIME_BY_SLOT}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={48}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={32}
                            domain={[0, 28]}
                            ticks={[0, 7, 14, 21, 28]}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {BEST_SEND_TIME_SERIES.map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={`var(--color-${key})`}
                                fill={`var(--color-${key})`}
                                fillOpacity={0.35}
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Čas</TableHead>
                            {BEST_SEND_TIME_SERIES.map((key) => (
                                <TableHead key={key} className="text-right">
                                    {BEST_SEND_TIME_CHART_CONFIG[key].label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {BEST_SEND_TIME_BY_SLOT.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell className="font-medium">
                                    {row.label}
                                </TableCell>
                                {BEST_SEND_TIME_SERIES.map((key) => (
                                    <TableCell key={key} className="text-right">
                                        {Number(row[key]).toLocaleString('cs-CZ')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ),
        },
    ]

    const VIEW_TABS_BEST_SEND_DAY: Tab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ChartContainer
                    config={BEST_SEND_DAY_CHART_CONFIG}
                    className="max-h-75 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={BEST_SEND_DAY_BY_WEEKDAY}
                        margin={{ left: 12, right: 12, top: 24 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={32}
                            domain={[0, 28]}
                            ticks={[0, 7, 14, 21, 28]}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        {BEST_SEND_DAY_SERIES.map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={`var(--color-${key})`}
                                radius={[4, 4, 0, 0]}
                            >
                                <LabelList
                                    dataKey={key}
                                    position="top"
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        ))}
                    </BarChart>
                </ChartContainer>
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Den</TableHead>
                            {BEST_SEND_DAY_SERIES.map((key) => (
                                <TableHead key={key} className="text-right">
                                    {BEST_SEND_DAY_CHART_CONFIG[key].label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {BEST_SEND_DAY_BY_WEEKDAY.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell className="font-medium">
                                    {row.label}
                                </TableCell>
                                {BEST_SEND_DAY_SERIES.map((key) => (
                                    <TableCell key={key} className="text-right">
                                        {Number(row[key]).toLocaleString('cs-CZ')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ),
        },
    ]

    const VIEW_TABS_EMAIL_METRICS: Tab[] = [
        {
            name: 'Graf',
            value: 'chart',
            icon: <ChartColumnIcon />,
            content: (
                <ChartContainer
                    config={EMAIL_METRICS_PIE_CONFIG}
                    className="mx-auto aspect-square max-h-75"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel nameKey="name" />
                            }
                        />
                        <Pie
                            data={EMAIL_METRICS_PIE}
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
            ),
        },
        {
            name: 'Tabulka',
            value: 'table',
            icon: <TableIcon />,
            content: (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Metrika</TableHead>
                            <TableHead className="text-right">Počet</TableHead>
                            <TableHead className="text-right">Podíl</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {EMAIL_METRICS_STAGES.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell className="font-medium">
                                    {row.label}
                                </TableCell>
                                <TableCell className="text-right">
                                    {row.pocet.toLocaleString('cs-CZ')}
                                </TableCell>
                                <TableCell className="text-right">
                                    {row.percent.toLocaleString('cs-CZ', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                    %
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ),
        },
    ]

    return (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4">
            <TabbedCard
                queryKey="view-best-send-time"
                title="Nejlepší čas na odesílání e-mailů"
                description="Průměr unikátně otevřených za 90 dní."
                tabs={VIEW_TABS_BEST_SEND_TIME}
            />
            <TabbedCard
                queryKey="view-best-send-day"
                title="Nejlepší den na odesílání e-mailů"
                description="Průměr unikátně otevřených za 90 dní."
                tabs={VIEW_TABS_BEST_SEND_DAY}
            />
            <TabbedCard
                queryKey="view-email-metrics"
                title="E-mailové metriky"
                description="Doručení, otevření, prokliky a odhlášení."
                tabs={VIEW_TABS_EMAIL_METRICS}
            />
        </div>
    )
}
