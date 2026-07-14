import { StatsSms } from '@/app/(sidebar)/stats-sms/stats-sms'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Statistiky SMS',
    description: 'Doručeno, rozkliknuto, nedoručeno a odhlášeno po měsících.',
    body: <StatsSms />,
}

export default function PrintStatsSmsPage() {
    return <PrintShell {...printPageSettings} />
}
