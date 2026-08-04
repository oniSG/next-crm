'use client'

import * as React from 'react'

import { Switch } from '@/components/ui/switch'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { CUSTOM_ATTRIBUTE_FIELDS } from '../shared/constants'
import { FieldLabel, FieldSelect } from '../shared/form-components'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function CustomAttributeContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [field, setField] = React.useState(() =>
        stringConfig(data.config, 'field'),
    )
    const [logChanges, setLogChanges] = React.useState(() =>
        boolConfig(data.config, 'logChanges'),
    )
    const [oneid, setOneid] = React.useState(() =>
        boolConfig(data.config, 'oneid'),
    )
    const [neon, setNeon] = React.useState(() =>
        boolConfig(data.config, 'neon'),
    )

    React.useEffect(() => {
        setField(stringConfig(data.config, 'field'))
        setLogChanges(boolConfig(data.config, 'logChanges'))
        setOneid(boolConfig(data.config, 'oneid'))
        setNeon(boolConfig(data.config, 'neon'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ field, logChanges, oneid, neon }),
    })

    return (
        <div className="space-y-3">
            <FieldSelect
                value={field}
                onValueChange={setField}
                options={CUSTOM_ATTRIBUTE_FIELDS}
                placeholder="medicalRecords"
            />

            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="custom-attribute-log-changes">
                        Logování změn vlastního pole
                    </FieldLabel>
                    <Switch
                        id="custom-attribute-log-changes"
                        checked={logChanges}
                        onCheckedChange={setLogChanges}
                        className="shrink-0"
                    />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="custom-attribute-oneid">
                        OneID integrace
                    </FieldLabel>
                    <Switch
                        id="custom-attribute-oneid"
                        checked={oneid}
                        onCheckedChange={setOneid}
                        className="shrink-0"
                    />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="custom-attribute-neon">
                        NEON integrace
                    </FieldLabel>
                    <Switch
                        id="custom-attribute-neon"
                        checked={neon}
                        onCheckedChange={setNeon}
                        className="shrink-0"
                    />
                </div>
            </div>
        </div>
    )
}
