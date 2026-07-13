import PageHeader from '@/components/custom/layout/page-header'

import { PrehledSms } from './prehled_sms'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Přehled SMS' }]} />
            <div className="flex w-full justify-center p-3">
                <PrehledSms />
            </div>
        </>
    )
}
