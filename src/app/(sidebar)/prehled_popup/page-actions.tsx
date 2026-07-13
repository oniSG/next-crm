'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return <ExportButton dashboard="prehled_popup" filename="prehled_popup.pdf" />
}
