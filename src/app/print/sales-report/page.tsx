import { SalesReport } from '@/app/(sidebar)/sales-report/sales-report'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Sales report',
    description: 'Přehled zlevněných vstupenek, slev a jejich využití.',
    body: <SalesReport />,
}

export default function PrintSalesReportPage() {
    return <PrintShell {...printPageSettings} />
}
