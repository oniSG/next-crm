'use client'

import { SelectionOptionsPopover } from '@/components/custom/inputs/selection-options-popover'
import type { SurveyQuestion } from '../temp'

export function SelectionSettings({
    id,
    name,
    value,
    onValueChange,
}: {
    id: string
    name: string
    value: SurveyQuestion['selectionOptions']
    onValueChange: (value: SurveyQuestion['selectionOptions']) => void
}) {
    return (
        <div className="pl-11">
            <SelectionOptionsPopover
                id={`${id}-options`}
                name={`${name}[options]`}
                value={value}
                onValueChange={onValueChange}
            />
        </div>
    )
}
