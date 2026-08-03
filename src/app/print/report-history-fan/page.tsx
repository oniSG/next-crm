import { ReportHistoryFan } from '@/app/(sidebar)/report-history-fan/report-history-fan'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Fan history',
    description: 'Overview of fan history.',
    body: <ReportHistoryFan />,
}

export default function PrintReportHistoryFanPage() {
    return <PrintShell {...printPageSettings} />
}
