import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { PrehledSms } from './prehled-sms'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled SMS' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <PrehledSms />
            </div>
        </>
    )
}
