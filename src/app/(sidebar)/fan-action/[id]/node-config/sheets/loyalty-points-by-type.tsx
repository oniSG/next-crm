'use client'

import * as React from 'react'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { LOYALTY_CREDIT_TYPES } from '../shared/constants'
import { FieldLabel, FieldSelect } from '../shared/form-components'
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
                <FieldLabel required>Typ přičtení</FieldLabel>
                <FieldSelect
                    value={creditType}
                    onValueChange={setCreditType}
                    options={LOYALTY_CREDIT_TYPES}
                    placeholder="Vyberte typ přičtení"
                />
            </div>
        </div>
    )
}
