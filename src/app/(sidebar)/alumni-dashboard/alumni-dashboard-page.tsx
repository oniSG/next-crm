import type { ReactNode } from 'react'

import PageHeader from '@/components/custom/layout/page-header'

import { AlumniDashboard } from './alumni-dashboard'

type AlumniDashboardPageProps = {
    children: ReactNode
    actions: ReactNode
}

export function AlumniDashboardPage({
    children,
    actions,
}: AlumniDashboardPageProps) {
    return (
        <>
            <PageHeader breadcrumbs={[{ label: 'Alumni dashboard' }]}>
                {actions}
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <AlumniDashboard>{children}</AlumniDashboard>
            </div>
        </>
    )
}
