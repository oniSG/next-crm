import { Alumni } from '@/app/(sidebar)/alumni/alumni'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Alumni',
    description: 'Struktura alumni podle vzdělání, oborů a univerzit.',
    body: <Alumni />,
}

export default function PrintAlumniPage() {
    return <PrintShell {...printPageSettings} />
}
