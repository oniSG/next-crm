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
import { DATE_PROPERTIES, DAY_OFFSET_OPERATORS, toSelectItems } from '../shared/constants'
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
                <Label>Vlastnost data</Label>
                <Select
                    items={toSelectItems(DATE_PROPERTIES)}
                    value={dateProperty || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== dateProperty) {
                            setDateProperty(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte vlastnost data"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(DATE_PROPERTIES).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {dateProperty === 'holiday' ? (
                    <p className="text-sm text-muted-foreground">
                        Spouštěč reaguje na automaticky nebo ručně doplněné datum
                        svátku v českém a slovenském kalendáři
                    </p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label>Počet dní před/po</Label>
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
                <Label htmlFor="exact-date-check-time">
                    Čas kontroly
                </Label>
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
