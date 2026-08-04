'use client'

import { AnswerGridSettings } from './question-settings/answer-grid-settings'
import { LinearScaleSettings } from './question-settings/linear-scale-settings'
import { SelectionSettings } from './question-settings/selection-settings'
import type { SurveyQuestion } from './temp'

export function QuestionTypeSettings({
    question,
    id,
    name,
    onChange,
}: {
    question: SurveyQuestion
    id: string
    name: string
    onChange: (values: Partial<SurveyQuestion>) => void
}) {
    switch (question.type) {
        case 'linear-scale':
            return (
                <LinearScaleSettings
                    id={id}
                    name={name}
                    values={question}
                    onValueChange={onChange}
                />
            )
        case 'answer-grid':
            return (
                <AnswerGridSettings
                    id={id}
                    name={name}
                    values={question}
                    onValueChange={onChange}
                />
            )
        case 'selection':
            return (
                <SelectionSettings
                    id={id}
                    name={name}
                    value={question.selectionOptions}
                    onValueChange={(selectionOptions) => onChange({ selectionOptions })}
                />
            )
        default:
            return null
    }
}
