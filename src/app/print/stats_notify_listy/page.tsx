import { StatsNotifyListy } from '@/app/(sidebar)/stats_notify_listy/stats_notify_listy'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky notifikační lišty',
    description: 'Doručeno po měsících.',
    body: <StatsNotifyListy />,
}

export default function PrintStatsNotifyListyPage() {
    return <PrintShell {...printPageSettings} />
}
