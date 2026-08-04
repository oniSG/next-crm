import { notFound } from 'next/navigation'

import PageHeader from '@/components/custom/layout/page-header'

import { getFanActionById } from './data'
import { FanActionEditor } from './fan-action-editor'
import { PageActions } from './page-actions'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const action = getFanActionById(id)
    if (!action) notFound()

    return (
        <div className="flex h-svh flex-col overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { label: 'Campaigns', href: '/fan-action' },
                    { label: action.event },
                ]}
            >
                <PageActions />
            </PageHeader>
            <div className="min-h-0 flex-1 overflow-hidden">
                <FanActionEditor action={action} />
            </div>
        </div>
    )
}
