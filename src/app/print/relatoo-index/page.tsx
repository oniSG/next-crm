import { RelatooIndex } from '@/app/(sidebar)/relatoo-index/relatoo-index'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Relatoo index',
    description: 'Detailní přehled Relatoo indexu.',
    body: <RelatooIndex />,
}

export default function PrintRelatooIndexPage() {
    return <PrintShell {...printPageSettings} />
}
