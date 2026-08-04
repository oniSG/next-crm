'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    DATE_PROPERTIES,
    DAY_OFFSET_OPERATORS,
} from '../shared/constants'
import { FieldLabel, FieldSelect } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function ExactDateContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [dateProperty, setDateProperty] = React.useState(() =>
        stringConfig(data.config, 'dateProperty'),
    )
    const [dayOffsetOperator, setDayOffsetOperator] = React.useState(() =>
        stringConfig(data.config, 'dayOffsetOperator', '+'),
    )
    const [dayOffsetValue, setDayOffsetValue] = React.useState(() =>
        stringConfig(data.config, 'dayOffsetValue', '1'),
    )
    const [checkTime, setCheckTime] = React.useState(() =>
        stringConfig(data.config, 'checkTime', '04:00'),
    )

    React.useEffect(() => {
        setDateProperty(stringConfig(data.config, 'dateProperty'))
        setDayOffsetOperator(
            stringConfig(data.config, 'dayOffsetOperator', '+'),
        )
        setDayOffsetValue(stringConfig(data.config, 'dayOffsetValue', '1'))
        setCheckTime(stringConfig(data.config, 'checkTime', '04:00'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({
            dateProperty,
            dayOffsetOperator,
            dayOffsetValue,
            checkTime,
        }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel required>Vlastnost data</FieldLabel>
                <FieldSelect
                    value={dateProperty}
                    onValueChange={setDateProperty}
                    options={DATE_PROPERTIES}
                    placeholder="Vyberte vlastnost data"
                />
                {dateProperty === 'holiday' ? (
                    <p className="text-sm text-muted-foreground">
                        Spouštěč reaguje na automaticky nebo ručně doplněné datum
                        svátku v českém a slovenském kalendáři
                    </p>
                ) : null}
            </div>

            <div className="space-y-2">
                <FieldLabel>Počet dní před/po</FieldLabel>
                <div className="flex gap-2">
                    <FieldSelect
                        value={dayOffsetOperator}
                        onValueChange={setDayOffsetOperator}
                        options={DAY_OFFSET_OPERATORS}
                        triggerClassName="w-20 shrink-0"
                    />
                    <Input
                        type="number"
                        min={0}
                        className="min-w-0 flex-1 bg-background"
                        value={dayOffsetValue}
                        onChange={(event) =>
                            setDayOffsetValue(event.target.value)
                        }
                    />
                </div>
            </div>

            <div className="space-y-2">
                <FieldLabel htmlFor="exact-date-check-time" required>
                    Čas kontroly
                </FieldLabel>
                <Input
                    id="exact-date-check-time"
                    type="time"
                    value={checkTime}
                    onChange={(event) => setCheckTime(event.target.value)}
                />
            </div>
        </div>
    )
}
