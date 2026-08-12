import PageHeader from '@/components/custom/layout/page-header'

import { ReportEvent } from './report-event'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Report události' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportEvent />
            </div>
        </>
    )
}
