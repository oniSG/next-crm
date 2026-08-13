import { AlumniAktivniHraci } from '@/app/(sidebar)/alumni-aktivni-hraci/alumni-aktivni-hraci'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Aktivní hráči',
    description: 'Přehled aktivních hráčů a jejich vzdělání.',
    body: <AlumniAktivniHraci />,
}

export default function PrintAlumniAktivniHraciPage() {
    return <PrintShell {...printPageSettings} />
}
