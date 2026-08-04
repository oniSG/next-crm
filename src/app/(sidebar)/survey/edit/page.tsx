import { EyeIcon } from 'lucide-react'

import PageHeader from '@/components/custom/layout/page-header'
import { Button } from '@/components/ui/button'

import SurveyForm from '../survey-form'
import { EDIT_SURVEY_DATA } from './data'

export default function Page() {
    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { label: 'Surveys', href: '/survey' },
                    { label: EDIT_SURVEY_DATA.name },
                ]}
            >
                <Button
                    type="submit"
                    form="survey-editor-form"
                    name="intent"
                    value="preview"
                    variant="outline"
                >
                    <EyeIcon />
                    Preview survey
                </Button>
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <SurveyForm initialData={EDIT_SURVEY_DATA} />
            </div>
        </>
    )
}
