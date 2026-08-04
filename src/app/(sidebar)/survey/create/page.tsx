import { EyeIcon } from 'lucide-react'

import PageHeader from '@/components/custom/layout/page-header'
import { Button } from '@/components/ui/button'

import SurveyForm from '../survey-form'

export default function Page() {
    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { label: 'Surveys', href: '/survey' },
                    { label: 'Create survey' },
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
                <SurveyForm />
            </div>
        </>
    )
}
