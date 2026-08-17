import type { ChartConfig } from '@/components/ui/chart'

export type SparseCategoryPoint = {
    label: string
} & Record<string, string | number>

function toCategoryKey(label: string) {
    return label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

export function buildCategoryConfig(rows: { label: string }[]): ChartConfig {
    return Object.fromEntries(
        rows.map((row, index) => [
            toCategoryKey(row.label),
            {
                label: row.label,
                color: `var(--chart-${(index % 16) + 1})`,
            },
        ]),
    )
}

/** One colored series per category row (sparse + stacked in BarChart). */
export function toSparseCategoryChart(
    rows: { label: string; count: number }[],
): { data: SparseCategoryPoint[]; series: string[] } {
    const series = rows.map((row) => toCategoryKey(row.label))
    const data = rows.map((row) => {
        const key = toCategoryKey(row.label)
        const point: SparseCategoryPoint = { label: row.label }
        for (const seriesKey of series) {
            point[seriesKey] = seriesKey === key ? row.count : 0
        }
        return point
    })
    return { data, series }
}
