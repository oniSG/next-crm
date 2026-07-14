import { StatsEmail } from '@/app/(sidebar)/stats-email/stats-email'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky e-mailů',
    description: 'Doručeno, otevřeno, kliknuto a doručitelnost po měsících.',
    body: <StatsEmail />,
}

export default function PrintStatsEmailPage() {
    return <PrintShell {...printPageSettings} />
}
