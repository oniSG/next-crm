import { ReportFanGeneral } from '@/app/(sidebar)/report-fan-general/report-fan-general'
import { PeriodProvider } from '@/app/(sidebar)/report-fan-general/report-utils'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Global analytics',
    description: 'Přehled metrik e-mailu, SMS a push notifikací.',
    body: (
        <PeriodProvider>
            <ReportFanGeneral />
        </PeriodProvider>
    ),
}

export default function PrintReportFanGeneralPage() {
    return <PrintShell {...printPageSettings} />
}
