'use client'

import { Suspense } from 'react'

import PageHeader from '@/components/custom/layout/page-header'

import { TemplatesTable } from './templates-table'

export default function Page() {
    return (
        <div className="flex h-svh flex-col">
            <PageHeader breadcrumbs={[{ label: 'Šablony' }]} />
            <Suspense fallback={null}>
                <TemplatesTable />
            </Suspense>
        </div>
    )
}
