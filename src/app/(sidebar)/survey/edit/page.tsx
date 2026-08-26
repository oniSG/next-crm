import { SurveyEditorWorkspace } from '../survey-editor-workspace'
import { getTodayDateInputValue } from '../survey-utils'
import type { SurveyFormData } from '../temp'
import editSurveyData from './data.json'

export default function Page() {
    return (
        <SurveyEditorWorkspace
            initialData={editSurveyData as SurveyFormData}
            mode="edit"
            previewDate={getTodayDateInputValue()}
        />
    )
}
