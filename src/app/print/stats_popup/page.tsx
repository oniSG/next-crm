import { StatsPopup } from '@/app/(sidebar)/stats_popup/stats_popup'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky popup',
    description: 'Doručeno po měsících.',
    body: <StatsPopup />,
}

export default function PrintStatsPopupPage() {
    return <PrintShell {...printPageSettings} />
}
