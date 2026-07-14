import { PrehledNotifikacniListy } from '@/app/(sidebar)/prehled-notifikacni-listy/prehled-notifikacni-listy'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled notifikační lišty',
    description: 'Doručeno po měsících.',
    body: <PrehledNotifikacniListy />,
}

export default function PrintPrehledNotifikacniListyPage() {
    return <PrintShell {...printPageSettings} />
}
