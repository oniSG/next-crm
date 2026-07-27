import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { SankeyPage } from './sankey'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Sankey' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <SankeyPage />
            </div>
        </>
    )
}
