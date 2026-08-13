import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { SalesReport } from './sales-report'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Sales report' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <SalesReport />
            </div>
        </>
    )
}
