'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="report-gdpr-change"
            filename="report-gdpr-change.pdf"
        />
    )
}
