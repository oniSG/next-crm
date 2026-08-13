import PageHeader from '@/components/custom/layout/page-header'
import { NavTabs } from '@/components/custom/layout/nav-tabs'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { ALUMNI_DASHBOARD_TABS } from '../data'
import { AlumniTab } from './alumni-tab'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Alumni dashboard' }]}>
                <PageActions />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <div className="flex w-full max-w-6xl flex-col gap-4">
                    <ReportHeaderCard title="Alumni dashboard" />
                    <NavTabs items={ALUMNI_DASHBOARD_TABS} />
                    <div className="flex flex-col gap-4">
                        <AlumniTab />
                    </div>
                </div>
            </div>
        </>
    )
}
