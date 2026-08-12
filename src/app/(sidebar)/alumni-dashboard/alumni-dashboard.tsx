import type { ReactNode } from 'react'

import { NavTabs } from '@/components/custom/layout/nav-tabs'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { ALUMNI_DASHBOARD_TABS } from './data'

type AlumniDashboardProps = {
    children: ReactNode
}

export function AlumniDashboard({ children }: AlumniDashboardProps) {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard title="Alumni dashboard" />
            <NavTabs items={ALUMNI_DASHBOARD_TABS} />
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    )
}
