'use client'

import * as React from 'react'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel, FieldSelect } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

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
                <FieldLabel required>Změna stavu členství</FieldLabel>
                <FieldSelect
                    value={membershipStatus}
                    onValueChange={setMembershipStatus}
                    options={FAN_ACTION_OPTIONS.allMembershipStatuses}
                    placeholder="Vyberte stav členství"
                />
            </div>
        </div>
    )
}
