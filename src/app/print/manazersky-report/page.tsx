import { ManazerskyReport } from '@/app/(sidebar)/manazersky-report/manazersky-report'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Manažerský report',
    description: 'Přehled klíčových manažerských metrik.',
    body: <ManazerskyReport />,
}

export default function PrintManazerskyReportPage() {
    return <PrintShell {...printPageSettings} />
}
