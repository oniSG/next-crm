import { ReportGdprChange } from '@/app/(sidebar)/report-gdpr-change/report-gdpr-change'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'GDPR changes',
    description: 'Overview of GDPR changes.',
    body: <ReportGdprChange />,
}

export default function PrintReportGdprChangePage() {
    return <PrintShell {...printPageSettings} />
}
