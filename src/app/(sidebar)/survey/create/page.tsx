import { SurveyEditorWorkspace } from '../survey-editor-workspace'
import { createDefaultSurveyData, getTodayDateInputValue } from '../survey-utils'

export default function Page() {
    return (
        <SurveyEditorWorkspace
            initialData={createDefaultSurveyData()}
            mode="create"
            previewDate={getTodayDateInputValue()}
        />
    )
}
