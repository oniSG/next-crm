'use client'

import * as React from 'react'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel, FieldSelect } from '../shared/form-ui'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

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
                <FieldLabel>Seznamy událostí</FieldLabel>
                <FieldSelect
                    value={eventList}
                    onValueChange={setEventList}
                    options={FAN_ACTION_OPTIONS.allEventLists}
                    placeholder="Vyberte seznam událostí"
                />
            </div>
        </div>
    )
}
