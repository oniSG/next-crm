import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportGdprChange } from './report-gdpr-change'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'GDPR changes' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportGdprChange />
            </div>
        </>
    )
}
