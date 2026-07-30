import PageHeader from '@/components/custom/layout/page-header'

import { GlobalReport } from './global-report'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Globální report' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <GlobalReport />
            </div>
        </>
    )
}
