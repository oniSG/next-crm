'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ExportButtonProps = {
    dashboard: string
    filename?: string
}

export function ExportButton({ dashboard, filename }: ExportButtonProps) {
    const [loading, setLoading] = useState(false)

    async function handleClick() {
        if (loading) return
        setLoading(true)
        try {
            const res = await fetch(`/api/export/${dashboard}`)
            if (!res.ok) throw new Error(`Export failed: ${res.status}`)

            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename ?? `${dashboard}.pdf`
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
            {loading ? <Loader2 className="animate-spin" /> : <Download />}
            {loading ? 'Exporting…' : 'Export'}
        </button>
    )
}
