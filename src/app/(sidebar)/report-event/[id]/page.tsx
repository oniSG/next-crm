import { notFound } from 'next/navigation'

import PageHeader from '@/components/custom/layout/page-header'

import { getEventReportById } from '../data'
import { ReportEventDetail } from '../report-event'
import { PageActions } from './page-actions'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const event = getEventReportById(id)
    if (!event) notFound()

    return (
        <>
            <PageHeader
                breadcrumbs={[
                    { label: 'Report události', href: '/report-event' },
                    { label: event.name },
                ]}
            >
                <PageActions eventId={id} />
            </PageHeader>
            <div className="flex w-full justify-center p-3">
                <ReportEventDetail event={event} />
            </div>
        </>
    )
}
