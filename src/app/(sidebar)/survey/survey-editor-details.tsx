'use client'

import { XIcon } from 'lucide-react'

import { RequiredIndicator } from '@/components/custom/other/required-indicator'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { QuestionTypeSelect } from './question-type-select'
import { QuestionTypeSettings } from './question-type-settings'
import { RatingSettings } from './question-settings/rating-settings'
import type { SurveyFormData, SurveyQuestion } from './temp'

export type QuestionSelection = {
    sectionId: string
    questionId: string
    sectionName: string
    question: SurveyQuestion
}

type DetailProps = {
    selection?: QuestionSelection
    sectionSelection?: SurveyFormData['sections'][number]
    onQuestionChange: (values: Partial<SurveyQuestion>) => void
    onSectionNameChange: (sectionId: string, name: string) => void
}

export function DetailSettingsColumn({
    selection,
    sectionSelection,
    onClose,
    onQuestionChange,
    onSectionNameChange,
}: DetailProps & { onClose: () => void }) {
    return (
        <div>
            <DetailHeader selection={selection} onClose={onClose} showCloseButton />
            <div className="p-4 pb-24">
                <DetailContent
                    panelId="detail-column"
                    selection={selection}
                    sectionSelection={sectionSelection}
                    onQuestionChange={onQuestionChange}
                    onSectionNameChange={onSectionNameChange}
                />
            </div>
        </div>
    )
}

export function DetailSettingsSheet({
    open,
    selection,
    sectionSelection,
    onOpenChange,
    onQuestionChange,
    onSectionNameChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
} & DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md lg:hidden">
                <DetailHeader selection={selection} sheet />
                <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
                    <DetailContent
                        panelId="detail-sheet"
                        selection={selection}
                        sectionSelection={sectionSelection}
                        onQuestionChange={onQuestionChange}
                        onSectionNameChange={onSectionNameChange}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

function DetailHeader({
    selection,
    onClose,
    showCloseButton = false,
    sheet = false,
}: {
    selection?: QuestionSelection
    onClose?: () => void
    showCloseButton?: boolean
    sheet?: boolean
}) {
    const content = (
        <>
            <div className="min-w-0">
                {sheet ? (
                    <SheetTitle>
                        {selection ? 'Question settings' : 'Section settings'}
                    </SheetTitle>
                ) : (
                    <h2 className="font-heading text-base font-medium">
                        {selection ? 'Question settings' : 'Section settings'}
                    </h2>
                )}
                {sheet ? (
                    <SheetDescription>
                        {selection
                            ? `${selection.sectionName} · Edit the selected question.`
                            : 'Edit the selected section.'}
                    </SheetDescription>
                ) : (
                    <p className="text-muted-foreground text-sm">
                        {selection
                            ? `${selection.sectionName} · Edit the selected question.`
                            : 'Edit the selected section.'}
                    </p>
                )}
            </div>
            {showCloseButton && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="shrink-0"
                    aria-label="Close detail settings"
                    onClick={onClose}
                >
                    <XIcon />
                </Button>
            )}
        </>
    )

    return sheet ? (
        <SheetHeader className="border-b">{content}</SheetHeader>
    ) : (
        <div className="flex items-start justify-between gap-3 border-b p-4">
            {content}
        </div>
    )
}

function DetailContent({
    panelId,
    selection,
    sectionSelection,
    onQuestionChange,
    onSectionNameChange,
}: DetailProps & { panelId: string }) {
    return (
        <>
            {selection && (
                <QuestionDetails
                    panelId={panelId}
                    selection={selection}
                    onChange={onQuestionChange}
                />
            )}
            {sectionSelection && !selection && (
                <SectionDetails
                    panelId={panelId}
                    section={sectionSelection}
                    onChange={onSectionNameChange}
                />
            )}
        </>
    )
}

function SectionDetails({
    panelId,
    section,
    onChange,
}: {
    panelId: string
    section: SurveyFormData['sections'][number]
    onChange: (sectionId: string, name: string) => void
}) {
    return (
        <Field>
            <FieldLabel htmlFor={`${panelId}-section-name`}>
                Section name <RequiredIndicator />
            </FieldLabel>
            <Input
                id={`${panelId}-section-name`}
                value={section.name}
                required
                onChange={(event) => onChange(section.id, event.target.value)}
            />
        </Field>
    )
}

function QuestionDetails({
    panelId,
    selection,
    onChange,
}: {
    panelId: string
    selection: QuestionSelection
    onChange: (values: Partial<SurveyQuestion>) => void
}) {
    const { question, sectionId } = selection
    const id = `${panelId}-question-${sectionId}-${question.id}`
    return (
        <div className="space-y-5">
            <Field>
                <FieldLabel htmlFor={`${id}-name`}>
                    Question <RequiredIndicator />
                </FieldLabel>
                <Input
                    id={`${id}-name`}
                    value={question.name}
                    required
                    onChange={(event) => onChange({ name: event.target.value })}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor={`${id}-description`}>Description</FieldLabel>
                <Textarea
                    id={`${id}-description`}
                    value={question.description}
                    onChange={(event) => onChange({ description: event.target.value })}
                />
            </Field>
            <Field>
                <FieldLabel htmlFor={`${id}-type`}>Question type</FieldLabel>
                <QuestionTypeSelect
                    id={`${id}-type`}
                    name={`${id}-type`}
                    value={question.type}
                    onValueChange={(type) => onChange({ type })}
                />
            </Field>
            <Field orientation="horizontal">
                <FieldLabel htmlFor={`${id}-required`}>Required</FieldLabel>
                <Switch
                    id={`${id}-required`}
                    checked={question.required}
                    onCheckedChange={(required) => onChange({ required })}
                />
            </Field>
            <Separator />
            {question.type === 'rating' && (
                <RatingSettings
                    id={`${id}-stars`}
                    name={`${id}-stars`}
                    value={question.starCount}
                    onValueChange={(starCount) => onChange({ starCount })}
                />
            )}
            <div className="[&>div]:grid-cols-1 [&>div]:pl-0">
                <QuestionTypeSettings
                    question={question}
                    id={id}
                    name={id}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
