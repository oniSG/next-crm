import { notFound } from 'next/navigation'

import { getEventReportById } from '@/app/(sidebar)/report-event/data'
import { ReportEventDetail } from '@/app/(sidebar)/report-event/report-event'

import { PrintShell, type PrintPageSettings } from '../../components/print-shell'

export default async function PrintEventReportPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const event = getEventReportById(id)
    if (!event) notFound()

    const printPageSettings: PrintPageSettings = {
        title: event.name,
        description:
            'Ticket sales, attendance and season-ticket overview for the selected event.',
        body: <ReportEventDetail event={event} showBack={false} />,
    }

    return <PrintShell {...printPageSettings} />
}
