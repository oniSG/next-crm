import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportMembership } from './report-membership'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Membership' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportMembership />
            </div>
        </>
    )
}
