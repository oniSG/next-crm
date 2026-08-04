'use client'

import type { CSSProperties, ReactNode } from 'react'
import { CalendarIcon, ImageIcon } from 'lucide-react'

import type { SurveyFormData, SurveyQuestion } from '@/app/(sidebar)/survey/temp'
import { AnswerGridInput } from '@/components/custom/inputs/answer-grid-input'
import { LinearScaleInput } from '@/components/custom/inputs/linear-scale-input'
import { SelectionInput } from '@/components/custom/inputs/selection-input'
import { StarRatingInput } from '@/components/custom/inputs/star-rating-input'
import { Button } from '@/components/ui/button'
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

export function SurveyPreview({
    survey,
    showSubmit = true,
    className,
}: {
    survey: SurveyFormData
    showSubmit?: boolean
    className?: string
}) {
    return (
        <div
            className={cn('w-full max-w-3xl', className)}
            style={
                {
                    '--survey-color': survey.color,
                    '--primary': survey.color,
                } as CSSProperties
            }
        >
            <Card className="shadow-sm">
                <CardHeader
                    className="-mt-(--card-spacing) border-b py-6"
                    style={{
                        backgroundColor:
                            'color-mix(in srgb, var(--survey-color) 10%, transparent)',
                    }}
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
                <CardContent className="space-y-10 py-2">
                    {survey.sections.map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-10">
                            {sectionIndex > 0 && <Separator />}
                            <SurveySection
                                title={section.name}
                                sectionNumber={sectionIndex + 1}
                            >
                                {section.questions.map((question) => (
                                    <Question
                                        key={question.id}
                                        title={question.name}
                                        description={question.description}
                                        required={question.required}
                                    >
                                        <QuestionInput
                                            question={question}
                                            name={`answers[${section.id}][${question.id}]`}
                                        />
                                    </Question>
                                ))}
                            </SurveySection>
                        </div>
                    ))}
                    {showSubmit && (
                        <>
                            <Separator />
                            <div className="flex items-center justify-end gap-3">
                                {survey.showLogo && <PlaceholderLogo />}
                                <Button type="submit">Submit survey</Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

function SurveySection({
    title,
    sectionNumber,
    children,
}: {
    title: string
    sectionNumber: number
    children: ReactNode
}) {
    return (
        <section className="space-y-5">
            <div className="flex items-center gap-3">
                <span
                    className="flex size-7 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: 'var(--survey-color)' }}
                >
                    {sectionNumber}
                </span>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    )
}

function QuestionInput({ question, name }: { question: SurveyQuestion; name: string }) {
    switch (question.type) {
        case 'text':
            return (
                <Input
                    name={name}
                    placeholder="Enter your answer"
                    required={question.required}
                />
            )
        case 'date':
            return <Input name={name} type="date" required={question.required} />
        case 'rating':
            return (
                <StarRatingInput
                    name={name}
                    count={question.starCount}
                    required={question.required}
                />
            )
        case 'linear-scale':
            return (
                <LinearScaleInput
                    name={name}
                    count={question.rateCount}
                    startLabel={question.textStart}
                    endLabel={question.textEnd}
                    required={question.required}
                />
            )
        case 'selection':
            return (
                <SelectionInput
                    name={name}
                    multiple={question.multipleSelection}
                    required={question.required}
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
                    name={name}
                    rows={question.rows}
                    columns={question.columns}
                    multiple={question.checkMoreOptions}
                    required={question.required}
                />
            )
    }
}

function Question({
    title,
    description,
    required,
    children,
}: {
    title: string
    description: string
    required?: boolean
    children: ReactNode
}) {
    return (
        <Field className="bg-muted/20 rounded-xl border p-4">
            <FieldLabel className="text-base">
                {title}
                {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
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
