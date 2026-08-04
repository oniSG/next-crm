'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { SurveySectionsEditor } from './survey-sections-editor'
import { SurveySettings } from './survey-settings'
import { useSurveyBuilder } from './use-survey-builder'

export default function SurveyForm() {
    const [expireDate, setExpireDate] = useState('')
    const [sharePublicly, setSharePublicly] = useState(false)
    const [surveyColor, setSurveyColor] = useState('#7EC71E')
    const {
        sections,
        openSectionIds,
        addSection,
        removeSection,
        setSectionOpen,
        closeSections,
        reorderSections,
    } = useSurveyBuilder()

    function changeExpireDate(value: string) {
        setExpireDate(value)
        if (!value) setSharePublicly(false)
    }

    return (
        <div className="flex w-full flex-col gap-10">
            <SurveySettings
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
                onAdd={addSection}
                onRemove={removeSection}
                onOpenChange={setSectionOpen}
                onDragStart={closeSections}
                onDragEnd={reorderSections}
            />
            <div className="flex gap-2">
                <Button>Create</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </div>
    )
}
