import { FunnelChartPage } from '@/app/(sidebar)/funnel-chart/funnel-chart'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Funnel chart',
    description: 'Přehled konverzního trychtýře od zobrazení po objednávku.',
    body: <FunnelChartPage />,
}

export default function PrintFunnelChartPage() {
    return <PrintShell {...printPageSettings} />
}
