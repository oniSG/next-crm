'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return <ExportButton dashboard="stats_notify_listy" filename="stats_notify_listy.pdf" />
}
