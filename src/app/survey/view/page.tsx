import { SurveyPreview } from '@/components/custom/survey/survey-preview'
import type { SurveyFormData } from '@/app/(sidebar)/survey/temp'

import surveyViewData from './data.json'

export default function Page() {
    return (
        <main className="bg-muted/25 flex min-h-svh justify-center sm:px-4 sm:py-8">
            <form className="min-h-svh w-full max-w-3xl sm:min-h-0">
                <SurveyPreview
                    survey={surveyViewData as SurveyFormData}
                    fullScreenMobile
                />
            </form>
        </main>
    )
}
