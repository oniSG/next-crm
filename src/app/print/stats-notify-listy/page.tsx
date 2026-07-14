import { StatsNotifyListy } from '@/app/(sidebar)/stats-notify-listy/stats-notify-listy'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky notifikační lišty',
    description: 'Doručeno po měsících.',
    body: <StatsNotifyListy />,
}

export default function PrintStatsNotifyListyPage() {
    return <PrintShell {...printPageSettings} />
}
