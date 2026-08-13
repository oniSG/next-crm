import { AlumniPrehled } from '@/app/(sidebar)/alumni-prehled/alumni-prehled'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Přehled',
    description: 'Souhrn alumni dat a klíčových ukazatelů.',
    body: <AlumniPrehled />,
}

export default function PrintAlumniPrehledPage() {
    return <PrintShell {...printPageSettings} />
}
