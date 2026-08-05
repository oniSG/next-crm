import { notFound } from 'next/navigation'

import { getStoredFanAction } from '@/app/api/mock/fan-actions/store'

import { FanActionPage } from './fan-action-editor'

/** Always read the live mock store (do not cache RSC payload). */
export const dynamic = 'force-dynamic'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const action = getStoredFanAction(id)
    if (!action) notFound()

    return <FanActionPage action={action} />
}
