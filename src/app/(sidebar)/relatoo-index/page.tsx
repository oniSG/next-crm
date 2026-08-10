import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { RelatooIndex } from './relatoo-index'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Postřehy relatoo' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <RelatooIndex />
            </div>
        </>
    )
}
