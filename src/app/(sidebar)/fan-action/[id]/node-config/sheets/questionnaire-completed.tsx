'use client'

import * as React from 'react'

import { FAN_ACTION_OPTIONS } from '../../data'
import type { WorkflowDrawerContentProps } from '../../shared/types'
import { FieldLabel, FieldSelect } from '../shared/form-ui'
import {
    stringConfig,
    useNodeConfigSave,
} from '../shared/use-node-config-save'

export function QuestionnaireCompletedContent({
    nodeId,
    data,
    syncNodeConfig,
}: WorkflowDrawerContentProps) {
    const [questionnaire, setQuestionnaire] = React.useState(() =>
        stringConfig(data.config, 'questionnaire'),
    )

    React.useEffect(() => {
        setQuestionnaire(stringConfig(data.config, 'questionnaire'))
    }, [nodeId])

    useNodeConfigSave({
        nodeId,
        syncNodeConfig,
        getPayload: () => ({ questionnaire }),
    })

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <FieldLabel required>Vyberte dotazník</FieldLabel>
                <FieldSelect
                    value={questionnaire}
                    onValueChange={setQuestionnaire}
                    options={FAN_ACTION_OPTIONS.allQuestionnaires}
                    placeholder="Vyberte dotazník"
                />
            </div>
        </div>
    )
}
