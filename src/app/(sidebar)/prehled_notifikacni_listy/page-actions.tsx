'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <ExportButton
            dashboard="prehled_notifikacni_listy"
            filename="prehled_notifikacni_listy.pdf"
        />
    )
}
