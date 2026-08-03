'use client'

import PageHeader from '@/components/custom/layout/page-header'

import { getReportEvent } from './data'
import { PageActions } from './page-actions'
import { useEventReportFilters } from './report-utils'

export function EventPageHeader() {
    const { eventId } = useEventReportFilters()
    const event = getReportEvent(eventId)
    const breadcrumbs = event
        ? [{ label: 'Event report', href: '/report-event' }, { label: event.name }]
        : [{ label: 'Event report' }]

    return (
        <PageHeader breadcrumbs={breadcrumbs}>
            <PageActions />
        </PageHeader>
    )
}
