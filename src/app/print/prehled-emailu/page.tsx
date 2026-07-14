import { PrehledEmailu } from '@/app/(sidebar)/prehled-emailu/prehled_emailu'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled e-mailů',
    description: 'Doručeno, otevřeno, kliknuto a doručitelnost po měsících.',
    body: <PrehledEmailu />,
}

export default function PrintPrehledEmailuPage() {
    return <PrintShell {...printPageSettings} />
}
