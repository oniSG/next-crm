'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { WorkflowDrawerContentProps } from '../../shared/types'

import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

function pointsCountConfig(
    config: Record<string, unknown> | undefined,
): string {
    const value = config?.pointsCount
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
    if (typeof value === 'string') return value
    return ''
}

export function LoyaltyPointsReachedContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [dateFrom, setDateFrom] = React.useState(() =>
        stringConfig(data.config, 'dateFrom'),
    )
    const [dateTo, setDateTo] = React.useState(() =>
        stringConfig(data.config, 'dateTo'),
    )
    const [pointsCount, setPointsCount] = React.useState(() =>
        pointsCountConfig(data.config),
    )

    React.useEffect(() => {
        setDateFrom(stringConfig(data.config, 'dateFrom'))
        setDateTo(stringConfig(data.config, 'dateTo'))
        setPointsCount(pointsCountConfig(data.config))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            dateFrom,
            dateTo,
            pointsCount: pointsCount === '' ? '' : Number(pointsCount),
        }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>
                    Kdy byl dosažen počet věrnostních bodů
                </Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        id="loyalty-points-reached-from"
                        type="date"
                        value={dateFrom}
                        onChange={(event) => setDateFrom(event.target.value)}
                    />
                    <Input
                        id="loyalty-points-reached-to"
                        type="date"
                        value={dateTo}
                        onChange={(event) => setDateTo(event.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="loyalty-points-reached-count">
                    Počet věrnostních bodů
                </Label>
                <Input
                    id="loyalty-points-reached-count"
                    type="number"
                    min={1}
                    className="bg-background"
                    value={pointsCount}
                    onChange={(event) => setPointsCount(event.target.value)}
                />
            </div>
        </div>
    )
}
