import { AlumniDashboardPage } from '../alumni-dashboard-page'
import { GraduationRateTab } from '../tabs/graduation-rate-tab'
import { PageActions } from './page-actions'

export default function Page() {
    return (
        <AlumniDashboardPage actions={<PageActions />}>
            <GraduationRateTab />
        </AlumniDashboardPage>
    )
}
