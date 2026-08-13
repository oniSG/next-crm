import PageHeader from '@/components/custom/layout/page-header'

import { AlumniPrehled } from './alumni-prehled'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <AlumniPrehled />
            </div>
        </>
    )
}
