import { ExampleDashboard } from '@/app/(sidebar)/example/example-dashboard'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Example Dashboard',
    description: 'This is an example dashboard for printing.',
    body: <ExampleDashboard />,
}

export default function PrintExamplePage() {
    return <PrintShell {...printPageSettings} />
}
