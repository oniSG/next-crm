'use client'

import { ChartColumnIcon, TableIcon } from 'lucide-react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from 'recharts'

import { TabbedCard } from '@/components/custom/tabbed-card'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export type ReportSectionRow = {
    period: string
    label: string
    [key: string]: string | number
}

type Column = {
    key: string
    label: string
    format?: 'number' | 'currency' | 'signed'
    emphasize?: boolean
}

type Series = {
    key: string
    label: string
    color: string
}

const VIEW_TABS = [
    { name: 'Chart', icon: <ChartColumnIcon /> },
    { name: 'Table', icon: <TableIcon /> },
]

const numberFormatter = new Intl.NumberFormat('cs-CZ')
const currencyFormatter = new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
})

function formatValue(value: number, format: Column['format']) {
    if (format === 'currency') return currencyFormatter.format(value)
    const formatted = numberFormatter.format(value)
    if (format === 'signed' && value >= 0) return `+${formatted}`
    return formatted
}

function ChartTableSection({
    title,
    description,
    rows,
    columns,
    series,
    periodKey,
    chartType = 'bar',
    stacked = false,
    showTotals = true,
    emptyMessage,
}: {
    title: string
    description: string
    rows: ReportSectionRow[]
    columns: Column[]
    series: Series[]
    periodKey: string
    chartType?: 'bar' | 'line'
    stacked?: boolean
    showTotals?: boolean
    emptyMessage: string
}) {
    const config = Object.fromEntries(
        series.map((item) => [item.key, { label: item.label, color: item.color }]),
    ) satisfies ChartConfig
    const totals = columns.reduce<Record<string, number>>((result, column) => {
        result[column.key] = rows.reduce(
            (sum, row) => sum + Number(row[column.key] ?? 0),
            0,
        )
        return result
    }, {})

    const axes = (
        <>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={64}
                tickFormatter={(value) => numberFormatter.format(Number(value))}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {series.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
        </>
    )

    return (
        <TabbedCard title={title} description={description} tabs={VIEW_TABS}>
            {rows.length > 0 ? (
                <ChartContainer
                    key={`${title}-chart-${periodKey}`}
                    config={config}
                    className="max-h-80 w-full"
                >
                    {chartType === 'line' ? (
                        <LineChart
                            accessibilityLayer
                            data={rows}
                            margin={{ left: 12, right: 12 }}
                        >
                            {axes}
                            {series.map((item) => (
                                <Line
                                    key={item.key}
                                    type="monotone"
                                    dataKey={item.key}
                                    stroke={`var(--color-${item.key})`}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    ) : (
                        <BarChart
                            accessibilityLayer
                            data={rows}
                            margin={{ left: 12, right: 12 }}
                        >
                            {axes}
                            {series.map((item, index) => (
                                <Bar
                                    key={item.key}
                                    dataKey={item.key}
                                    fill={`var(--color-${item.key})`}
                                    stackId={stacked ? 'value' : undefined}
                                    radius={
                                        !stacked
                                            ? [4, 4, 4, 4]
                                            : index === 0
                                              ? [0, 0, 4, 4]
                                              : index === series.length - 1
                                                ? [4, 4, 0, 0]
                                                : [0, 0, 0, 0]
                                    }
                                />
                            ))}
                        </BarChart>
                    )}
                </ChartContainer>
            ) : (
                <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                    {emptyMessage}
                </div>
            )}

            <div key={`${title}-table-${periodKey}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            {columns.map((column) => (
                                <TableHead key={column.key} className="text-right">
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell className="font-medium">
                                        {row.label}
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            className={
                                                column.emphasize
                                                    ? 'text-right font-medium tabular-nums'
                                                    : 'text-right tabular-nums'
                                            }
                                        >
                                            {formatValue(
                                                Number(row[column.key] ?? 0),
                                                column.format,
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="text-muted-foreground h-24 text-center"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {showTotals && rows.length > 0 && (
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className="text-right tabular-nums"
                                    >
                                        {formatValue(totals[column.key], column.format)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </div>
        </TabbedCard>
    )
}

const channelSeries: Series[] = [
    { key: 'online', label: 'Online', color: 'var(--chart-1)' },
    { key: 'boxOffice', label: 'Box office', color: 'var(--chart-2)' },
    {
        key: 'administration',
        label: 'Administration',
        color: 'var(--chart-3)',
    },
    { key: 'mobileApp', label: 'Mobile app', color: 'var(--chart-4)' },
    { key: 'partner', label: 'Partner', color: 'oklch(0.65 0.2 35)' },
]

const channelColumns = (format: Column['format']): Column[] => [
    { key: 'online', label: 'Online', format },
    { key: 'boxOffice', label: 'Box office', format },
    { key: 'administration', label: 'Administration', format },
    { key: 'mobileApp', label: 'Mobile app', format },
    { key: 'partner', label: 'Partner', format },
    { key: 'total', label: 'Total', format, emphasize: true },
]

export function TicketRevenueSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Development of revenue from tickets sold"
            description="Revenue by sales channel in the selected period."
            columns={channelColumns('currency')}
            series={channelSeries}
            stacked
            emptyMessage="No ticket sales data for the selected period."
        />
    )
}

export function TicketCountSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Number of tickets sold"
            description="Ticket volume by sales channel in the selected period."
            columns={channelColumns('number')}
            series={channelSeries}
            stacked
            emptyMessage="No ticket sales data for the selected period."
        />
    )
}

export function VisitorTotalSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Development of the total number of visitors"
            description="Total number of visitors at the end of each month in the selected period."
            columns={[
                {
                    key: 'total',
                    label: 'Total visitors',
                    format: 'number',
                    emphasize: true,
                },
            ]}
            series={[
                {
                    key: 'total',
                    label: 'Visitors',
                    color: 'var(--chart-2)',
                },
            ]}
            chartType="line"
            showTotals={false}
            emptyMessage="No visitor data for the selected period."
        />
    )
}

export function VisitorGrowthSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Growth in the number of visitors"
            description="New and removed visitors in the selected period."
            columns={[
                { key: 'added', label: 'Added', format: 'number' },
                { key: 'removed', label: 'Removed', format: 'number' },
                {
                    key: 'netChange',
                    label: 'Net growth',
                    format: 'signed',
                    emphasize: true,
                },
            ]}
            series={[
                {
                    key: 'netChange',
                    label: 'Net growth',
                    color: 'var(--chart-1)',
                },
            ]}
            emptyMessage="No visitor growth data for the selected period."
        />
    )
}

function DeliveredSection({
    channel,
    color,
    ...props
}: {
    channel: 'e-mails' | 'push notifications' | 'SMS'
    color: string
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title={`Statistics of delivered ${channel}`}
            description={`Delivered ${channel} in the selected period.`}
            columns={[
                {
                    key: 'delivered',
                    label: 'Delivered',
                    format: 'number',
                    emphasize: true,
                },
            ]}
            series={[{ key: 'delivered', label: 'Delivered', color }]}
            emptyMessage={`No ${channel} data for the selected period.`}
        />
    )
}

export function DeliveredEmailSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return <DeliveredSection {...props} channel="e-mails" color="var(--chart-1)" />
}

export function DeliveredPushSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return (
        <DeliveredSection
            {...props}
            channel="push notifications"
            color="var(--chart-2)"
        />
    )
}

export function DeliveredSmsSection(
    props: Omit<Parameters<typeof DeliveredSection>[0], 'channel' | 'color'>,
) {
    return <DeliveredSection {...props} channel="SMS" color="var(--chart-3)" />
}

export function WonBusinessCasesSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Total volume of business cases won in Kč"
            description="Value of won business cases in the selected period."
            columns={[
                { key: 'count', label: 'Won cases', format: 'number' },
                {
                    key: 'value',
                    label: 'Total volume',
                    format: 'currency',
                    emphasize: true,
                },
            ]}
            series={[
                {
                    key: 'value',
                    label: 'Won business cases',
                    color: 'var(--chart-1)',
                },
            ]}
            emptyMessage="No won business case data for the selected period."
        />
    )
}

export function BusinessCaseStatusSection(props: {
    rows: ReportSectionRow[]
    periodKey: string
}) {
    return (
        <ChartTableSection
            {...props}
            title="Number of business cases created by status"
            description="Created business cases grouped by status in the selected period."
            columns={[
                { key: 'won', label: 'Won', format: 'number' },
                { key: 'open', label: 'Open', format: 'number' },
                { key: 'cancelled', label: 'Cancelled', format: 'number' },
                {
                    key: 'total',
                    label: 'Total',
                    format: 'number',
                    emphasize: true,
                },
            ]}
            series={[
                { key: 'won', label: 'Won', color: 'var(--chart-1)' },
                { key: 'open', label: 'Open', color: 'var(--chart-2)' },
                {
                    key: 'cancelled',
                    label: 'Cancelled',
                    color: 'var(--chart-3)',
                },
            ]}
            emptyMessage="No business case data for the selected period."
        />
    )
}

const advertisingSpacesConfig = {
    occupied: { label: 'Taken', color: 'var(--chart-1)' },
    free: { label: 'Available', color: 'var(--muted)' },
} satisfies ChartConfig

export function AdvertisingSpacesSection({
    occupied,
    free,
    dateLabel,
    periodKey,
}: {
    occupied?: number
    free?: number
    dateLabel: string
    periodKey: string
}) {
    const hasData = occupied !== undefined && free !== undefined
    const data = hasData
        ? [
              {
                  status: 'occupied',
                  value: occupied,
                  fill: 'var(--color-occupied)',
              },
              {
                  status: 'free',
                  value: free,
                  fill: 'var(--color-free)',
              },
          ]
        : []

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ratio of available and taken advertising spaces</CardTitle>
                <CardDescription>Current state as of {dateLabel}.</CardDescription>
            </CardHeader>
            <CardContent>
                {hasData ? (
                    <ChartContainer
                        key={`advertising-spaces-${periodKey}`}
                        config={advertisingSpacesConfig}
                        className="mx-auto aspect-square max-h-64 w-full"
                    >
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="status"
                                innerRadius={56}
                                strokeWidth={4}
                            />
                            <ChartLegend
                                content={<ChartLegendContent nameKey="status" />}
                            />
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                        No advertising space data for the selected period.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
