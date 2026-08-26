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
    thankYouSelected?: boolean
    thankYouTitle: string
    thankYouDescription: string
    showThankYouLogo: boolean
    thankYouLinkText: string
    thankYouLinkUrl: string
    onQuestionChange: (values: Partial<SurveyQuestion>) => void
    onSectionNameChange: (sectionId: string, name: string) => void
    onThankYouTitleChange: (thankYouTitle: string) => void
    onThankYouDescriptionChange: (thankYouDescription: string) => void
    onShowThankYouLogoChange: (showThankYouLogo: boolean) => void
    onThankYouLinkTextChange: (thankYouLinkText: string) => void
    onThankYouLinkUrlChange: (thankYouLinkUrl: string) => void
}

export function DetailSettingsColumn({
    selection,
    sectionSelection,
    thankYouSelected,
    thankYouTitle,
    thankYouDescription,
    showThankYouLogo,
    thankYouLinkText,
    thankYouLinkUrl,
    onClose,
    onQuestionChange,
    onSectionNameChange,
    onThankYouTitleChange,
    onThankYouDescriptionChange,
    onShowThankYouLogoChange,
    onThankYouLinkTextChange,
    onThankYouLinkUrlChange,
}: DetailProps & { onClose: () => void }) {
    return (
        <div>
            <DetailHeader
                selection={selection}
                thankYouSelected={thankYouSelected}
                onClose={onClose}
                showCloseButton
            />
            <div className="p-4 pb-24">
                <DetailContent
                    panelId="detail-column"
                    selection={selection}
                    sectionSelection={sectionSelection}
                    thankYouSelected={thankYouSelected}
                    thankYouTitle={thankYouTitle}
                    thankYouDescription={thankYouDescription}
                    showThankYouLogo={showThankYouLogo}
                    thankYouLinkText={thankYouLinkText}
                    thankYouLinkUrl={thankYouLinkUrl}
                    onQuestionChange={onQuestionChange}
                    onSectionNameChange={onSectionNameChange}
                    onThankYouTitleChange={onThankYouTitleChange}
                    onThankYouDescriptionChange={onThankYouDescriptionChange}
                    onShowThankYouLogoChange={onShowThankYouLogoChange}
                    onThankYouLinkTextChange={onThankYouLinkTextChange}
                    onThankYouLinkUrlChange={onThankYouLinkUrlChange}
                />
            </div>
        </div>
    )
}

export function DetailSettingsSheet({
    open,
    selection,
    sectionSelection,
    thankYouSelected,
    thankYouTitle,
    thankYouDescription,
    showThankYouLogo,
    thankYouLinkText,
    thankYouLinkUrl,
    onOpenChange,
    onQuestionChange,
    onSectionNameChange,
    onThankYouTitleChange,
    onThankYouDescriptionChange,
    onShowThankYouLogoChange,
    onThankYouLinkTextChange,
    onThankYouLinkUrlChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
} & DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md lg:hidden">
                <DetailHeader
                    selection={selection}
                    thankYouSelected={thankYouSelected}
                    sheet
                />
                <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-24">
                    <DetailContent
                        panelId="detail-sheet"
                        selection={selection}
                        sectionSelection={sectionSelection}
                        thankYouSelected={thankYouSelected}
                        thankYouTitle={thankYouTitle}
                        thankYouDescription={thankYouDescription}
                        showThankYouLogo={showThankYouLogo}
                        thankYouLinkText={thankYouLinkText}
                        thankYouLinkUrl={thankYouLinkUrl}
                        onQuestionChange={onQuestionChange}
                        onSectionNameChange={onSectionNameChange}
                        onThankYouTitleChange={onThankYouTitleChange}
                        onThankYouDescriptionChange={onThankYouDescriptionChange}
                        onShowThankYouLogoChange={onShowThankYouLogoChange}
                        onThankYouLinkTextChange={onThankYouLinkTextChange}
                        onThankYouLinkUrlChange={onThankYouLinkUrlChange}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

function DetailHeader({
    selection,
    thankYouSelected,
    onClose,
    showCloseButton = false,
    sheet = false,
}: {
    selection?: QuestionSelection
    thankYouSelected?: boolean
    onClose?: () => void
    showCloseButton?: boolean
    sheet?: boolean
}) {
    const content = (
        <>
            <div className="min-w-0">
                {sheet ? (
                    <SheetTitle>
                        {selection
                            ? 'Question settings'
                            : thankYouSelected
                              ? 'Thank you page settings'
                              : 'Section settings'}
                    </SheetTitle>
                ) : (
                    <h2 className="font-heading text-base font-medium">
                        {selection
                            ? 'Question settings'
                            : thankYouSelected
                              ? 'Thank you page settings'
                              : 'Section settings'}
                    </h2>
                )}
                {sheet ? (
                    <SheetDescription>
                        {selection
                            ? `${selection.sectionName} · Edit the selected question.`
                            : thankYouSelected
                              ? 'Edit the message shown after submission.'
                              : 'Edit the selected section.'}
                    </SheetDescription>
                ) : (
                    <p className="text-muted-foreground text-sm">
                        {selection
                            ? `${selection.sectionName} · Edit the selected question.`
                            : thankYouSelected
                              ? 'Edit the message shown after submission.'
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
    thankYouSelected,
    thankYouTitle,
    thankYouDescription,
    showThankYouLogo,
    thankYouLinkText,
    thankYouLinkUrl,
    onQuestionChange,
    onSectionNameChange,
    onThankYouTitleChange,
    onThankYouDescriptionChange,
    onShowThankYouLogoChange,
    onThankYouLinkTextChange,
    onThankYouLinkUrlChange,
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
            {thankYouSelected && !selection && !sectionSelection && (
                <div className="space-y-7">
                    <div className="space-y-5">
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-thank-you-title`}>
                                Thank you title <RequiredIndicator />
                            </FieldLabel>
                            <Input
                                id={`${panelId}-thank-you-title`}
                                value={thankYouTitle}
                                required
                                onChange={(event) =>
                                    onThankYouTitleChange(event.target.value)
                                }
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-thank-you-description`}>
                                Thank you description <RequiredIndicator />
                            </FieldLabel>
                            <Textarea
                                id={`${panelId}-thank-you-description`}
                                value={thankYouDescription}
                                required
                                onChange={(event) =>
                                    onThankYouDescriptionChange(event.target.value)
                                }
                            />
                        </Field>
                        <Field orientation="horizontal">
                            <FieldLabel htmlFor={`${panelId}-thank-you-logo`}>
                                Show logo
                            </FieldLabel>
                            <Switch
                                id={`${panelId}-thank-you-logo`}
                                checked={showThankYouLogo}
                                onCheckedChange={onShowThankYouLogoChange}
                            />
                        </Field>
                    </div>
                    <Separator />
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold">Link</h3>
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-thank-you-link-text`}>
                                Link text
                                {thankYouLinkUrl.trim() && <RequiredIndicator />}
                            </FieldLabel>
                            <Input
                                id={`${panelId}-thank-you-link-text`}
                                value={thankYouLinkText}
                                required={Boolean(thankYouLinkUrl.trim())}
                                onChange={(event) =>
                                    onThankYouLinkTextChange(event.target.value)
                                }
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`${panelId}-thank-you-link-url`}>
                                URL
                                {thankYouLinkText.trim() && <RequiredIndicator />}
                            </FieldLabel>
                            <Input
                                id={`${panelId}-thank-you-link-url`}
                                type="url"
                                value={thankYouLinkUrl}
                                required={Boolean(thankYouLinkText.trim())}
                                onChange={(event) =>
                                    onThankYouLinkUrlChange(event.target.value)
                                }
                            />
                        </Field>
                    </section>
                </div>
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
