'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="alumni-dashboard"
            filename="alumni-dashboard.pdf"
        />
    )
}
