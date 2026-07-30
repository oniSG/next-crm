import PageHeader from '@/components/custom/layout/page-header'

import { ManagementReport } from './management-report'
import PageActions from './page-actions'
import { ReportPeriodProvider } from './report-period-context'

export default function Page() {
    return (
        <ReportPeriodProvider>
            <PageHeader breadcrumbs={[{ label: 'Managerial report' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ManagementReport />
            </div>
        </ReportPeriodProvider>
    )
}
