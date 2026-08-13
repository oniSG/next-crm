import { AlumniDashboardPage } from '../alumni-dashboard-page'
import { ActivePlayersTab } from '../tabs/active-players-tab'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <AlumniDashboardPage actions={<PageActions />}>
            <ActivePlayersTab />
        </AlumniDashboardPage>
    )
}
