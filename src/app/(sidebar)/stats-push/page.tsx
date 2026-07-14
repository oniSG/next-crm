import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { StatsPush } from './stats-push'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky push' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <StatsPush />
            </div>
        </>
    )
}
