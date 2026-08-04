'use client'

import * as React from 'react'

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
                <Label>Vyberte dotazník</Label>
                <Select
                    items={toSelectItems(FAN_ACTION_OPTIONS.allQuestionnaires)}
                    value={questionnaire || null}
                    onValueChange={(next) => {
                        if (typeof next === 'string' && next !== questionnaire) {
                            setQuestionnaire(next)
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Vyberte dotazník"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {toSelectItems(FAN_ACTION_OPTIONS.allQuestionnaires).map((item) => (
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
