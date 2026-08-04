'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel, FieldSelect } from '../shared/form-components'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

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
                <FieldLabel htmlFor="form-completed-note">
                    Poznámka pod názvem v diagramu
                </FieldLabel>
                <Input
                    id="form-completed-note"
                    className="bg-background"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Poznámka"
                />
            </div>

            <div className="space-y-2">
                <FieldLabel required>Webový formulář</FieldLabel>
                <FieldSelect
                    value={webForm}
                    onValueChange={setWebForm}
                    options={FAN_ACTION_OPTIONS.allWebForms}
                    placeholder="Vyberte webový formulář"
                />
            </div>
        </div>
    )
}
