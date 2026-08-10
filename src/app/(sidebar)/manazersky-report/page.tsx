import PageHeader from '@/components/custom/layout/page-header'

import { ManazerskyReport } from './manazersky-report'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Manažerský report' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ManazerskyReport />
            </div>
        </>
    )
}
