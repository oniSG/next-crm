'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { WAIT_INTERVAL_UNITS } from '../shared/constants'
import { FieldError, FieldLabel, FieldSelect } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

function numberConfig(
    config: Record<string, unknown> | undefined,
    key: string,
): string {
    const value = config?.[key]
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
    if (typeof value === 'string') return value
    return ''
}

export function WaitContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [intervalUnit, setIntervalUnit] = React.useState(() =>
        stringConfig(data.config, 'intervalUnit', 'minutes'),
    )
    const [intervalValue, setIntervalValue] = React.useState(() =>
        numberConfig(data.config, 'intervalValue'),
    )

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setIntervalUnit(stringConfig(data.config, 'intervalUnit', 'minutes'))
        setIntervalValue(numberConfig(data.config, 'intervalValue'))
    }, [nodeId])

    const { errors } = useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            note,
            intervalUnit,
            intervalValue: intervalValue === '' ? '' : Number(intervalValue),
        }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel htmlFor="wait-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="wait-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel required>Doba intervalu</FieldLabel>
                <FieldSelect
                    value={intervalUnit}
                    onValueChange={setIntervalUnit}
                    options={WAIT_INTERVAL_UNITS}
                />
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="wait-interval-value" required>
                    Hodnota intervalu
                </FieldLabel>
                <Input
                    id="wait-interval-value"
                    type="number"
                    min={1}
                    value={intervalValue}
                    onChange={(event) => setIntervalValue(event.target.value)}
                    placeholder="Hodnota"
                />
                <FieldError message={errors.intervalValue} />
            </div>
        </div>
    )
}
