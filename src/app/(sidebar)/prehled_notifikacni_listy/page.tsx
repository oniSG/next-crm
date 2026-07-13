import PageHeader from '@/components/custom/layout/page-header'

import { PrehledNotifikacniListy } from './prehled_notifikacni_listy'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled notifikační lišty' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <PrehledNotifikacniListy />
            </div>
        </>
    )
}
