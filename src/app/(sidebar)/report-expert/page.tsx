import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportExpert } from './report-expert'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Expert insights' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportExpert />
            </div>
        </>
    )
}
