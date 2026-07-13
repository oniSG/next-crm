import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { StatsSms } from './stats_sms'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky SMS' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <StatsSms />
            </div>
        </>
    )
}
