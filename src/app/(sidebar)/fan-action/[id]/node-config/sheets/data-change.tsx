'use client'

import * as React from 'react'
import { ArrowRightIcon, CircleAlertIcon, InfoIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { DATA_CHANGE_FIELDS, toSelectItems } from '../shared/constants'
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
                <Label>Vyberte pole</Label>
                <Select
                    items={toSelectItems(DATA_CHANGE_FIELDS)}
                    value={field || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== field) {
                            setField(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte pole"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(DATA_CHANGE_FIELDS).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="data-change-track-specific">
                    Sledovat konkrétní změny
                </Label>
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
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor={"data-change-from-value"}>Z hodnoty</Label>
                            <HoverCard>
                                <HoverCardTrigger
                                    render={
                                        <button
                                            type="button"
                                            className="inline-flex shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                        />
                                    }
                                >
                                    <InfoIcon className="size-3.5" />
                                    <span className="sr-only">Z hodnoty</span>
                                </HoverCardTrigger>
                                <HoverCardContent side="left" className="w-56">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">Z hodnoty</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Ponechte prázdné pro sledování jakékoli změny z původní hodnoty.
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
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
                        <Label htmlFor="data-change-to-value">
                            Na hodnotu
                        </Label>
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
