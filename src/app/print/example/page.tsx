import { ExampleDashboard } from '@/app/(sidebar)/example/example-dashboard'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Example — katalog komponent',
    description:
        'Ukázka všeho, co umíme použít v custom dashboardu: filtry, KPI, grafy, tabulky a export.',
    body: <ExampleDashboard />,
}

export default function PrintExamplePage() {
    return <PrintShell {...printPageSettings} />
}
