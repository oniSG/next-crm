'use client'

import { ReportHeaderCard } from '@/components/custom/statistics/report-header-card'

export function ManazerskyReport() {
    return (
        <div className="flex w-full max-w-6xl flex-col gap-4">
            <ReportHeaderCard
                title="Manažerský report"
                description="Přehled klíčových manažerských metrik."
            />
        </div>
    )
}
