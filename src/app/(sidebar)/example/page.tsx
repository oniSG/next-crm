import PageHeader from '@/components/custom/layout/page-header'

import { ExampleDashboard } from './example-dashboard'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Example' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ExampleDashboard />
            </div>
        </>
    )
}
