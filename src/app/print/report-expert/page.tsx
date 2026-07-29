import { ReportExpert } from '@/app/(sidebar)/report-expert/report-expert'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Expert insights',
    description: 'Nejlepší čas na odesílání e-mailů a další expertní přehledy.',
    body: <ReportExpert />,
}

export default function PrintReportExpertPage() {
    return <PrintShell {...printPageSettings} />
}
