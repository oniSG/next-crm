'use client'

import { Suspense } from 'react'

import PageHeader from '@/components/custom/layout/page-header'

import { SegmentsTable } from './segments-table'

export default function Page() {
    return (
        <div className="flex h-svh flex-col">
            <PageHeader breadcrumbs={[{ label: 'Segmenty' }]} />
            <Suspense fallback={null}>
                <SegmentsTable />
            </Suspense>
        </div>
    )
}
