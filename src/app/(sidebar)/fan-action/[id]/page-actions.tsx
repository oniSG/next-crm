'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { ExportButton } from '@/components/custom/statistics/export-button'
import { Button } from '@/components/ui/button'

import { useFanActionEditor } from './context'

export function PageActions() {
    const router = useRouter()
    const { saveAll } = useFanActionEditor()
    const [saving, setSaving] = React.useState(false)

    async function onSave() {
        setSaving(true)
        try {
            const ok = await saveAll()
            if (!ok) return
            // Refresh RSC so a later revisit loads the stub-store snapshot.
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <ExportButton dashboard="fan-action" filename="fan-action.pdf" />
            <Button
                type="button"
                size="sm"
                disabled={saving}
                onClick={() => {
                    void onSave()
                }}
            >
                {saving ? 'Saving…' : 'Save'}
            </Button>
        </>
    )
}
