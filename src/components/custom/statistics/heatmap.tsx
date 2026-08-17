'use client'

import { EMPTY_CHART_MESSAGE } from './empty-chart-message'
import { cn } from '@/lib/utils'

export type HeatmapCell = {
    row: string
    column: string
    value: number
}

export type HeatmapProps = {
    data: HeatmapCell[]
    className?: string
    /** CSS color used for the heat scale. Defaults to brand chart green. */
    color?: string
    formatValue?: (value: number) => string
    emptyMessage?: string
}

function uniqueInOrder(values: string[]) {
    const seen = new Set<string>()
    const result: string[] = []
    for (const value of values) {
        if (seen.has(value)) continue
        seen.add(value)
        result.push(value)
    }
    return result
}

function getHeatBackground(
    value: number,
    min: number,
    max: number,
    color: string,
) {
    if (max <= min) {
        return `color-mix(in oklch, ${color} 12%, var(--background))`
    }
    const t = (value - min) / (max - min)
    const intensity = Math.round(8 + t * 92)
    return `color-mix(in oklch, ${color} ${intensity}%, var(--background))`
}

export function Heatmap({
    data,
    className,
    color = 'var(--chart-1)',
    formatValue = (value) => String(value),
    emptyMessage = EMPTY_CHART_MESSAGE,
}: HeatmapProps) {
    const rows = uniqueInOrder(data.map((cell) => cell.row))
    const columns = uniqueInOrder(data.map((cell) => cell.column))
    const valueByKey = new Map(
        data.map((cell) => [`${cell.row}::${cell.column}`, cell.value] as const),
    )
    const values = data.map((cell) => cell.value)
    const min = values.length > 0 ? Math.min(...values) : 0
    const max = values.length > 0 ? Math.max(...values) : 0

    if (data.length === 0 || rows.length === 0 || columns.length === 0) {
        return (
            <div
                className={cn(
                    'text-muted-foreground flex h-48 items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className={cn('flex w-full flex-col gap-3', className)}>
            <div className="w-full overflow-x-auto">
                <div
                    className="inline-grid min-w-full gap-1"
                    style={{
                        gridTemplateColumns: `max-content repeat(${columns.length}, minmax(4.5rem, 1fr))`,
                    }}
                    role="table"
                    aria-label="Heatmap"
                >
                    <div role="row" className="contents">
                        <div
                            role="columnheader"
                            className="bg-background sticky left-0 z-[1]"
                        />
                        {columns.map((column) => (
                            <div
                                key={column}
                                role="columnheader"
                                className="text-muted-foreground px-1 pb-1 text-center text-xs font-medium"
                            >
                                {column}
                            </div>
                        ))}
                    </div>

                    {rows.map((row) => (
                        <div key={row} role="row" className="contents">
                            <div
                                role="rowheader"
                                className="bg-background sticky left-0 z-[1] flex items-center pr-3 text-xs font-medium whitespace-nowrap"
                            >
                                {row}
                            </div>
                            {columns.map((column) => {
                                const value = valueByKey.get(`${row}::${column}`) ?? 0
                                return (
                                    <div
                                        key={`${row}-${column}`}
                                        role="cell"
                                        title={`${row} · ${column}: ${formatValue(value)}`}
                                        className="text-foreground flex min-h-10 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums"
                                        style={{
                                            backgroundColor: getHeatBackground(
                                                value,
                                                min,
                                                max,
                                                color,
                                            ),
                                        }}
                                    >
                                        {formatValue(value)}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 px-1">
                <span className="text-muted-foreground text-xs tabular-nums">
                    {formatValue(min)}
                </span>
                <div
                    className="h-2.5 flex-1 rounded-full"
                    style={{
                        background: `linear-gradient(to right, color-mix(in oklch, ${color} 8%, var(--background)), ${color})`,
                    }}
                    aria-hidden
                />
                <span className="text-muted-foreground text-xs tabular-nums">
                    {formatValue(max)}
                </span>
            </div>
        </div>
    )
}
