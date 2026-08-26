import type { SurveyFormData } from '@/app/(sidebar)/survey/temp'

import surveyViewData from './data.json'
import { SurveyView } from './survey-view'

export default function Page() {
    const survey = surveyViewData as SurveyFormData

    return <SurveyView survey={survey} />
}
