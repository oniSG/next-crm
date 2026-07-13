import { PrehledSms } from '@/app/(sidebar)/prehled_sms/prehled_sms'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled SMS',
    description: 'Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících.',
    body: <PrehledSms />,
}

export default function PrintPrehledSmsPage() {
    return <PrintShell {...printPageSettings} />
}
