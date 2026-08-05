import { ReportTicketing } from '@/app/(sidebar)/report-ticketing/report-ticketing'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Ticketing',
    description: 'Přehled prodaných a použitých vstupenek a permanentek.',
    body: <ReportTicketing />,
}

export default function PrintTicketingReportPage() {
    return <PrintShell {...printPageSettings} />
}
