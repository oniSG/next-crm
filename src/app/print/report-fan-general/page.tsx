import { ReportFanGeneral } from '@/app/(sidebar)/report-fan-general/report-fan-general'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Globální report',
    description: 'Přehled metrik e-mailu, SMS a push notifikací.',
    body: <ReportFanGeneral />,
}

export default function PrintReportFanGeneralPage() {
    return <PrintShell {...printPageSettings} />
}
