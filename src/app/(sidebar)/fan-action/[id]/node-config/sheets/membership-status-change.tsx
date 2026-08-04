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

export function MembershipStatusChangeContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [membershipStatus, setMembershipStatus] = React.useState(() =>
        stringConfig(data.config, 'membershipStatus'),
    )

    React.useEffect(() => {
        setMembershipStatus(stringConfig(data.config, 'membershipStatus'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ membershipStatus }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>Změna stavu členství</Label>
                <Select
                    items={toSelectItems(FAN_ACTION_OPTIONS.allMembershipStatuses)}
                    value={membershipStatus || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== membershipStatus) {
                            setMembershipStatus(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte stav členství"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(FAN_ACTION_OPTIONS.allMembershipStatuses).map((item) => (
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
