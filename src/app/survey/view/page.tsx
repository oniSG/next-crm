import { SurveyPreview } from '@/components/custom/survey/survey-preview'

import { SURVEY_VIEW_DATA } from './data'

export default function Page() {
    return (
        <main className="bg-muted/25 flex min-h-screen justify-center px-4 py-8">
            <form className="w-full max-w-3xl">
                <SurveyPreview survey={SURVEY_VIEW_DATA} />
            </form>
        </main>
    )
}
