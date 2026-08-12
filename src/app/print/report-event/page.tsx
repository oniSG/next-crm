import { EventReport } from '@/app/(sidebar)/report-event/report-event'

import { PrintShell, type PrintPageSettings } from '../components/print-shell'

const printPageSettings: PrintPageSettings = {
    title: 'Event report',
    description:
        'Ticket sales, attendance and season-ticket overview for the selected event.',
    body: <EventReport />,
}

export default function PrintEventReportPage() {
    return <PrintShell {...printPageSettings} />
}
