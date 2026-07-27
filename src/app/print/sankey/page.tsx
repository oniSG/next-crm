import { SankeyPage } from '@/app/(sidebar)/sankey/sankey'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Sankey',
    description: 'Tok kampaně od odeslání po konverzi.',
    body: <SankeyPage />,
}

export default function PrintSankeyPage() {
    return <PrintShell {...printPageSettings} />
}
