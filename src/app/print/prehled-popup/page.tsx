import { PrehledPopup } from '@/app/(sidebar)/prehled-popup/prehled-popup'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled popup',
    description: 'Doručeno po měsících.',
    body: <PrehledPopup />,
}

export default function PrintPrehledPopupPage() {
    return <PrintShell {...printPageSettings} />
}
