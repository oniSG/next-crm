import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { StatsEmail } from './stats_email'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky e-mailů' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <StatsEmail />
            </div>
        </>
    )
}
