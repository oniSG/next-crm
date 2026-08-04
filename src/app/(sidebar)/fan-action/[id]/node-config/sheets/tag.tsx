'use client'

import * as React from 'react'
import { PlusIcon, SquarePenIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { TAG_OPTIONS } from '../shared/constants'
import { FieldLabel, FieldLabelWithInfo, FieldSelect } from '../shared/form-ui'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function TagContent({
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
                <FieldLabel htmlFor="tag-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="tag-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Vyberte štítek"
                    description="Tato akce přidělí Vámi vybraný štítek zákazníkovi"
                    required
                />
                <div className="flex items-center gap-2">
                    <div className="min-w-0 flex-1">
                        <FieldSelect
                            value={tag}
                            onValueChange={setTag}
                            options={TAG_OPTIONS}
                            placeholder="Štítek"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-9 shrink-0"
                        aria-label="Nový štítek"
                        onClick={() => {}}
                    >
                        <PlusIcon className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-9 shrink-0"
                        aria-label="Upravit štítek"
                        disabled={!tag}
                    >
                        <SquarePenIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
