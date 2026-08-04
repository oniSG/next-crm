'use client'

import { Button } from '@/components/ui/button'
import { ExportButton } from '@/components/custom/statistics/export-button'

export function PageActions() {
    return (
        <>
            <ExportButton dashboard="fan-action" filename="fan-action.pdf" />
            <Button type="button" size="sm" onClick={() => {}}>
                Save
            </Button>
        </>
    )
}
