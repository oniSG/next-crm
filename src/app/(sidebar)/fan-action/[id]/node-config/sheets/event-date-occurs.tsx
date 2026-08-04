'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { DAY_OFFSET_OPERATORS } from '../shared/constants'
import { FieldLabel, FieldSelect } from '../shared/form-components'
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
                <FieldLabel>Seznamy událostí</FieldLabel>
                <FieldSelect
                    value={eventList}
                    onValueChange={setEventList}
                    options={FAN_ACTION_OPTIONS.allEventLists}
                    placeholder="Vyberte seznam událostí"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel required>Dny</FieldLabel>
                <div className="flex gap-2">
                    <FieldSelect
                        value={dayOffsetOperator}
                        onValueChange={setDayOffsetOperator}
                        options={DAY_OFFSET_OPERATORS}
                        triggerClassName="w-20 shrink-0"
                    />
                    <FieldSelect
                        value={dayOffsetValue}
                        onValueChange={setDayOffsetValue}
                        options={DAY_VALUES}
                        triggerClassName="min-w-0 flex-1"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="event-date-occurs-hours" required>
                    Hodiny
                </FieldLabel>
                <Input
                    id="event-date-occurs-hours"
                    type="time"
                    value={hourOffsetValue}
                    onChange={(event) => setHourOffsetValue(event.target.value)}
                />
            </div>

            <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="event-date-occurs-points-only">
                    Pouze události s body
                </FieldLabel>
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
