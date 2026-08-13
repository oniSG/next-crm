import { AlumniDashboardPage } from '../alumni-dashboard-page'
import { AlumniTab } from '../tabs/alumni-tab'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <AlumniDashboardPage actions={<PageActions />}>
            <AlumniTab />
        </AlumniDashboardPage>
    )
}
