import { PrehledPush } from '@/app/(sidebar)/prehled_push/prehled_push'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled push',
    description: 'Doručeno a nedoručeno po měsících.',
    body: <PrehledPush />,
}

export default function PrintPrehledPushPage() {
    return <PrintShell {...printPageSettings} />
}
