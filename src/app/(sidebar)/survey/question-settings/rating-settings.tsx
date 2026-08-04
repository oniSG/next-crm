'use client'

import { Field, FieldLabel } from '@/components/ui/field'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function RatingSettings({
    id,
    name,
    value,
    onValueChange,
}: {
    id: string
    name: string
    value: number
    onValueChange: (value: number) => void
}) {
    return (
        <Field className="w-28 shrink-0">
            <FieldLabel htmlFor={id}>Star count</FieldLabel>
            <Select
                value={String(value)}
                name={name}
                onValueChange={(nextValue) => {
                    if (nextValue) onValueChange(Number(nextValue))
                }}
            >
                <SelectTrigger id={id} className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                        <SelectItem key={count} value={String(count)}>
                            {count}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Field>
    )
}
