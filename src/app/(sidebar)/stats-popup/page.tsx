import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { StatsPopup } from './stats-popup'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky popup' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <StatsPopup />
            </div>
        </>
    )
}
