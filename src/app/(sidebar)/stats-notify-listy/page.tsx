import PageHeader from '@/components/custom/layout/page-header'

import { PageActions } from './page-actions'
import { StatsNotifyListy } from './stats-notify-listy'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Statistiky notifikační lišty' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <StatsNotifyListy />
            </div>
        </>
    )
}
