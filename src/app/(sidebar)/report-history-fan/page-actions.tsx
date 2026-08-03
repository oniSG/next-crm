'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="report-history-fan"
            filename="report-history-fan.pdf"
        />
    )
}
