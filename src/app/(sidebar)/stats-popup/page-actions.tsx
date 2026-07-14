'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return <ExportButton dashboard="stats-popup" filename="stats-popup.pdf" />
}
