'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'

import type { WorkflowDrawerContentProps } from '../../shared/types'
import { TAG_OPTIONS } from '../shared/constants'
import { FieldLabel, FieldLabelWithInfo, FieldSelect } from '../shared/form-components'
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
                <FieldLabel htmlFor="remove-tag-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="remove-tag-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabelWithInfo
                    label="Vyberte štítek"
                    description="Tato akce odebere Vámi vybraný štítek zákazníkovi"
                    required
                />
                <FieldSelect
                    value={tag}
                    onValueChange={setTag}
                    options={TAG_OPTIONS}
                    placeholder="Štítek"
                />
            </div>
        </div>
    )
}
