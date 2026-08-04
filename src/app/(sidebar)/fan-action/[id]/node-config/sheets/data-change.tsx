'use client'

import * as React from 'react'
import { ArrowRightIcon, CircleAlertIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { DATA_CHANGE_FIELDS } from '../shared/constants'
import { FieldLabel, FieldLabelWithInfo, FieldSelect } from '../shared/form-components'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function DataChangeContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [field, setField] = React.useState(() =>
        stringConfig(data.config, 'field'),
    )
    const [trackSpecificChanges, setTrackSpecificChanges] = React.useState(
        () => boolConfig(data.config, 'trackSpecificChanges', true),
    )
    const [fromValue, setFromValue] = React.useState(() =>
        stringConfig(data.config, 'fromValue'),
    )
    const [toValue, setToValue] = React.useState(() =>
        stringConfig(data.config, 'toValue'),
    )
    const [toValueTouched, setToValueTouched] = React.useState(false)

    React.useEffect(() => {
        setField(stringConfig(data.config, 'field'))
        setTrackSpecificChanges(
            boolConfig(data.config, 'trackSpecificChanges', true),
        )
        setFromValue(stringConfig(data.config, 'fromValue'))
        setToValue(stringConfig(data.config, 'toValue'))
        setToValueTouched(false)
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            field,
            trackSpecificChanges,
            fromValue,
            toValue,
        }),
    })

    const toValueInvalid =
        trackSpecificChanges &&
        toValueTouched &&
        toValue.trim().length === 0

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel required>Vyberte pole</FieldLabel>
                <FieldSelect
                    value={field}
                    onValueChange={setField}
                    options={DATA_CHANGE_FIELDS}
                    placeholder="Vyberte pole"
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="data-change-track-specific">
                    Sledovat konkrétní změny
                </FieldLabel>
                <Switch
                    id="data-change-track-specific"
                    checked={trackSpecificChanges}
                    onCheckedChange={setTrackSpecificChanges}
                    className="shrink-0"
                />
            </div>

            {trackSpecificChanges ? (
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2">
                    <div className="space-y-2">
                        <FieldLabelWithInfo
                            label="Z hodnoty"
                            description="Ponechte prázdné pro sledování jakékoli změny z původní hodnoty."
                            htmlFor="data-change-from-value"
                        />
                        <Input
                            id="data-change-from-value"
                            className="bg-background"
                            value={fromValue}
                            onChange={(event) =>
                                setFromValue(event.target.value)
                            }
                            placeholder="Z hodnoty"
                        />
                    </div>

                    <ArrowRightIcon
                        className="mt-8 size-4 shrink-0 text-muted-foreground"
                        aria-hidden
                    />

                    <div className="space-y-2">
                        <FieldLabel htmlFor="data-change-to-value" required>
                            Na hodnotu
                        </FieldLabel>
                        <Input
                            id="data-change-to-value"
                            className="bg-background"
                            value={toValue}
                            onChange={(event) => setToValue(event.target.value)}
                            onBlur={() => setToValueTouched(true)}
                            placeholder="Na hodnotu"
                            aria-invalid={toValueInvalid}
                        />
                        {toValueInvalid ? (
                            <p className="flex items-center gap-1 text-sm text-destructive">
                                <CircleAlertIcon className="size-3.5 shrink-0" />
                                Povinný údaj
                            </p>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
