import { Stats } from '@/app/(sidebar)/stats/stats'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky',
    description: 'Výsledky průzkumu — odpovědi respondentů podle otázek.',
    body: <Stats />,
}

export default function PrintStatsPage() {
    return <PrintShell {...printPageSettings} />
}
