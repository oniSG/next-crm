import { RelatooIndex } from '@/app/(sidebar)/relatoo-index/relatoo-index'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Postřehy relatoo',
    description: 'Relatoo index a expertní přehledy odesílání e-mailů.',
    body: <RelatooIndex />,
}

export default function PrintRelatooIndexPage() {
    return <PrintShell {...printPageSettings} />
}
