'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton dashboard="sales-report" filename="sales-report.pdf" />
    )
}
