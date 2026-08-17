import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { PartnerSeasonTickets } from './partnerske-permanentky'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Partnerské permanentky' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <PartnerSeasonTickets />
            </div>
        </>
    )
}
