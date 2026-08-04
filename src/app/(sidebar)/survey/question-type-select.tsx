'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { QUESTION_TYPE_OPTIONS, type QuestionType } from './temp'

export function QuestionTypeSelect({
    id,
    name,
    value,
    disabled,
    onValueChange,
}: {
    id: string
    name: string
    value: QuestionType
    disabled?: boolean
    onValueChange: (value: QuestionType) => void
}) {
    return (
        <Select
            value={value}
            name={name}
            disabled={disabled}
            onValueChange={(nextValue) => {
                if (nextValue) onValueChange(nextValue as QuestionType)
            }}
        >
            <SelectTrigger id={id} className="w-full">
                <SelectValue>
                    {(selectedValue) => {
                        const selectedType = QUESTION_TYPE_OPTIONS.find(
                            (option) => option.value === selectedValue,
                        )

                        if (!selectedType) return null

                        const Icon = selectedType.icon

                        return (
                            <>
                                <Icon />
                                {selectedType.label}
                            </>
                        )
                    }}
                </SelectValue>
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
                {QUESTION_TYPE_OPTIONS.map((option) => {
                    const Icon = option.icon

                    return (
                        <SelectItem key={option.value} value={option.value}>
                            <Icon />
                            {option.label}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}
