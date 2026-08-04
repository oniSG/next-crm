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

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { LOYALTY_CREDIT_TYPES, toSelectItems } from '../shared/constants'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function LoyaltyPointsByTypeContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [creditType, setCreditType] = React.useState(() =>
        stringConfig(data.config, 'creditType'),
    )

    React.useEffect(() => {
        setCreditType(stringConfig(data.config, 'creditType'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ creditType }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>Typ přičtení</Label>
                <Select
                    items={toSelectItems(LOYALTY_CREDIT_TYPES)}
                    value={creditType || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== creditType) {
                            setCreditType(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte typ přičtení"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(LOYALTY_CREDIT_TYPES).map((item) => (
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
