import { ReportMembership } from '@/app/(sidebar)/report-membership/report-membership'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Membership',
    description: 'Statistiky členství podle typu platby a objednávky.',
    body: <ReportMembership />,
}

export default function PrintMembershipReportPage() {
    return <PrintShell {...printPageSettings} />
}
