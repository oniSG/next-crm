'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
    CalendarIcon,
    CopyIcon,
    EllipsisVerticalIcon,
    ExternalLinkIcon,
    GripVerticalIcon,
    ImageIcon,
    PlusIcon,
    Trash2Icon,
} from 'lucide-react'
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

import type { SurveyFormData, SurveyQuestion } from '@/app/(sidebar)/survey/temp'
import { AnswerGridInput } from '@/components/custom/inputs/answer-grid-input'
import { LinearScaleInput } from '@/components/custom/inputs/linear-scale-input'
import { RequiredIndicator } from '@/components/custom/other/required-indicator'
import { SelectionInput } from '@/components/custom/inputs/selection-input'
import { StarRatingInput } from '@/components/custom/inputs/star-rating-input'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export function SurveyBackground({
    survey,
    as: Component = 'div',
    className,
    children,
}: {
    survey: SurveyFormData
    as?: 'div' | 'main'
    className?: string
    children: ReactNode
}) {
    return (
        <Component className={cn('relative isolate', className)}>
            {survey.backgroundImage && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 bg-repeat"
                    style={{
                        backgroundImage: `url(${JSON.stringify(survey.backgroundImage.url)})`,
                    }}
                />
            )}
            {children}
        </Component>
    )
}

export function SurveyPreview({
    survey,
    showSubmit = true,
    className,
    fullScreenMobile = false,
    showThankYouPage = false,
    thankYouOnly = false,
    thankYouLinkActive = false,
    sampleAnswerDate,
    readOnly = false,
    selectedQuestion,
    onSelectSurvey,
    onSelectThankYou,
    onSelectSection,
    onSelectQuestion,
    onAddSection,
    onAddQuestion,
    onRemoveSection,
    onRemoveQuestion,
    onDuplicateQuestion,
    onReorderSections,
    onReorderQuestions,
}: {
    survey: SurveyFormData
    showSubmit?: boolean
    className?: string
    fullScreenMobile?: boolean
    showThankYouPage?: boolean
    thankYouOnly?: boolean
    thankYouLinkActive?: boolean
    sampleAnswerDate?: string
    readOnly?: boolean
    selectedQuestion?: { sectionId: string; questionId: string } | null
    onSelectSurvey?: () => void
    onSelectThankYou?: () => void
    onSelectSection?: (sectionId: string) => void
    onSelectQuestion?: (sectionId: string, questionId: string) => void
    onAddSection?: () => void
    onAddQuestion?: (sectionId: string, afterQuestionId?: string) => void
    onRemoveSection?: (sectionId: string) => void
    onRemoveQuestion?: (sectionId: string, questionId: string) => void
    onDuplicateQuestion?: (sectionId: string, questionId: string) => void
    onReorderSections?: (activeId: string, overId: string) => void
    onReorderQuestions?: (sectionId: string, activeId: string, overId: string) => void
}) {
    const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    )

    function reorderSections(event: DragEndEvent) {
        setSectionsCollapsed(false)
        if (event.over && event.active.id !== event.over.id) {
            onReorderSections?.(String(event.active.id), String(event.over.id))
        }
    }

    return (
        <div
            className={cn(
                'w-full max-w-3xl min-w-0',
                showThankYouPage && !thankYouOnly && 'space-y-4',
                fullScreenMobile && 'max-sm:min-h-svh max-sm:max-w-none',
                className,
            )}
            style={
                {
                    '--survey-color': survey.color,
                    '--primary': survey.color,
                } as CSSProperties
            }
        >
            {!thankYouOnly && (
                <Card
                    className={cn(
                        'min-w-0 shadow-sm transition-opacity',
                        onSelectSection && 'overflow-visible',
                        fullScreenMobile &&
                            'max-sm:min-h-svh max-sm:rounded-none max-sm:shadow-none max-sm:ring-0',
                    )}
                >
                    <CardHeader
                        className={cn(
                            '-mt-(--card-spacing) border-b py-6',
                            onSelectSurvey && 'cursor-pointer',
                            fullScreenMobile && 'max-sm:rounded-none',
                        )}
                        style={{
                            backgroundColor:
                                'color-mix(in srgb, var(--survey-color) 10%, transparent)',
                        }}
                        onClick={onSelectSurvey}
                    >
                        <CardTitle className="text-2xl">{survey.name}</CardTitle>
                        <CardDescription className="max-w-2xl text-base">
                            {survey.description}
                        </CardDescription>
                        {survey.expireDate && (
                            <div className="text-muted-foreground flex items-center gap-1.5 pt-2 text-xs">
                                <CalendarIcon className="size-3.5" />
                                Available until {survey.expireDate}
                                {survey.multiple && ' · Multiple submissions allowed'}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="min-w-0 space-y-10 p-0">
                        <DndContext
                            id="survey-preview-sections-dnd"
                            sensors={sensors}
                            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                            onDragStart={() => setSectionsCollapsed(true)}
                            onDragCancel={() => setSectionsCollapsed(false)}
                            onDragEnd={reorderSections}
                        >
                            <SortableContext
                                items={survey.sections.map((section) => section.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div
                                    className={cn(
                                        sectionsCollapsed ? 'space-y-0' : 'space-y-10',
                                    )}
                                >
                                    {survey.sections.map((section, sectionIndex) => (
                                        <SurveySection
                                            key={section.id}
                                            title={section.name}
                                            id={section.id}
                                            sectionNumber={sectionIndex + 1}
                                            showSeparator={sectionIndex > 0}
                                            questionsCollapsed={sectionsCollapsed}
                                            draggable={Boolean(onReorderSections)}
                                            sensors={sensors}
                                            questionIds={section.questions.map(
                                                (question) => question.id,
                                            )}
                                            onQuestionDragEnd={(event) => {
                                                if (
                                                    event.over &&
                                                    event.active.id !== event.over.id
                                                ) {
                                                    onReorderQuestions?.(
                                                        section.id,
                                                        String(event.active.id),
                                                        String(event.over.id),
                                                    )
                                                }
                                            }}
                                            removable={Boolean(onRemoveSection)}
                                            removeDisabled={survey.sections.length === 1}
                                            onRemove={() => onRemoveSection?.(section.id)}
                                            onSelect={() => onSelectSection?.(section.id)}
                                            onAddQuestion={
                                                onAddQuestion
                                                    ? () => onAddQuestion(section.id)
                                                    : undefined
                                            }
                                        >
                                            {section.questions.map((question) => (
                                                <Question
                                                    key={question.id}
                                                    id={question.id}
                                                    title={question.name}
                                                    description={question.description}
                                                    required={question.required}
                                                    editable={Boolean(onSelectQuestion)}
                                                    draggable={Boolean(
                                                        onReorderQuestions,
                                                    )}
                                                    selected={
                                                        selectedQuestion?.sectionId ===
                                                            section.id &&
                                                        selectedQuestion.questionId ===
                                                            question.id
                                                    }
                                                    onSelect={() =>
                                                        onSelectQuestion?.(
                                                            section.id,
                                                            question.id,
                                                        )
                                                    }
                                                    removable={Boolean(onRemoveQuestion)}
                                                    copyable={Boolean(
                                                        onDuplicateQuestion,
                                                    )}
                                                    removeDisabled={
                                                        section.questions.length === 1
                                                    }
                                                    onRemove={() =>
                                                        onRemoveQuestion?.(
                                                            section.id,
                                                            question.id,
                                                        )
                                                    }
                                                    onDuplicate={() =>
                                                        onDuplicateQuestion?.(
                                                            section.id,
                                                            question.id,
                                                        )
                                                    }
                                                >
                                                    <QuestionInput
                                                        question={question}
                                                        name={`answers[${section.id}][${question.id}]`}
                                                        disabled={readOnly}
                                                        sampleAnswerDate={
                                                            sampleAnswerDate
                                                        }
                                                    />
                                                </Question>
                                            ))}
                                        </SurveySection>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        {onAddSection && (
                            <>
                                <Separator />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="mx-4 w-fit"
                                    onClick={onAddSection}
                                >
                                    <PlusIcon />
                                    Add section
                                </Button>
                            </>
                        )}
                        {showSubmit && (
                            <>
                                <Separator />
                                <div className="flex items-center justify-end gap-3 px-4 pb-4">
                                    {survey.showLogo && <PlaceholderLogo />}
                                    <Button type="submit">Submit survey</Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
            {showThankYouPage && (
                <Card
                    className={cn(
                        'min-w-0 shadow-sm transition-opacity',
                        onSelectThankYou && 'cursor-pointer',
                    )}
                    role={onSelectThankYou ? 'button' : undefined}
                    tabIndex={onSelectThankYou ? 0 : undefined}
                    onClick={onSelectThankYou}
                    onKeyDown={(event) => {
                        if (
                            onSelectThankYou &&
                            (event.key === 'Enter' || event.key === ' ')
                        ) {
                            event.preventDefault()
                            onSelectThankYou()
                        }
                    }}
                >
                    <CardHeader>
                        <CardTitle>{survey.thankYouTitle || 'Thank you'}</CardTitle>
                        <CardDescription>
                            {survey.thankYouDescription || 'Thank you for your response.'}
                        </CardDescription>
                    </CardHeader>
                    {(survey.thankYouLinkText || survey.showThankYouLogo) && (
                        <CardContent className="flex items-center justify-between gap-4">
                            {survey.thankYouLinkText &&
                                (thankYouLinkActive ? (
                                    <a
                                        href={survey.thankYouLinkUrl}
                                        className="inline-flex items-center gap-1.5 font-medium"
                                        style={{ color: 'var(--survey-color)' }}
                                    >
                                        <ExternalLinkIcon className="size-4" />
                                        {survey.thankYouLinkText}
                                    </a>
                                ) : (
                                    <span
                                        className="inline-flex items-center gap-1.5 font-medium"
                                        style={{ color: 'var(--survey-color)' }}
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <ExternalLinkIcon className="size-4" />
                                        {survey.thankYouLinkText}
                                    </span>
                                ))}
                            {survey.showThankYouLogo && (
                                <div className="ml-auto">
                                    <PlaceholderLogo />
                                </div>
                            )}
                        </CardContent>
                    )}
                </Card>
            )}
        </div>
    )
}

function SurveySection({
    id,
    title,
    sectionNumber,
    showSeparator = false,
    questionsCollapsed = false,
    children,
    removable = false,
    removeDisabled = false,
    onRemove,
    onSelect,
    draggable = false,
    onAddQuestion,
    sensors,
    questionIds,
    onQuestionDragEnd,
}: {
    id: string
    title: string
    sectionNumber: number
    showSeparator?: boolean
    questionsCollapsed?: boolean
    children: ReactNode
    removable?: boolean
    removeDisabled?: boolean
    onRemove?: () => void
    onSelect?: () => void
    draggable?: boolean
    onAddQuestion?: () => void
    sensors: ReturnType<typeof useSensors>
    questionIds: string[]
    onQuestionDragEnd: (event: DragEndEvent) => void
}) {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const [isHeaderStuck, setIsHeaderStuck] = useState(false)
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: !draggable })

    useEffect(() => {
        if (!onSelect) return

        const updateStickyState = () => {
            const section = sectionRef.current
            const header = headerRef.current

            if (!section || !header) return

            const stickyTop = 48
            const sectionRect = section.getBoundingClientRect()
            const headerRect = header.getBoundingClientRect()

            setIsHeaderStuck(
                headerRect.top <= stickyTop &&
                    sectionRect.bottom > stickyTop + headerRect.height,
            )
        }

        updateStickyState()
        window.addEventListener('scroll', updateStickyState, {
            capture: true,
            passive: true,
        })
        window.addEventListener('resize', updateStickyState)

        return () => {
            window.removeEventListener('scroll', updateStickyState, true)
            window.removeEventListener('resize', updateStickyState)
        }
    }, [onSelect])

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'relative',
                showSeparator &&
                    !questionsCollapsed &&
                    'before:bg-border before:absolute before:-top-5 before:left-0 before:h-px before:w-full',
                isDragging && 'z-30',
            )}
            style={{ transform: CSS.Translate.toString(transform), transition }}
        >
            <section
                ref={sectionRef}
                className={cn(
                    'space-y-5 p-4 transition-shadow',
                    isDragging &&
                        'bg-white/70 shadow-lg backdrop-blur-md dark:bg-white/5',
                )}
            >
                <div
                    ref={headerRef}
                    className={cn(
                        'flex items-center gap-3',
                        onSelect &&
                            'bg-card/90 sticky top-12 z-10 -mx-4 cursor-pointer border-b border-transparent px-4 py-2 backdrop-blur-md',
                        isHeaderStuck && 'border-border',
                    )}
                    role={onSelect ? 'button' : undefined}
                    tabIndex={onSelect ? 0 : undefined}
                    onClick={onSelect}
                    onKeyDown={(event) => {
                        if (onSelect && (event.key === 'Enter' || event.key === ' ')) {
                            event.preventDefault()
                            onSelect()
                        }
                    }}
                >
                    {draggable && (
                        <Button
                            ref={setActivatorNodeRef}
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground shrink-0 cursor-grab touch-none active:cursor-grabbing"
                            aria-label={`Move section ${sectionNumber}`}
                            onClick={(event) => event.stopPropagation()}
                            {...attributes}
                            {...listeners}
                        >
                            <GripVerticalIcon />
                        </Button>
                    )}
                    <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: 'var(--survey-color)' }}
                    >
                        {sectionNumber}
                    </span>
                    <h2
                        className={cn(
                            'text-lg font-semibold',
                            onSelect && 'min-w-0 truncate',
                        )}
                    >
                        {title}
                    </h2>
                    {onAddQuestion && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                            onClick={(event) => {
                                event.stopPropagation()
                                onAddQuestion()
                            }}
                        >
                            <PlusIcon />
                            Add question
                        </Button>
                    )}
                    {removable && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className={cn(
                                'text-muted-foreground hover:text-destructive',
                                !onAddQuestion && 'ml-auto',
                            )}
                            disabled={removeDisabled}
                            aria-label={`Remove section ${sectionNumber}`}
                            onClick={(event) => {
                                event.stopPropagation()
                                onRemove?.()
                            }}
                        >
                            <Trash2Icon />
                        </Button>
                    )}
                </div>
                {!questionsCollapsed && (
                    <DndContext
                        id={`survey-preview-${id}-questions-dnd`}
                        sensors={sensors}
                        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                        onDragEnd={onQuestionDragEnd}
                    >
                        <SortableContext
                            items={questionIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">{children}</div>
                        </SortableContext>
                    </DndContext>
                )}
            </section>
        </div>
    )
}

function QuestionInput({
    question,
    name,
    disabled,
    sampleAnswerDate,
}: {
    question: SurveyQuestion
    name: string
    disabled?: boolean
    sampleAnswerDate?: string
}) {
    const showSampleAnswer = Boolean(sampleAnswerDate)

    switch (question.type) {
        case 'text':
            return (
                <Input
                    key="sample-text-answer"
                    name={name}
                    placeholder="Enter your answer"
                    defaultValue={
                        showSampleAnswer
                            ? 'A sample response showing how the completed survey will look.'
                            : undefined
                    }
                    required={question.required}
                    disabled={disabled}
                />
            )
        case 'date':
            return (
                <Input
                    key="sample-date-answer"
                    name={name}
                    type="date"
                    defaultValue={sampleAnswerDate}
                    required={question.required}
                    disabled={disabled}
                />
            )
        case 'rating':
            return (
                <StarRatingInput
                    key={showSampleAnswer ? `sample-rating-${question.starCount}` : name}
                    name={name}
                    count={question.starCount}
                    defaultValue={showSampleAnswer ? 1 : undefined}
                    required={question.required}
                    disabled={disabled}
                />
            )
        case 'linear-scale':
            return (
                <LinearScaleInput
                    key={showSampleAnswer ? `sample-linear-${question.rateCount}` : name}
                    name={name}
                    count={question.rateCount}
                    defaultValue={
                        showSampleAnswer ? Math.min(3, question.rateCount) : undefined
                    }
                    startLabel={question.textStart}
                    endLabel={question.textEnd}
                    required={question.required}
                    disabled={disabled}
                />
            )
        case 'selection':
            return (
                <SelectionInput
                    key={
                        showSampleAnswer
                            ? `sample-selection-${question.multipleSelection}-${question.selectionOptions.map((option) => option.id).join(':')}`
                            : name
                    }
                    name={name}
                    multiple={question.multipleSelection}
                    required={question.required}
                    disabled={disabled}
                    defaultValue={
                        showSampleAnswer
                            ? question.selectionOptions
                                  .slice(0, question.multipleSelection ? 2 : 1)
                                  .map((option) => option.id)
                            : undefined
                    }
                    options={question.selectionOptions.map((option) => ({
                        value: option.id,
                        label: option.label,
                        allowSecondaryText: option.allowSecondaryText,
                        secondaryTextRequired: option.secondaryTextRequired,
                    }))}
                />
            )
        case 'answer-grid':
            return (
                <AnswerGridInput
                    key={
                        showSampleAnswer
                            ? `sample-grid-${question.checkMoreOptions}-${question.rows.join(':')}-${question.columns.join(':')}`
                            : name
                    }
                    name={name}
                    rows={question.rows}
                    columns={question.columns}
                    multiple={question.checkMoreOptions}
                    required={question.required}
                    disabled={disabled}
                    defaultValue={
                        showSampleAnswer ? buildSampleGridValue(question) : undefined
                    }
                />
            )
    }
}

function buildSampleGridValue(question: SurveyQuestion) {
    return Object.fromEntries(
        question.rows.map((row, rowIndex) => {
            if (question.columns.length === 0) return [row, []]

            const firstColumnIndex = rowIndex % question.columns.length
            const selectedColumns = [question.columns[firstColumnIndex]]

            if (
                question.checkMoreOptions &&
                rowIndex % 2 === 1 &&
                question.columns.length > 1
            ) {
                selectedColumns.push(
                    question.columns[(firstColumnIndex + 1) % question.columns.length],
                )
            }

            return [row, selectedColumns]
        }),
    )
}

function Question({
    id,
    title,
    description,
    required,
    children,
    editable = false,
    selected = false,
    onSelect,
    removable = false,
    removeDisabled = false,
    onRemove,
    copyable = false,
    onDuplicate,
    draggable = false,
}: {
    id: string
    title: string
    description: string
    required?: boolean
    children: ReactNode
    editable?: boolean
    selected?: boolean
    onSelect?: () => void
    removable?: boolean
    removeDisabled?: boolean
    onRemove?: () => void
    copyable?: boolean
    onDuplicate?: () => void
    draggable?: boolean
}) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, disabled: !draggable })

    return (
        <Field
            ref={setNodeRef}
            style={{ transform: CSS.Translate.toString(transform), transition }}
            className={cn(
                'min-w-0 rounded-xl border bg-white/70 p-4 backdrop-blur-md transition dark:bg-white/5',
                editable &&
                    'hover:border-primary/50 cursor-pointer [&_[aria-disabled=true]]:cursor-pointer [&_[data-slot=field-label]]:cursor-pointer [&_input:disabled]:cursor-pointer',
                selected && 'border-primary ring-primary/20 ring-2',
                isDragging && 'relative z-30 shadow-lg',
            )}
            role={editable ? 'button' : undefined}
            tabIndex={editable ? 0 : undefined}
            onClick={onSelect}
            onKeyDown={(event) => {
                if (editable && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    onSelect?.()
                }
            }}
        >
            <div className="flex min-w-0 items-center gap-2">
                {draggable && (
                    <Button
                        ref={setActivatorNodeRef}
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground shrink-0 cursor-grab touch-none active:cursor-grabbing"
                        aria-label={`Move question ${title}`}
                        onClick={(event) => event.stopPropagation()}
                        {...attributes}
                        {...listeners}
                    >
                        <GripVerticalIcon />
                    </Button>
                )}
                <FieldLabel
                    className={cn(
                        'min-w-0 flex-1 items-start text-base',
                        editable && 'max-w-full overflow-hidden',
                    )}
                >
                    <span className={cn(editable && 'min-w-0 flex-1 truncate')}>
                        {title}
                    </span>
                    {required && <RequiredIndicator />}
                </FieldLabel>
                {(copyable || removable) && (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="text-muted-foreground shrink-0"
                                    aria-label={`Question actions for ${title}`}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            }
                        >
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-52 whitespace-nowrap"
                        >
                            {copyable && (
                                <DropdownMenuItem
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        onDuplicate?.()
                                    }}
                                >
                                    <CopyIcon />
                                    Duplicate question
                                </DropdownMenuItem>
                            )}
                            {removable && (
                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={removeDisabled}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        onRemove?.()
                                    }}
                                >
                                    <Trash2Icon />
                                    Remove question
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            {description && (
                <FieldDescription className={cn(editable && 'line-clamp-1')}>
                    {description}
                </FieldDescription>
            )}
            <div className="pt-1">{children}</div>
        </Field>
    )
}

function PlaceholderLogo() {
    return (
        <div
            className="text-muted-foreground flex h-8 items-center gap-2 rounded-lg border border-dashed px-2.5 text-xs"
            aria-label="Survey organization logo placeholder"
        >
            <ImageIcon className="size-4" />
            Logo
        </div>
    )
}
