'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

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

    return (
        <div className="flex w-full flex-col gap-10">
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
                <Button>{initialData ? 'Save changes' : 'Create'}</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </div>
    )
}
