'use client'

import { useState } from 'react'
import { SurveyPreview } from '@/components/custom/survey/survey-preview'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

import { buildSurveyPreviewData } from './survey-form-parser'
import { SurveySectionsEditor } from './survey-sections-editor'
import { SurveySettings } from './survey-settings'
import { createDefaultSurveyData } from './survey-utils'
import type { SurveyFormData } from './temp'
import { useSurveyBuilder } from './use-survey-builder'

export default function SurveyForm({ initialData }: { initialData?: SurveyFormData }) {
    const data = initialData ?? createDefaultSurveyData()
    const [expireDate, setExpireDate] = useState(data.expireDate)
    const [sharePublicly, setSharePublicly] = useState(data.sharePublicly)
    const [surveyColor, setSurveyColor] = useState(data.color)
    const [previewData, setPreviewData] = useState<SurveyFormData | null>(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const {
        sections,
        openSectionIds,
        addSection,
        removeSection,
        setSectionOpen,
        closeSections,
        reorderSections,
    } = useSurveyBuilder(data.sections)

    function changeExpireDate(value: string) {
        setExpireDate(value)
        if (!value) setSharePublicly(false)
    }

    function openPreview(form: HTMLFormElement) {
        setPreviewData(buildSurveyPreviewData(form, data))
        setPreviewOpen(true)
    }

    return (
        <form
            id="survey-editor-form"
            className="flex w-full flex-col gap-10"
            onSubmit={(event) => {
                const submitter = event.nativeEvent.submitter

                if (
                    submitter instanceof HTMLButtonElement &&
                    submitter.value === 'preview'
                ) {
                    event.preventDefault()
                    openPreview(event.currentTarget)
                }
            }}
        >
            <SurveySettings
                initialData={data}
                expireDate={expireDate}
                sharePublicly={sharePublicly}
                onExpireDateChange={changeExpireDate}
                onSharePubliclyChange={setSharePublicly}
                onSurveyColorChange={setSurveyColor}
            />
            <SurveySectionsEditor
                sections={sections}
                openSectionIds={openSectionIds}
                surveyColor={surveyColor}
                lockQuestionType={Boolean(initialData)}
                onAdd={addSection}
                onRemove={removeSection}
                onOpenChange={setSectionOpen}
                onDragStart={closeSections}
                onDragEnd={reorderSections}
            />
            <div className="flex justify-end gap-2">
                <Button type="submit">{initialData ? 'Save changes' : 'Create'}</Button>
                <Button type="button" variant="outline">
                    Cancel
                </Button>
            </div>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="bg-muted/25 max-h-[92vh] overflow-y-auto p-4 sm:max-w-5xl">
                    <DialogTitle className="sr-only">Survey preview</DialogTitle>
                    {previewData && (
                        <SurveyPreview survey={previewData} className="mx-auto" />
                    )}
                </DialogContent>
            </Dialog>
        </form>
    )
}
