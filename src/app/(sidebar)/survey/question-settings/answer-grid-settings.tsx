'use client'

import { StringListPopover } from '@/components/custom/inputs/string-list-popover'
import { Field, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import type { SurveyQuestion } from '../temp'

type AnswerGridValues = Pick<SurveyQuestion, 'rows' | 'columns' | 'checkMoreOptions'>

export function AnswerGridSettings({
    id,
    name,
    values,
    onValueChange,
}: {
    id: string
    name: string
    values: AnswerGridValues
    onValueChange: (values: Partial<AnswerGridValues>) => void
}) {
    return (
        <div className="grid grid-cols-3 gap-3 pl-11">
            <StringListPopover
                id={`${id}-rows`}
                name={`${name}[rows]`}
                label="Rows"
                itemLabel="Row"
                value={values.rows}
                maxItems={10}
                onValueChange={(rows) => onValueChange({ rows })}
            />
            <StringListPopover
                id={`${id}-columns`}
                name={`${name}[columns]`}
                label="Columns"
                itemLabel="Column"
                value={values.columns}
                maxItems={10}
                onValueChange={(columns) => onValueChange({ columns })}
            />
            <Field orientation="horizontal">
                <FieldLabel htmlFor={`${id}-check-more-options`}>
                    Check more options
                </FieldLabel>
                <Switch
                    id={`${id}-check-more-options`}
                    name={`${name}[checkMoreOptions]`}
                    checked={values.checkMoreOptions}
                    onCheckedChange={(checkMoreOptions) =>
                        onValueChange({ checkMoreOptions })
                    }
                />
            </Field>
        </div>
    )
}
