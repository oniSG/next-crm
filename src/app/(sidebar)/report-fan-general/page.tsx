import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { PeriodProvider } from './report-utils'
import { ReportFanGeneral } from './report-fan-general'

export default function Page() {
    return (
        <PeriodProvider>
            <PageHeader breadcrumbs={[{ label: 'Global analytics' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportFanGeneral />
            </div>
        </PeriodProvider>
    )
}
