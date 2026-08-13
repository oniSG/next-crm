import PageHeader from '@/components/custom/layout/page-header'

import { AlumniAktivniHraci } from './alumni-aktivni-hraci'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Aktivní hráči' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <AlumniAktivniHraci />
            </div>
        </>
    )
}
