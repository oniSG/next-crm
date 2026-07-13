import { Stats } from '@/app/(sidebar)/stats/stats'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky',
    description: 'Rozložení kanálů a hodnocení 1–5 hvězdiček.',
    body: <Stats expanded />,
}

export default function PrintStatsPage() {
    return <PrintShell {...printPageSettings} />
}
