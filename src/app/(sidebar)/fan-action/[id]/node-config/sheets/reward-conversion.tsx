'use client'

import * as React from 'react'

import { Switch } from '@/components/ui/switch'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { REWARD_TRANSFER_TYPES } from '../shared/constants'
import { FieldLabel, FieldSelect } from '../shared/form-components'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function RewardConversionContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [transferType, setTransferType] = React.useState(() =>
        stringConfig(data.config, 'transferType'),
    )
    const [sendWebhook, setSendWebhook] = React.useState(() =>
        boolConfig(data.config, 'sendWebhook'),
    )

    React.useEffect(() => {
        setTransferType(stringConfig(data.config, 'transferType'))
        setSendWebhook(boolConfig(data.config, 'sendWebhook'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ transferType, sendWebhook }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel>Typ převodu</FieldLabel>
                <FieldSelect
                    value={transferType}
                    onValueChange={setTransferType}
                    options={REWARD_TRANSFER_TYPES}
                    placeholder="Vyberte pole"
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="reward-conversion-webhook">
                    Odeslat webhook
                </FieldLabel>
                <Switch
                    id="reward-conversion-webhook"
                    checked={sendWebhook}
                    onCheckedChange={setSendWebhook}
                    className="shrink-0"
                />
            </div>
        </div>
    )
}
