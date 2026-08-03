import PageHeader from '@/components/custom/layout/page-header'

import { REPORT_EVENT } from './data'
import { EventReport } from './event-report'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { label: 'Event report' },
                    { label: REPORT_EVENT.name },
                ]}
            >
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <EventReport />
            </div>
        </>
    )
}
