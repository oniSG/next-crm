'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

type PageActionsProps = {
    eventId: string
}

export function PageActions({ eventId }: PageActionsProps) {
    return (
        <ExportButton
            dashboard="report-event"
            filename={`report-event-${eventId}.pdf`}
        />
    )
}
