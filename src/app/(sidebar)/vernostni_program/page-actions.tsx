'use client'

import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return <ExportButton dashboard="vernostni_program" filename="vernostni_program.pdf" />
}
