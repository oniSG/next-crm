import { StatsPush } from '@/app/(sidebar)/stats-push/stats-push'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky push',
    description: 'Doručeno a nedoručeno po měsících.',
    body: <StatsPush />,
}

export default function PrintStatsPushPage() {
    return <PrintShell {...printPageSettings} />
}
