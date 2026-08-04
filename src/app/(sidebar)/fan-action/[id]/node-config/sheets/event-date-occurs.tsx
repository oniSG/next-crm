'use client'

import * as React from 'react'

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

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { DAY_OFFSET_OPERATORS, toSelectItems } from '../shared/constants'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

const DAY_VALUES = Array.from({ length: 31 }, (_, index) => String(index))

export function EventDateOccursContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [eventList, setEventList] = React.useState(() =>
        stringConfig(data.config, 'eventList'),
    )
    const [dayOffsetOperator, setDayOffsetOperator] = React.useState(() =>
        stringConfig(data.config, 'dayOffsetOperator', '+'),
    )
    const [dayOffsetValue, setDayOffsetValue] = React.useState(() =>
        stringConfig(data.config, 'dayOffsetValue', '0'),
    )
    const [hourOffsetValue, setHourOffsetValue] = React.useState(() =>
        stringConfig(data.config, 'hourOffsetValue', '00:00'),
    )
    const [pointsEventsOnly, setPointsEventsOnly] = React.useState(() =>
        boolConfig(data.config, 'pointsEventsOnly'),
    )

    React.useEffect(() => {
        setEventList(stringConfig(data.config, 'eventList'))
        setDayOffsetOperator(
            stringConfig(data.config, 'dayOffsetOperator', '+'),
        )
        setDayOffsetValue(stringConfig(data.config, 'dayOffsetValue', '0'))
        setHourOffsetValue(
            stringConfig(data.config, 'hourOffsetValue', '00:00'),
        )
        setPointsEventsOnly(boolConfig(data.config, 'pointsEventsOnly'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            eventList,
            dayOffsetOperator,
            dayOffsetValue,
            hourOffsetValue,
            pointsEventsOnly,
        }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label>Seznamy událostí</Label>
                <Select
                    items={toSelectItems(FAN_ACTION_OPTIONS.allEventLists)}
                    value={eventList || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== eventList) {
                            setEventList(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte seznam událostí"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(FAN_ACTION_OPTIONS.allEventLists).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Dny</Label>
                <div className="flex gap-2">
                    <Select
                        items={toSelectItems(DAY_OFFSET_OPERATORS)}
                        value={dayOffsetOperator || null}
                        onValueChange={(next) => {
                            if (typeof next === 'string' && next !== dayOffsetOperator) {
                                setDayOffsetOperator(next)
                            }
                        }}
                    >
                        <SelectTrigger className="w-20 shrink-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {toSelectItems(DAY_OFFSET_OPERATORS).map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        items={toSelectItems(DAY_VALUES)}
                        value={dayOffsetValue || null}
                        onValueChange={(next) => {
                            if (typeof next === 'string' && next !== dayOffsetValue) {
                                setDayOffsetValue(next)
                            }
                        }}
                    >
                        <SelectTrigger className="min-w-0 w-full flex-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {toSelectItems(DAY_VALUES).map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="event-date-occurs-hours">
                    Hodiny
                </Label>
                <Input
                    id="event-date-occurs-hours"
                    type="time"
                    value={hourOffsetValue}
                    onChange={(event) => setHourOffsetValue(event.target.value)}
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="event-date-occurs-points-only">
                    Pouze události s body
                </Label>
                <Switch
                    id="event-date-occurs-points-only"
                    checked={pointsEventsOnly}
                    onCheckedChange={setPointsEventsOnly}
                    className="shrink-0"
                />
            </div>
        </div>
    )
}
