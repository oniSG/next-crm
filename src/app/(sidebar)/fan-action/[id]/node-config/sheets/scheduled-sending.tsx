'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { WorkflowDrawerContentProps } from '../../shared/types'

import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function ScheduledSendingContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [date, setDate] = React.useState(() =>
        stringConfig(data.config, 'date'),
    )
    const [time, setTime] = React.useState(() =>
        stringConfig(data.config, 'time'),
    )

    React.useEffect(() => {
        setDate(stringConfig(data.config, 'date'))
        setTime(stringConfig(data.config, 'time'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ date, time }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>Datum a čas odeslání</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        id="scheduled-sending-date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <Input
                        id="scheduled-sending-time"
                        type="time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
