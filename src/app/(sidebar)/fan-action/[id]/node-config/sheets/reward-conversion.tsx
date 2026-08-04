'use client'

import * as React from 'react'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { REWARD_TRANSFER_TYPES, toSelectItems } from '../shared/constants'
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
                <Label>Typ převodu</Label>
                <Select
                    items={toSelectItems(REWARD_TRANSFER_TYPES)}
                    value={transferType || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== transferType) {
                            setTransferType(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte pole"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(REWARD_TRANSFER_TYPES).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="reward-conversion-webhook">
                    Odeslat webhook
                </Label>
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
