import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportManagement } from './report-management'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Managerial report' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportManagement />
            </div>
        </>
    )
}
