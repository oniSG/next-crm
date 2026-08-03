'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton dashboard="relatoo-index" filename="relatoo-index.pdf" />
    )
}
