import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportTicketing } from './report-ticketing'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Ticketing' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportTicketing />
            </div>
        </>
    )
}
