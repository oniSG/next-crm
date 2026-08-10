import { ReportSales } from '@/app/(sidebar)/report-sales/report-sales'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Prodeje vstupenek',
    description: 'Statistika příjmu z prodeje vstupenek.',
    body: <ReportSales />,
}

export default function PrintSalesReportPage() {
    return <PrintShell {...printPageSettings} />
}
