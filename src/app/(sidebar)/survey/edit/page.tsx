import Link from 'next/link'

import PageHeader from '@/components/custom/layout/page-header'
import { buttonVariants } from '@/components/ui/button'

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
                <Link
                    className={buttonVariants({ variant: 'outline' })}
                    href="/survey/preview"
                >
                    Preview survey
                </Link>
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <SurveyForm initialData={EDIT_SURVEY_DATA} />
            </div>
        </>
    )
}
