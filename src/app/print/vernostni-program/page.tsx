import { VernostniProgram } from '@/app/(sidebar)/vernostni-program/vernostni-program'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Věrnostní program',
    description: 'Vývoj počtu bodů ve věrnostním programu po měsících.',
    body: <VernostniProgram />,
}

export default function PrintVernostniProgramPage() {
    return <PrintShell {...printPageSettings} />
}
