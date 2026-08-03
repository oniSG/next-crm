import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportLoyaltyProgram } from './report-loyalty-program'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Loyalty program' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportLoyaltyProgram />
            </div>
        </>
    )
}
