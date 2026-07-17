import type { NextRequest } from 'next/server'

import { templates } from './data'

const MOCK_LATENCY_MS = 1000

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '30', 10) || 30)
    const endless = searchParams.get('endless') === 'true'

    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

    const total = templates.length
    const rows = endless ? templates : templates.slice((page - 1) * limit, page * limit)

    return Response.json(
        { rows, total },
        { headers: { 'Cache-Control': 'no-store' } },
    )
}
