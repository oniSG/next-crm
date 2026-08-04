'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
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
import { WAIT_INTERVAL_UNITS, toSelectItems } from '../shared/constants'
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
                <Label htmlFor="wait-note">
                    Poznámka pod názvem v diagramu
                </Label>
                <Input
                    id="wait-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <Label>Doba intervalu</Label>
                <Select
                    items={toSelectItems(WAIT_INTERVAL_UNITS)}
                    value={intervalUnit || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== intervalUnit) {
                            setIntervalUnit(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(WAIT_INTERVAL_UNITS).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="wait-interval-value">
                    Hodnota intervalu
                </Label>
                <Input
                    id="wait-interval-value"
                    type="number"
                    min={1}
                    value={intervalValue}
                    onChange={(event) => setIntervalValue(event.target.value)}
                    placeholder="Hodnota"
                />
                {errors.intervalValue ? (
                    <p className="text-destructive text-sm">{errors.intervalValue}</p>
                ) : null}
            </div>
        </div>
    )
}
