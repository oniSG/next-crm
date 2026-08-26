'use client'

import { useState, type FormEvent } from 'react'

import {
    SurveyBackground,
    SurveyPreview,
} from '@/components/custom/survey/survey-preview'
import type { SurveyFormData } from '@/app/(sidebar)/survey/temp'

export function SurveyView({ survey }: { survey: SurveyFormData }) {
    const [submitted, setSubmitted] = useState(false)

    function submitSurvey(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <SurveyBackground
            as="main"
            survey={survey}
            className={`bg-muted/25 flex min-h-svh justify-center sm:px-4 sm:py-8 ${
                submitted ? 'items-center px-4 py-8' : ''
            }`}
        >
            {submitted ? (
                <div className="relative z-1 w-full max-w-[300px]">
                    <SurveyPreview
                        survey={survey}
                        showSubmit={false}
                        showThankYouPage
                        thankYouOnly
                        thankYouLinkActive
                    />
                </div>
            ) : (
                <form
                    className="relative z-1 min-h-svh w-full max-w-3xl sm:min-h-0"
                    onSubmit={submitSurvey}
                >
                    <SurveyPreview survey={survey} fullScreenMobile />
                </form>
            )}
        </SurveyBackground>
    )
}
