'use client'

import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { SurveyQuestion } from '../temp'

type LinearScaleValues = Pick<SurveyQuestion, 'rateCount' | 'textStart' | 'textEnd'>

export function LinearScaleSettings({
    id,
    name,
    values,
    onValueChange,
}: {
    id: string
    name: string
    values: LinearScaleValues
    onValueChange: (values: Partial<LinearScaleValues>) => void
}) {
    return (
        <div className="grid grid-cols-[7rem_1fr_1fr] gap-3 pl-11">
            <Field>
                <FieldLabel htmlFor={`${id}-rate-count`}>Rate count</FieldLabel>
                <Select
                    value={String(values.rateCount)}
                    name={`${name}[rateCount]`}
                    onValueChange={(value) => {
                        if (value) onValueChange({ rateCount: Number(value) })
                    }}
                >
                    <SelectTrigger id={`${id}-rate-count`} className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        {Array.from({ length: 6 }, (_, index) => index + 3).map(
                            (count) => (
                                <SelectItem key={count} value={String(count)}>
                                    {count}
                                </SelectItem>
                            ),
                        )}
                    </SelectContent>
                </Select>
            </Field>
            <Field>
                <FieldLabel htmlFor={`${id}-text-start`}>Text start</FieldLabel>
                <Input
                    id={`${id}-text-start`}
                    name={`${name}[textStart]`}
                    value={values.textStart}
                    placeholder="Worst"
                    onChange={(event) => onValueChange({ textStart: event.target.value })}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor={`${id}-text-end`}>Text end</FieldLabel>
                <Input
                    id={`${id}-text-end`}
                    name={`${name}[textEnd]`}
                    value={values.textEnd}
                    placeholder="Best"
                    onChange={(event) => onValueChange({ textEnd: event.target.value })}
                />
            </Field>
        </div>
    )
}
