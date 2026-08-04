'use client'

import { useRef, useState } from 'react'
import { ChevronDownIcon, GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { SurveyQuestionItem } from './survey-question-item'
import { createDefaultQuestion } from './survey-utils'
import type { SurveyQuestion, SurveySection } from './temp'

export function SurveySectionCard({
    section,
    index: sectionIndex,
    sectionCount,
    surveyColor,
    open,
    onOpenChange,
    onRemove,
}: {
    section: SurveySection
    index: number
    sectionCount: number
    surveyColor: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onRemove: (sectionId: string) => void
}) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id })
    const questionId = useRef(1)
    const [questions, setQuestions] = useState<SurveyQuestion[]>([
        createDefaultQuestion(),
    ])
    const questionSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    function addQuestion() {
        questionId.current += 1
        setQuestions((current) => [
            ...current,
            createDefaultQuestion(`question-${questionId.current}`),
        ])
    }

    function removeQuestion(questionId: string) {
        setQuestions((current) =>
            current.filter((question) => question.id !== questionId),
        )
    }

    function changeQuestion(questionId: string, values: Partial<SurveyQuestion>) {
        setQuestions((current) =>
            current.map((question) =>
                question.id === questionId ? { ...question, ...values } : question,
            ),
        )
    }

    function reorderQuestions(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        setQuestions((current) => {
            const oldIndex = current.findIndex((question) => question.id === active.id)
            const newIndex = current.findIndex((question) => question.id === over.id)

            if (oldIndex === -1 || newIndex === -1) return current

            return arrayMove(current, oldIndex, newIndex)
        })
    }

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={cn('relative w-full', isDragging && 'z-20 opacity-90')}
        >
            <Collapsible
                open={open}
                onOpenChange={onOpenChange}
                className="group/section w-full"
            >
                <Card
                    className={cn('w-full', isDragging && 'shadow-lg')}
                    style={{
                        backgroundColor: `color-mix(in srgb, ${surveyColor} 2%, transparent)`,
                    }}
                >
                    <CardHeader className="gap-x-10">
                        <CardTitle>
                            <Input
                                id={`${section.id}-name`}
                                name={`sections[${sectionIndex}][name]`}
                                placeholder="Untitled section"
                            />
                        </CardTitle>
                        <CardAction>
                            <Button
                                ref={setActivatorNodeRef}
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
                                aria-label={`Move section ${sectionIndex + 1}`}
                                {...attributes}
                                {...listeners}
                            >
                                <GripVerticalIcon />
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                disabled={sectionCount === 1}
                                aria-label={`Remove section ${sectionIndex + 1}`}
                                onClick={() => onRemove(section.id)}
                            >
                                <Trash2Icon />
                            </Button>
                            <CollapsibleTrigger
                                render={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        aria-label={`Toggle section ${sectionIndex + 1}`}
                                    />
                                }
                            >
                                <ChevronDownIcon className="transition-transform duration-200 group-data-open/section:rotate-180" />
                            </CollapsibleTrigger>
                        </CardAction>
                    </CardHeader>
                    <CollapsibleContent>
                        <Separator className="mb-4" />
                        <CardContent className="space-y-4">
                            <DndContext
                                id={`${section.id}-questions-dnd`}
                                sensors={questionSensors}
                                collisionDetection={closestCenter}
                                modifiers={[
                                    restrictToVerticalAxis,
                                    restrictToParentElement,
                                ]}
                                onDragEnd={reorderQuestions}
                            >
                                <SortableContext
                                    items={questions.map((question) => question.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="divide-y overflow-hidden rounded-lg border">
                                        {questions.map((question, index) => (
                                            <SurveyQuestionItem
                                                key={question.id}
                                                sectionId={section.id}
                                                sectionIndex={sectionIndex}
                                                question={question}
                                                index={index}
                                                questionCount={questions.length}
                                                onChange={changeQuestion}
                                                onRemove={removeQuestion}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                            <Button type="button" variant="outline" onClick={addQuestion}>
                                <PlusIcon />
                                Add question
                            </Button>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
    )
}
