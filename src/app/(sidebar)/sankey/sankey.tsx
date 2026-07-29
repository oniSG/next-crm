'use client'

import {
    Layer,
    Rectangle,
    ResponsiveContainer,
    Sankey,
    Tooltip,
    type SankeyLinkProps,
    type SankeyNodeProps,
} from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { SANKEY_DATA } from './data'

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

function SankeyNode({ x, y, width, height, payload }: SankeyNodeProps) {
    const name = typeof payload?.name === 'string' ? payload.name : ''
    const value = typeof payload?.value === 'number' ? payload.value : null
    const fill = getNodeFill(payload)
    const isLeft = x < 100
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

export function SankeyPage() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-3">
            <section className="grid grid-cols-1 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Sankey</CardTitle>
                        <CardDescription>
                            Tok kampaně od odeslání po konverzi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-140 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <Sankey
                                    data={SANKEY_DATA}
                                    nodeWidth={16}
                                    nodePadding={56}
                                    sort={false}
                                    align="left"
                                    verticalAlign="top"
                                    iterations={64}
                                    margin={{
                                        top: 16,
                                        right: 180,
                                        bottom: 16,
                                        left: 140,
                                    }}
                                    link={SankeyLink}
                                    node={SankeyNode}
                                ></Sankey>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
