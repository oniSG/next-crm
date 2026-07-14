import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { PrehledPopup } from './prehled-popup'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled popup' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <PrehledPopup />
            </div>
        </>
    )
}
