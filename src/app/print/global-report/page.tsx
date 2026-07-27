import { GlobalReport } from '@/app/(sidebar)/global-report/global-report'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Globální report',
    description: 'Přehled všech metrik po měsících.',
    body: <GlobalReport />,
}

export default function PrintGlobalReportPage() {
    return <PrintShell {...printPageSettings} />
}
