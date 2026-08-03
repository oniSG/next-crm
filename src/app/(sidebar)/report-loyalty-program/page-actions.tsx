'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="report-loyalty-program"
            filename="report-loyalty-program.pdf"
        />
    )
}
