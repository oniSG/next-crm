import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportBusiness } from './report-business'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Business' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportBusiness />
            </div>
        </>
    )
}
