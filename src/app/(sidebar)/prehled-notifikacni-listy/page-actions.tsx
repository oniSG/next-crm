'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="prehled-notifikacni-listy"
            filename="prehled-notifikacni-listy.pdf"
        />
    )
}
