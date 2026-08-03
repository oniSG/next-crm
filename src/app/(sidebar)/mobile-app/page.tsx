import PageHeader from '@/components/custom/layout/page-header'

import { MobileApp } from './mobile-app'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Mobile app' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <MobileApp />
            </div>
        </>
    )
}
