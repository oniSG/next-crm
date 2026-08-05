'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="report-ticketing"
            filename="report-ticketing.pdf"
        />
    )
}
