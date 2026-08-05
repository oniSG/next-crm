import type { NextRequest } from 'next/server'

import type { FanAction } from '@/app/(sidebar)/fan-action/[id]/data'

import {
    getStoredFanAction,
    upsertStoredFanAction,
} from '../store'

const MOCK_LATENCY_MS = 300

type RouteContext = {
    params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, context: RouteContext) {
    const { id } = await context.params
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

    const action = getStoredFanAction(id)
    if (!action) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return Response.json(action, {
        headers: { 'Cache-Control': 'no-store' },
    })
}

export async function PUT(request: NextRequest, context: RouteContext) {
    const { id } = await context.params
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

    const numericId = Number(id)
    if (Number.isNaN(numericId)) {
        return Response.json({ error: 'Invalid id' }, { status: 400 })
    }

    let body: unknown
    try {
        body = await request.json()
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !body ||
        typeof body !== 'object' ||
        (body as FanAction).id !== numericId
    ) {
        return Response.json(
            { error: 'Body must be a FanAction with matching id' },
            { status: 400 },
        )
    }

    const saved = upsertStoredFanAction(body as FanAction)
    return Response.json(saved, {
        headers: { 'Cache-Control': 'no-store' },
    })
}
