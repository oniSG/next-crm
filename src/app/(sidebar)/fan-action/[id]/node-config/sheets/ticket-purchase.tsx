'use client'

import * as React from 'react'
import { InfoIcon } from 'lucide-react'

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

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    boolConfig,
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'
import { toSelectItems } from '../shared/constants'

export function TicketPurchaseContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [eventList, setEventList] = React.useState(() =>
        stringConfig(data.config, 'eventList'),
    )
    const [reseatedOnly, setReseatedOnly] = React.useState(() =>
        boolConfig(data.config, 'reseatedOnly', true),
    )

    React.useEffect(() => {
        setEventList(stringConfig(data.config, 'eventList'))
        setReseatedOnly(boolConfig(data.config, 'reseatedOnly', true))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ eventList, reseatedOnly }),
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

            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                    <Label htmlFor={"ticket-purchase-reseated-only"}>Pouze nákupy přesazené vstupenky</Label>
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
                            <span className="sr-only">Pouze nákupy přesazené vstupenky</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Pouze nákupy přesazené vstupenky</h4>
                                <p className="text-sm text-muted-foreground">
                                    Spustí se, když návštěvník zaplatí objednávku přesazené vstupenky.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Switch
                    id="ticket-purchase-reseated-only"
                    checked={reseatedOnly}
                    onCheckedChange={setReseatedOnly}
                    className="shrink-0"
                />
            </div>
        </div>
    )
}
