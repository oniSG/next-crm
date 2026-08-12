import { OverviewTab } from '@/app/(sidebar)/alumni-dashboard/tabs/overview-tab'
import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Alumni dashboard – Přehled',
    description: 'Alumni dashboard.',
    body: (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard title="Alumni dashboard" />
            <OverviewTab />
        </div>
    ),
}

export default function PrintAlumniDashboardPage() {
    return <PrintShell {...printPageSettings} />
}
