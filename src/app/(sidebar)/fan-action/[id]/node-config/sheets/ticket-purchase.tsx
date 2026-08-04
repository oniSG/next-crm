'use client'

import * as React from 'react'

import { Switch } from '@/components/ui/switch'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel, FieldLabelWithInfo, FieldSelect } from '../shared/form-ui'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function TicketPurchaseContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [eventList, setEventList] = React.useState(() =>
        stringConfig(data.config, 'eventList'),
    )
    const [reseatedOnly, setReseatedOnly] = React.useState(() =>
        boolConfig(data.config, 'reseatedOnly', true),
    )

    React.useEffect(() => {
        setEventList(stringConfig(data.config, 'eventList'))
        setReseatedOnly(boolConfig(data.config, 'reseatedOnly', true))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ eventList, reseatedOnly }),
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

            <div className="flex items-center justify-between gap-2">
                <FieldLabelWithInfo
                    label="Pouze nákupy přesazené vstupenky"
                    description="Spustí se, když návštěvník zaplatí objednávku přesazené vstupenky."
                    htmlFor="ticket-purchase-reseated-only"
                />
                <Switch
                    id="ticket-purchase-reseated-only"
                    checked={reseatedOnly}
                    onCheckedChange={setReseatedOnly}
                    className="shrink-0"
                />
            </div>
        </div>
    )
}
