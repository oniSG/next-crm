import PageHeader from '@/components/custom/layout/page-header'

import { FunnelChartPage } from './funnel-chart'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Funnel chart' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <FunnelChartPage />
            </div>
        </>
    )
}
