'use client'

import * as React from 'react'
import { InfoIcon } from 'lucide-react'

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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { TAG_OPTIONS, toSelectItems } from '../shared/constants'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function RemoveTagContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [tag, setTag] = React.useState(() => stringConfig(data.config, 'tag'))

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setTag(stringConfig(data.config, 'tag'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ note, tag }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label htmlFor="remove-tag-note">
                    Poznámka pod názvem v diagramu
                </Label>
                <Input
                    id="remove-tag-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <Label>Vyberte štítek</Label>
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
                            <span className="sr-only">Vyberte štítek</span>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-56">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Vyberte štítek</h4>
                                <p className="text-sm text-muted-foreground">
                                    Tato akce odebere Vámi vybraný štítek zákazníkovi
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <Select
                    items={toSelectItems(TAG_OPTIONS)}
                    value={tag || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== tag) {
                            setTag(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Štítek"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(TAG_OPTIONS).map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
