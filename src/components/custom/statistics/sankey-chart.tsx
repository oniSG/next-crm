'use client'

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
    labelSideThreshold?: number
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

function SankeyNode({
    x,
    y,
    width,
    height,
    payload,
    labelSideThreshold = 100,
}: SankeyNodeProps & { labelSideThreshold?: number }) {
    const name = typeof payload?.name === 'string' ? payload.name : ''
    const value = typeof payload?.value === 'number' ? payload.value : null
    const fill = getNodeFill(payload)
    const isLeft = x < labelSideThreshold
    const label = value != null ? `${name} (${value.toLocaleString('cs-CZ')})` : name

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
                x={isLeft ? x - 8 : x + width + 8}
                y={y + height / 2}
                textAnchor={isLeft ? 'end' : 'start'}
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
    margin = { top: 16, right: 180, bottom: 16, left: 140 },
    className,
    labelSideThreshold = 100,
}: SankeyChartProps) {
    return (
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
                    node={(props) => (
                        <SankeyNode {...props} labelSideThreshold={labelSideThreshold} />
                    )}
                />
            </ResponsiveContainer>
        </div>
    )
}
