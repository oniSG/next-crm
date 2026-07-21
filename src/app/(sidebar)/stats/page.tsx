import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { Stats } from './stats'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <Stats />
            </div>
        </>
    )
}
