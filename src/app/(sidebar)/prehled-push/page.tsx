import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { PrehledPush } from './prehled_push'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled push' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <PrehledPush />
            </div>
        </>
    )
}
