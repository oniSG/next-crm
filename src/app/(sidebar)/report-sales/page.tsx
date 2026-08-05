import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { ReportSales } from './report-sales'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Prodeje' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportSales />
            </div>
        </>
    )
}
