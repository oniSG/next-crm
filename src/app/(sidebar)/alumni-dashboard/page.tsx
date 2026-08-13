import { AlumniDashboardPage } from './alumni-dashboard-page'
import { PageActions } from './page-actions'
import { OverviewTab } from './tabs/overview-tab'

export default function Page() {
    return (
        <AlumniDashboardPage actions={<PageActions />}>
            <OverviewTab />
        </AlumniDashboardPage>
    )
}
