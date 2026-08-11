import { ReportManagement } from '@/app/(sidebar)/report-management/report-management'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Manažerský report',
    description: 'Přehled návštěvníků, ticketingu, komunikace a business metrik.',
    body: <ReportManagement />,
}

export default function PrintManagementReportPage() {
    return <PrintShell {...printPageSettings} />
}
