import { ReportBusiness } from '@/app/(sidebar)/report-business/report-business'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Business',
    description:
        'Přehled obchodních případů, reklamních ploch a typu obchodu.',
    body: <ReportBusiness />,
}

export default function PrintBusinessReportPage() {
    return <PrintShell {...printPageSettings} />
}
