import type { ReactNode } from 'react'

import './../print.css'

export type PrintPageSettings = {
    title: string
    description?: string
    body: ReactNode
}

const TENANT = {
    name: 'FAČR',
    domain: 'facr.relatoo.app',
    logo: 'https://cdn.deepvision.cloud/relatoo/logo/facr.svg?v=2',
    plan: 'PRO',
}

const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

function TenantMark() {
    return (
        <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TENANT.logo} alt={TENANT.name} className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-medium tracking-tight">
                        {TENANT.name}
                    </span>
                    <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                        {TENANT.plan}
                    </span>
                </div>
                <span className="text-muted-foreground mt-1 text-xs">
                    {TENANT.domain}
                </span>
            </div>
        </div>
    )
}

export function PrintShell({ title, body }: PrintPageSettings) {
    const now = new Date()
    const year = now.getFullYear()

    return (
        <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-10 py-12 font-sans">
            <header className="mb-6">
                <div className="flex items-start justify-between">
                    <TenantMark />
                    <div className="text-muted-foreground text-right text-xs">
                        Report · {formatDate(now)}
                    </div>
                </div>
            </header>

            <main className="flex-1">{body}</main>

            <footer className="text-muted-foreground mt-8 grid grid-cols-3 items-center text-xs">
                <span>
                    © {year} {TENANT.name}
                </span>
                <span className="text-center">made with love by Relatoo</span>
                <span className="text-right">{title}</span>
            </footer>
        </div>
    )
}
