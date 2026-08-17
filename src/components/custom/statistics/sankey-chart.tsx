'use client'

import { EMPTY_CHART_MESSAGE } from './empty-chart-message'
import { createContext, useContext } from 'react'
import {
    Layer,
    Rectangle,
    ResponsiveContainer,
    Sankey,
    type SankeyLinkProps,
    type SankeyNodeProps,
} from 'recharts'

import { cn } from '@/lib/utils'

export type SankeyNodeData = {
    name: string
    fill?: string
}

export type SankeyLinkData = {
    source: number
    target: number
    value: number
}

export type SankeyChartData = {
    nodes: SankeyNodeData[]
    links: SankeyLinkData[]
}

export type SankeyChartProps = {
    data: SankeyChartData
    nodeWidth?: number
    nodePadding?: number
    iterations?: number
    sort?: boolean
    align?: 'left' | 'justify'
    verticalAlign?: 'justify' | 'top'
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    className?: string
    emptyMessage?: string
}

const NodeValuesContext = createContext<number[]>([])

function getNodeValues(data: SankeyChartData): number[] {
    const outgoing = data.nodes.map(() => 0)
    const incoming = data.nodes.map(() => 0)

    for (const link of data.links) {
        outgoing[link.source] += link.value
        incoming[link.target] += link.value
    }

    return data.nodes.map((_, index) =>
        Math.max(outgoing[index], incoming[index]),
    )
}

function getNodeFill(node: unknown): string {
    if (
        node &&
        typeof node === 'object' &&
        'fill' in node &&
        typeof node.fill === 'string'
    ) {
        return node.fill
    }
    return 'var(--chart-1)'
}

function SankeyNode({ x, y, width, height, payload, index }: SankeyNodeProps) {
    const nodeValues = useContext(NodeValuesContext)
    const name = typeof payload?.name === 'string' ? payload.name : ''
    const value =
        typeof payload?.value === 'number'
            ? payload.value
            : (nodeValues[index] ?? null)
    const fill = getNodeFill(payload)
    const label =
        value != null ? `${name} (${value.toLocaleString('cs-CZ')})` : name

    return (
        <Layer>
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
                fillOpacity={0.95}
                radius={2}
            />
            <text
                x={x + width + 8}
                y={y + height / 2}
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={12}
                fill={fill}
                paintOrder="stroke"
                style={{ pointerEvents: 'none' }}
            >
                {label}
            </text>
        </Layer>
    )
}

function SankeyLink({
    sourceX,
    targetX,
    sourceY,
    targetY,
    sourceControlX,
    targetControlX,
    linkWidth,
    payload,
}: SankeyLinkProps) {
    const targetFill = getNodeFill(payload?.target)

    return (
        <path
            d={`
                M${sourceX},${sourceY}
                C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
            `}
            fill="none"
            stroke={targetFill}
            strokeWidth={linkWidth}
            strokeOpacity={0.1}
        />
    )
}

export function SankeyChart({
    data,
    nodeWidth = 16,
    nodePadding = 56,
    iterations = 64,
    sort = false,
    align = 'left',
    verticalAlign = 'top',
    margin = { top: 16, right: 180, bottom: 16, left: 16 },
    className,
    emptyMessage = EMPTY_CHART_MESSAGE,
}: SankeyChartProps) {
    if (data.nodes.length === 0 || data.links.length === 0) {
        return (
            <div
                className={cn(
                    'text-muted-foreground flex h-140 w-full items-center justify-center px-4 text-center text-sm',
                    className,
                )}
            >
                {emptyMessage}
            </div>
        )
    }

    const nodeValues = getNodeValues(data)

    return (
        <NodeValuesContext.Provider value={nodeValues}>
            <div className={cn('h-140 w-full', className)}>
                <ResponsiveContainer width="100%" height="100%">
                    <Sankey
                        data={data}
                        nodeWidth={nodeWidth}
                        nodePadding={nodePadding}
                        sort={sort}
                        align={align}
                        verticalAlign={verticalAlign}
                        iterations={iterations}
                        margin={margin}
                        link={SankeyLink}
                        node={SankeyNode}
                    />
                </ResponsiveContainer>
            </div>
        </NodeValuesContext.Provider>
    )
}
