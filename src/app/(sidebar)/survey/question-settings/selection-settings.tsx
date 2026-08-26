'use client'

import { SelectionOptionsList } from '@/components/custom/inputs/selection-options-list'
import { Field, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import type { SurveyQuestion } from '../temp'

export function SelectionSettings({
    id,
    name,
    value,
    multiple,
    onValueChange,
    onMultipleChange,
}: {
    id: string
    name: string
    value: SurveyQuestion['selectionOptions']
    multiple: boolean
    onValueChange: (value: SurveyQuestion['selectionOptions']) => void
    onMultipleChange: (value: boolean) => void
}) {
    return (
        <div className="space-y-4 pl-11">
            <SelectionOptionsList
                id={`${id}-options`}
                name={`${name}[options]`}
                value={value}
                onValueChange={onValueChange}
            />
            <Field orientation="horizontal" className="justify-between">
                <FieldLabel htmlFor={`${id}-multiple-selection`}>
                    Multiple options
                </FieldLabel>
                <Switch
                    id={`${id}-multiple-selection`}
                    name={`${name}[multipleSelection]`}
                    checked={multiple}
                    onCheckedChange={onMultipleChange}
                />
            </Field>
        </div>
    )
}
