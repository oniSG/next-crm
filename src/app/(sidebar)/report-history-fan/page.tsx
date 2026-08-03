import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportHistoryFan } from './report-history-fan'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Fan history' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportHistoryFan />
            </div>
        </>
    )
}
