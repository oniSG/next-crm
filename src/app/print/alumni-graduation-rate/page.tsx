import { AlumniGraduationRate } from '@/app/(sidebar)/alumni-graduation-rate/alumni-graduation-rate'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Graduation rate',
    description: 'Přehled úspěšnosti dokončení studia.',
    body: <AlumniGraduationRate />,
}

export default function PrintAlumniGraduationRatePage() {
    return <PrintShell {...printPageSettings} />
}
