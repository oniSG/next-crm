'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

function membershipIdConfig(
    config: Record<string, unknown> | undefined,
): string {
    const value = config?.membershipId
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
    if (typeof value === 'string') return value
    return ''
}

export function SpecificMembershipPurchaseContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [membershipId, setMembershipId] = React.useState(() =>
        membershipIdConfig(data.config),
    )

    React.useEffect(() => {
        setMembershipId(membershipIdConfig(data.config))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            membershipId:
                membershipId === '' ? '' : Number(membershipId),
        }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel htmlFor="specific-membership-id" required>
                    ID členství
                </FieldLabel>
                <p className="text-sm text-muted-foreground">
                    Jedná se o ID členství v ticketing systému
                </p>
                <Input
                    id="specific-membership-id"
                    type="number"
                    min={1}
                    className="bg-background"
                    value={membershipId}
                    onChange={(event) => setMembershipId(event.target.value)}
                />
            </div>
        </div>
    )
}
