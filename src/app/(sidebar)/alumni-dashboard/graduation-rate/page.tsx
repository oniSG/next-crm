import PageHeader from '@/components/custom/layout/page-header'

import { AlumniDashboard } from '../alumni-dashboard'
import { PageActions } from '../page-actions'
import { GraduationRateTab } from '../tabs/graduation-rate-tab'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Alumni dashboard' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <AlumniDashboard>
                    <GraduationRateTab />
                </AlumniDashboard>
            </div>
        </>
    )
}
