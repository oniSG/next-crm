import { ReportLoyaltyProgram } from '@/app/(sidebar)/report-loyalty-program/report-loyalty-program'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Loyalty program',
    description: 'Overview of the loyalty program.',
    body: <ReportLoyaltyProgram />,
}

export default function PrintReportLoyaltyProgramPage() {
    return <PrintShell {...printPageSettings} />
}
