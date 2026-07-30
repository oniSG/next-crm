import { ManagementReport } from '@/app/(sidebar)/report-management/management-report'
import { ReportPeriodProvider } from '@/app/(sidebar)/report-management/report-period-context'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Managerial report',
    description: 'Overview of audience, ticketing, communication and business metrics.',
    body: (
        <ReportPeriodProvider>
            <ManagementReport />
        </ReportPeriodProvider>
    ),
}

export default function PrintManagementReportPage() {
    return <PrintShell {...printPageSettings} />
}
