'use client'

import { GripVerticalIcon, Trash2Icon } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { RatingSettings } from './question-settings/rating-settings'
import { QuestionTypeSelect } from './question-type-select'
import { QuestionTypeSettings } from './question-type-settings'
import type { QuestionType, SurveyQuestion } from './temp'

export function SurveyQuestionItem({
    sectionId,
    sectionIndex,
    question,
    index,
    questionCount,
    onChange,
    onRemove,
}: {
    sectionId: string
    sectionIndex: number
    question: SurveyQuestion
    index: number
    questionCount: number
    onChange: (questionId: string, values: Partial<SurveyQuestion>) => void
    onRemove: (questionId: string) => void
}) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: question.id })
    const questionDomId = `${sectionId}-${question.id}`
    const questionFieldName = `sections[${sectionIndex}][questions][${index}]`

    function changeType(type: QuestionType) {
        onChange(question.id, { type })
    }

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={cn(
                'bg-card/75 flex flex-col gap-3 p-4 backdrop-blur',
                isDragging && 'bg-card/90 relative z-10 opacity-90 shadow-lg',
            )}
        >
            <div className="flex w-full items-end gap-3">
                <Button
                    ref={setActivatorNodeRef}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
                    aria-label={`Move question ${index + 1}`}
                    {...attributes}
                    {...listeners}
                >
                    <GripVerticalIcon />
                </Button>
                <Field className="min-w-0 flex-1">
                    <FieldLabel htmlFor={`${questionDomId}-name`}>
                        Question {index + 1}
                    </FieldLabel>
                    <Input
                        id={`${questionDomId}-name`}
                        name={`${questionFieldName}[name]`}
                        placeholder="Untitled question"
                    />
                </Field>
                <Field className="w-48 shrink-0">
                    <FieldLabel htmlFor={`${questionDomId}-type`}>
                        Question type
                    </FieldLabel>
                    <QuestionTypeSelect
                        id={`${questionDomId}-type`}
                        name={`${questionFieldName}[type]`}
                        value={question.type}
                        onValueChange={changeType}
                    />
                </Field>
                {question.type === 'rating' && (
                    <RatingSettings
                        id={`${questionDomId}-star-count`}
                        name={`${questionFieldName}[starCount]`}
                        value={question.starCount}
                        onValueChange={(starCount) =>
                            onChange(question.id, { starCount })
                        }
                    />
                )}
                <Field className="w-20 shrink-0">
                    <FieldLabel htmlFor={`${questionDomId}-required`}>
                        Required
                    </FieldLabel>
                    <div className="flex h-8 items-center">
                        <Switch
                            id={`${questionDomId}-required`}
                            name={`${questionFieldName}[required]`}
                            checked={question.required}
                            aria-label={`Question ${index + 1} is required`}
                            onCheckedChange={(required) =>
                                onChange(question.id, { required })
                            }
                        />
                    </div>
                </Field>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    disabled={questionCount === 1}
                    aria-label={`Remove question ${index + 1}`}
                    onClick={() => onRemove(question.id)}
                >
                    <Trash2Icon />
                </Button>
            </div>
            <Field className="pl-11">
                <FieldLabel htmlFor={`${questionDomId}-description`}>
                    Description
                </FieldLabel>
                <Textarea
                    id={`${questionDomId}-description`}
                    name={`${questionFieldName}[description]`}
                    placeholder="Optional question description"
                    className="min-h-16 resize-y"
                />
            </Field>
            <QuestionTypeSettings
                question={question}
                id={questionDomId}
                name={questionFieldName}
                onChange={(values) => onChange(question.id, values)}
            />
        </div>
    )
}
