'use client'

import { SelectionOptionsPopover } from '@/components/custom/inputs/selection-options-popover'
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
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 pl-11">
            <SelectionOptionsPopover
                id={`${id}-options`}
                name={`${name}[options]`}
                value={value}
                onValueChange={onValueChange}
            />
            <Field orientation="horizontal">
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
