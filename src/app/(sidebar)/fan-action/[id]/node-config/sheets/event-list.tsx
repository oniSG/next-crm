'use client'

import * as React from 'react'

import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'
import { toSelectItems } from '../shared/constants'

export function EventListContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [eventList, setEventList] = React.useState(() =>
        stringConfig(data.config, 'eventList'),
    )

    React.useEffect(() => {
        setEventList(stringConfig(data.config, 'eventList'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ eventList }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>Seznamy událostí</Label>
                <Select
                    items={toSelectItems(FAN_ACTION_OPTIONS.allEventLists)}
                    value={eventList || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== eventList) {
                            setEventList(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte seznam událostí"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(FAN_ACTION_OPTIONS.allEventLists).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
