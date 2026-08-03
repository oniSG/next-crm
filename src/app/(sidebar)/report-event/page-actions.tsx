'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return <ExportButton dashboard="report-event" filename="report-event.pdf" />
}
