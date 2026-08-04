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

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'
import { toSelectItems } from '../shared/constants'

export function FormCompletedContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [note, setNote] = React.useState(() =>
        stringConfig(data.config, 'note'),
    )
    const [webForm, setWebForm] = React.useState(() =>
        stringConfig(data.config, 'webForm'),
    )

    React.useEffect(() => {
        setNote(stringConfig(data.config, 'note'))
        setWebForm(stringConfig(data.config, 'webForm'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ note, webForm }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <Label htmlFor="form-completed-note">
                    Poznámka pod názvem v diagramu
                </Label>
                <Input
                    id="form-completed-note"
                    className="bg-background"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <Label>Webový formulář</Label>
                <Select
                    items={toSelectItems(FAN_ACTION_OPTIONS.allWebForms)}
                    value={webForm || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== webForm) {
                            setWebForm(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte webový formulář"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(FAN_ACTION_OPTIONS.allWebForms).map((item) => (
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
